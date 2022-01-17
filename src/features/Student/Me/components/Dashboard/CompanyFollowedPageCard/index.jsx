import LoadingChildUI from 'components/LoadingChild';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CompanyFollowedCard from '../CompanyFollowedCard';
// import PropTypes from 'prop-types';
import './CompanyFollowedPageCard.scss';
import * as MdIcons from 'react-icons/md';

CompanyFollowedPageCard.propTypes = {

};

function CompanyFollowedPageCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      const total = items.length;
      setPageCount(Math.ceil(total / 2));
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [items.length]);

  const handlePageClick = () => {
    console.log("prev/next page");
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="company-followed-page-card">
            <div className="applied-jobs-page-card__item">
              <CompanyFollowedCard />
            </div>
            <div className="applied-jobs-page-card__item">
              <CompanyFollowedCard />
            </div>
            <div className="applied-jobs-page-card__item">
              <CompanyFollowedCard />
            </div>
            <div className="find-jobs__container__pagination">
              <ReactPaginate
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
            </div>
          </div>
      }
    </>
  );
}

export default CompanyFollowedPageCard;