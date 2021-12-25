import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import scroll from 'utils/common';
import ClosedRecruitmentsCard from '../ClosedRecruitmentsCard';
import './ClosedRecruitments.scss';

ClosedRecruitments.propTypes = {

};

function ClosedRecruitments(props) {
  const user = useSelector((state) => state.user.current);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const limit = 3;

  useEffect(() => {
    const fetchClosedRecruitments = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }

        const data = user.role_id === 2
          ? await recruiterApi.getClosedRecruitments(params)
          : await studentApi.getClosedRecruitments(params);
        const total = data.data.data.total;
        setpageCount(Math.ceil(total / limit));
        setItems(data.data.data.data);
        setIsLoading(false);
        return data.data.data;
      } catch (error) {
        console.log("Cannot get avilable jobs. Error: ", error.message);
      }
    };

    fetchClosedRecruitments();
  }, [limit, currentPage, user]);

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
    scroll.scrollToTop();
  };

  return (
    <div className="closed-recruitments">
      {isLoading
        ? <div className="loading-child-ui">
          <LoadingChildUI />
        </div>
        : <>
          {
            items.map((item, index) => {
              return <ClosedRecruitmentsCard recruitment={item} key={index} />
            })
          }
          {
            items.length <= 0
              ? <div className="no-available">
                <span>There are currently no articles available</span>
              </div>
              : <ReactPaginate
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
              />}
        </>
      }
    </div>
  );
}

export default ClosedRecruitments;