import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import Paths from 'constants/paths';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import helper from 'utils/common';
import SavedJobsCard from '../SavedJobsCard';
// import PropTypes from 'prop-types';
import './SavedJobsPageCard.scss';

SavedJobsPageCard.propTypes = {

};

function SavedJobsPageCard(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJob] = useState([]);
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
        const data = await studentApi.getSavedJobs(params);
        console.log({ data })
        if (data.data.status === 1) {
          setSavedJob(data.data.data.data);
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
    history.push(`${Paths.clientDashboard}/saved-jobs?page=${newPage}`);
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
          : <div className="saved-jobs-page-card">
            {
              savedJobs.map((job, index) => {
                return <div
                  key={index}
                  className="saved-jobs-page-card__item"
                >
                  <SavedJobsCard
                    onViewJob={onViewJob}
                    job={job}
                  />
                </div>
              })
            }
            <div className="find-jobs__container__pagination">
              {
                savedJobs.length <= 0
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

export default SavedJobsPageCard;