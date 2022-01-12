import LoadingUI from 'components/Loading';
import Paths from 'constants/paths';
import SortByItem from 'features/Recruiter/Find/components/SortByItem';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import helper from 'utils/common';
import EventCard from '../../components/EventCard';
import SearchFormEvent from '../../components/SearchFormEvent';
// import PropTypes from 'prop-types';
import './SearchEvent.scss';

SearchEventPage.propTypes = {

};

function SearchEventPage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

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

  const onViewDetailEvent = () => {
    history.push(
      user.role_id === 2
        ? `${Paths.recruiterEvent}/1`
        : `${Paths.clientEvent}/1`
    );
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="search-event">
            <div className="search-event__container">
              <div className="search-event__container__search-bar">
                <SearchFormEvent />
              </div>
              <div className="search-event__container__sort-bar">
                <SortByItem />
              </div>
              <div className="search-event__container__events">
                <div className="search-event__container__events__title">
                  <span>
                    Results
                  </span>
                </div>
                <div className="search-event__container__events__main">
                  {
                    items.map((item, index) => {
                      return <div
                        key={index}
                        className="search-event__container__events__main__item"
                      >
                        <EventCard onViewDetailEvent={onViewDetailEvent} />
                      </div>
                    })
                  }
                </div>
              </div>
              <div className="search-event__container__paginator">
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
          </div>
      }
    </>
  );
}

export default SearchEventPage;