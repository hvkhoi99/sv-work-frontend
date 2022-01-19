import React, { useState, useEffect } from 'react';
import AppliedJobsCard from '../AppliedJobsCard';
// import PropTypes from 'prop-types';
import './AppliedJobsPageCard.scss';
import LoadingChildUI from 'components/LoadingChild';
import ReactPaginate from 'react-paginate';
import * as MdIcons from 'react-icons/md';
import studentApi from 'api/studentApi';
import { useHistory, useLocation } from 'react-router-dom';
import Paths from 'constants/paths';
import queryString from 'query-string';
import helper from 'utils/common';

AppliedJobsPageCard.propTypes = {

};

function AppliedJobsPageCard(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }
        const data = await studentApi.getAppliedJobs(params);
        // console.log({data})
        if (data.data.status === 1) {
          setAppliedJobs(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / limit));
          setIsLoading(false);
          return data.data;
        } else {
          return false;
        }
      } catch (error) {
        console.log("Cannot fetch applied jobs. Error: " + error.message);
      }
    }

    fetchAppliedJobs();
  }, [currentPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(`${Paths.clientDashboard}/applied-jobs?page=${newPage}`);
    helper.scrollToTop(350);
  };

  const onViewJob = (id) => {
    history.push(`/job/${id}`)
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="applied-jobs-page-card">
            {
              appliedJobs.map((job, index) => {
                return <div
                  key={index}
                  className="applied-jobs-page-card__item"
                >
                  <AppliedJobsCard
                    onViewJob={onViewJob}
                    job={job}
                  />
                </div>
              })
            }
            <div className="find-jobs__container__pagination">
              {
                appliedJobs.length <= 0
                  ? <div className="no-available">
                    <span>No information was found!</span>
                  </div>
                  : <ReactPaginate
                    previousLabel={
                      <MdIcons.MdArrowBackIosNew />
                    }
                    nextLabel={
                      <MdIcons.MdArrowForwardIos />
                    }

                    // initialPage={1}
                    // initialPage={currentPage}
                    forcePage={currentPage - 1}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
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
              }
            </div>
          </div>
      }
    </>
  );
}

export default AppliedJobsPageCard;