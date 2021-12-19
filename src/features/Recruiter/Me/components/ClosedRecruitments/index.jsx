import recruiterApi from 'api/recruiterApi';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ClosedRecruitmentsCard from '../ClosedRecruitmentsCard';
import './ClosedRecruitments.scss';
import * as MdIcons from 'react-icons/md';

ClosedRecruitments.propTypes = {

};

function ClosedRecruitments(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);

  const limit = 3;

  useEffect(() => {
    const fetchClosedRecruitments = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }

        const data = await recruiterApi.getClosedRecruitments(params);
        const total = data.data.data.total;
        setpageCount(Math.ceil(total / limit));
        setItems(data.data.data.data);
        return data.data.data;
      } catch (error) {
        console.log("Cannot get avilable jobs. Error: ", error.message);
      }
    };

    fetchClosedRecruitments();
  }, [limit, currentPage]);

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (
    <div className="closed-recruitments">
      {items.map((item, index) => {
        return <ClosedRecruitmentsCard recruitment={item} key={index} />
      })}
      <ReactPaginate
        previousLabel={
          <MdIcons.MdArrowBackIosNew />
        }
        nextLabel={
          <MdIcons.MdArrowForwardIos />
        }

        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ClosedRecruitments;