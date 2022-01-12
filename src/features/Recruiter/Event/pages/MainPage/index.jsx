import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import helper from 'utils/common';
import EventCard from '../../components/EventCard';
import SearchFormEvent from '../../components/SearchFormEvent';
import './MainEventPage.scss';
import { useSelector } from 'react-redux';

RecruiterMainEventPage.propTypes = {

};

function RecruiterMainEventPage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
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

  const onViewDetailEvent = () => {
    history.push(
      user.role_id === 2
        ? `${Paths.recruiterEvent}/1`
        : `${Paths.clientEvent}/1`
    );
  }

  const onSubmit = (values) => {
    history.push(
      user.role_id === 2
        ? `${Paths.recruiterEvent}/search?event=${values.event}&in=${values.in}&when=${values.when}`
        : `${Paths.clientEvent}/search?event=${values.event}&in=${values.in}&when=${values.when}`
    );
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="event-main">
            <div className="event-main__container">
              <div className="event-main__container__slider">
                <img src={Images.event1} alt="event1" />
                <div className="event-main__container__slider__btn-group">
                  <FaIcons.FaChevronLeft className="event-main__container__slider__btn-group__icon" />
                  <FaIcons.FaChevronRight className="event-main__container__slider__btn-group__icon" />
                </div>
              </div>
              <div className="event-main__container__search">
                <SearchFormEvent onSubmit={onSubmit} />
              </div>
              <div className="event-main__container__btn-group">
                <button className="btn">Manage Events</button>
                <button className="btn">Create an Event</button>
              </div>
              <div className="event-main__container__upcomming-events">
                <div className="event-main__container__upcomming-events__title">
                  <span>Upcoming Events</span>
                  <div className="event-main__container__upcomming-events__title__dot"></div>
                </div>
                <div className="event-main__container__upcomming-events__cards">
                  {
                    items.map((item, index) => {
                      return <div
                        key={index}
                        className="event-main__container__upcomming-events__cards__item"
                      >
                        <EventCard onViewDetailEvent={onViewDetailEvent} />
                      </div>
                    })
                  }
                </div>
                <div className="event-main__container__upcomming-events__pagination">
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
          </div>
      }
    </>

  );
}

export default RecruiterMainEventPage;