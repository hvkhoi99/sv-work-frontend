import React, { useEffect, useState } from 'react';
import InvitedJobsCard from '../InvitedJobsCard';
// import PropTypes from 'prop-types';
import './InvitedJobsPageCard.scss';
import * as MdIcons from 'react-icons/md';
import LoadingChildUI from 'components/LoadingChild';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import studentApi from 'api/studentApi';
import Paths from 'constants/paths';
import helper from 'utils/common';
import {useSnackbar} from 'notistack';
import * as RiIcons from 'react-icons/ri';

InvitedJobsPageCard.propTypes = {

};

function InvitedJobsPageCard(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [invitedJobs, setInvitedJobs] = useState([]);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const [isReloadPage, setIsReloadPage] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }
        const data = await studentApi.getInvitedJobs(params);
        // console.log({data})
        if (data.data.status === 1) {
          setInvitedJobs(data.data.data.data);
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
  }, [currentPage, isReloadPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(`${Paths.clientDashboard}/invited-jobs?page=${newPage}`);
    helper.scrollToTop(350);
  };

  const onAcceptInvitedJob = async (id) => {
    setIsAccepting(true);
    try {
      const action = await studentApi.acceptInvitedJob(id);
      if (action.data.status === 1) {
        setIsAccepting(false);
        enqueueSnackbar(
          `Successfully accepted the job offer.`,
          { variant: "success" }
        );
        setIsReloadPage(!isReloadPage);
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }
  
  const onRejectInvitedJob = async (id) => {
    setIsRejecting(true);
    try {
      const action = await studentApi.rejectInvitedJob(id);
      if (action.data.status === 1) {
        setIsRejecting(false);
        const newInvitedJobs = invitedJobs.filter((item) => {
          return item.id !== id;
        })
        setInvitedJobs(newInvitedJobs);
        enqueueSnackbar(
          `Successfully declined the job offer.`,
          { variant: "success" }
        );
        setIsReloadPage(!isReloadPage);
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="invited-jobs-page-card">
            {
              invitedJobs.map((job, index) => {
                return <div
                  key={index}
                  className="saved-jobs-page-card__item"
                >
                  <InvitedJobsCard 
                  job={job} 
                  onAcceptInvitedJob={onAcceptInvitedJob}
                  onRejectInvitedJob={onRejectInvitedJob}
                  isAccepting={isAccepting}
                  isRejecting={isRejecting}
                  />
                </div>
              })
            }
            <div className="find-jobs__container__pagination">
              {
                invitedJobs.length <= 0
                  // ? <div className="no-available">
                  //   <span>No information was found!</span>
                  // </div>
                  ? <div className="find-candidates__container__pagination__not-found__info">
                    <RiIcons.RiErrorWarningFill
                      className="find-candidates__container__pagination__not-found__info__icon"
                    />
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
                  />}
            </div>
          </div>
      }
    </>
  );
}

export default InvitedJobsPageCard;