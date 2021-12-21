import recruiterApi from 'api/recruiterApi';
import LoadingChildUI from 'components/LoadingChild';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import scroll from 'utils/common';
import AvailableJobsCard from '../AvailableJobsCard';
import './AvailableJobs.scss';

AvailableJobs.propTypes = {

};

function AvailableJobs(props) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const limit = 3;

  useEffect(() => {
    const fetchAvailableJobs = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }

        const data = await recruiterApi.getAvailableJobs(params);
        const total = data.data.data.total;
        setpageCount(Math.ceil(total / limit));
        setItems(data.data.data.data);
        setIsLoading(false);
        return data.data.data;
      } catch (error) {
        console.log("Cannot get avilable jobs. Error: ", error.message);
      }
    };

    fetchAvailableJobs();
  }, [limit, currentPage]);

  const handlePageClick = async (data) => {
    setCurrentPage(data.selected + 1);
    // scroll to the top
    // window.scrollTo(0, 0)
    scroll.scrollToTop();
  };

  return (
    <div className="available-jobs">
      {isLoading
        ? <div className="loading-child-ui">
          <LoadingChildUI />
        </div>
        :
        <>
          {
            items.map((item, index) => {
              return <AvailableJobsCard item={item} key={index} />
            })
          }
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
        </>
      }
    </div>
  );
}

export default AvailableJobs;