import LoadingChildUI from 'components/LoadingChild';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CompanyFollowedCard from '../CompanyFollowedCard';
// import PropTypes from 'prop-types';
import './CompanyFollowedPageCard.scss';
import * as MdIcons from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import studentApi from 'api/studentApi';
import Paths from 'constants/paths';
import helper from 'utils/common';
import {useSnackbar} from 'notistack';
import * as RiIcons from 'react-icons/ri';

CompanyFollowedPageCard.propTypes = {

};

function CompanyFollowedPageCard(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [followedCompanies, setFollowedCompanies] = useState([]);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const [isReloadPage, setIsReloadPage] = useState(false);
  const [isUnFollowing, setUnFollowing] = useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: limit
        }
        const data = await studentApi.getCompaniesFollowed(params);
        if (data.data.status === 1) {
          setFollowedCompanies(data.data.data.data);
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
    history.push(`${Paths.clientDashboard}/followed-companies?page=${newPage}`);
    helper.scrollToTop(350);
  };

  const onUnFollow = async (id) => {
    setUnFollowing(true);
    try {
      const action = await studentApi.followCompany(id);
      if (action.data.status === 1) {
        setUnFollowing(false);
        const newFollowedCompanies = followedCompanies.filter((item) => {
          return item.id !== id;
        });
        setFollowedCompanies(newFollowedCompanies);
        enqueueSnackbar(
          `Successfully Un-Followed Company.`,
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
          : <div className="company-followed-page-card">
            {
              followedCompanies.map((company, index) => {
                return <div
                  key={index}
                  className="applied-jobs-page-card__item"
                >
                  <CompanyFollowedCard 
                  company={company} 
                  onUnFollow={onUnFollow}
                  isUnFollowing={isUnFollowing}
                  />
                </div>
              })
            }

            <div className="find-jobs__container__pagination">
              {
                followedCompanies.length <= 0
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
                  />
              }
            </div>
          </div>
      }
    </>
  );
}

export default CompanyFollowedPageCard;