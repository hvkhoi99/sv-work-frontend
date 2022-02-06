
import React, { useState, useEffect } from 'react';
import * as RiIcons from 'react-icons/ri';
import SortByItem from '../../components/SortByItem';
import './FindCandidates.scss';
import CandidateFindCard from '../../components/CandidateFindCard';
import LoadingUI from 'components/Loading';
import ReactPaginate from 'react-paginate';
import * as MdIcons from 'react-icons/md';
import SearchTypeForm from '../../components/SearchTypeForm';
import { Link, useHistory } from 'react-router-dom';
import Paths from 'constants/paths';
import helper from 'utils/common';

FindCadidatesPage.propTypes = {

};

function FindCadidatesPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0)


  useEffect(() => {
    helper.scrollToTop();
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

  const onSubmit = (values) => {
    console.log({ values });
  };

  const onViewCandidate = (candidateId) => {
    history.push(`${Paths.recruiterCandidate}/1`);
  };

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="find-candidates">
            <div className="find-candidates__container">
              <div className="find-candidates__container__above">
                <div className="find-candidates__container__above__search">
                  <input type="text" placeholder="Name..." />
                  <Link to="#" className="find-candidates__container__above__search__button">
                    <RiIcons.RiSearchLine className="search-icon" />
                  </Link>
                </div>
                <div className="find-candidates__container__above__search-type">
                  <SearchTypeForm onSubmit={onSubmit} />
                </div>
                <div className="find-candidates__container__above__sort">
                  <SortByItem />
                </div>
              </div>
              <div className="find-candidates__container__below">
                {
                  items.map((candidate, index) => {
                    return <CandidateFindCard
                      key={index}
                      onViewCandidate={onViewCandidate}
                    />
                  })
                }
              </div>
              <div className="find-candidate__container__pagination">
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
            </div>
          </div>
      }
    </>
  );
}

export default FindCadidatesPage;