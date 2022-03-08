import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import Paths from 'constants/paths';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import helper from 'utils/common';
import EventCard from '../../components/EventCard';
import ImageSlider from '../../components/ImageSlider';
import SearchFormEvent from '../../components/SearchFormEvent';
import './MainEventPage.scss';

RecruiterMainEventPage.propTypes = {

};

function RecruiterMainEventPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [show, setShow] = useState(false);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const _limit = 8;

  const sliderData = [
    {
      image:
        'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      image:
        'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80'
    },
    {
      image:
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    },
    {
      image:
        'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80'
    },
    {
      image:
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  useEffect(() => {
    helper.scrollToTop();

    const fetchListEvents = async () => {
      try {
        const params = {
          page: currentPage,
          _limit
        }

        const data = await userApi.getListEvents(params);
        console.log({ data })
        if (data.data.status === 1) {
          setEvents(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot fetch events. Error: " + error.message);
        setIsLoading(false);
        return;
      }
    }

    fetchListEvents();
  }, [currentPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}?page=${newPage}`
        : `${Paths.clientEvent}?page=${newPage}`
    )
    helper.scrollToTop(350);
  };

  const onViewDetailEvent = () => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/1/detail`
        : `${Paths.clientEvent}/1/detail`
    );
  }

  const onSubmit = (values) => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/search?event=${values.event}&in=${values.in}&when=${values.when}`
        : `${Paths.clientEvent}/search?event=${values.event}&in=${values.in}&when=${values.when}`
    );
  }

  const onManageEvent = () => {
    if ((user && Object.keys(user).length === 0)) {
      onShow(true);
      return;
    } else {
      if (user.role_id === 2) {
        history.push(`${Paths.recruiterEvent}/dashboard`);
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          history.push(`${Paths.recruiterEvent}/dashboard`);
          return;
        }

        if (user.s_profile) {
          history.push(`${Paths.clientEvent}/dashboard`);
          return;
        }
      }

      onShow(true);
      return;
    }
  }

  const onCreateEvent = () => {
    if ((user && Object.keys(user).length === 0)) {
      onShow(true);
      return;
    } else {
      if (user.role_id === 2) {
        history.push(`${Paths.recruiterEvent}/create`);
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          history.push(`${Paths.recruiterEvent}/create`);
          return;
        }

        if (user.s_profile) {
          history.push(`${Paths.clientEvent}/create`);
          return;
        }

      }

      onShow(true);
      return;
    }
  }

  const onShow = (value) => {
    setShow(value);
  }

  const onTryThisPopupConfirm = () => {
    if ((user && Object.keys(user).length === 0)) {
      history.push("/auth/sign-in");
      return;
    } else {
      if (user.role_id === 2) {
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          return;
        }

        if (user.s_profile) {
          return;
        }

        history.push("/first-update/student");
      }
    }
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
                <ImageSlider
                  sliderData={sliderData}
                />
              </div>
              <div className="event-main__container__search">
                <SearchFormEvent onSubmit={onSubmit} />
              </div>
              <div className="event-main__container__btn-group">
                <button
                  type="button"
                  className="btn"
                  onClick={onManageEvent}
                >Manage Events</button>
                <button
                  type="button"
                  className="btn"
                  onClick={onCreateEvent}
                >Create an Event</button>
              </div>
              <div className="event-main__container__upcomming-events">
                <div className="event-main__container__upcomming-events__title">
                  <span>Upcoming Events</span>
                  <div className="event-main__container__upcomming-events__title__dot"></div>
                </div>
                {
                  events.length > 0
                    ? <>
                      <div className="event-main__container__upcomming-events__cards">
                        {
                          events.map((event, index) => {
                            return <div
                              key={index}
                              className="event-main__container__upcomming-events__cards__item"
                            >
                              <EventCard
                                event={event}
                                onViewDetailEvent={onViewDetailEvent}
                              />
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
                          // renderOnZeroPageCount={null}
                        />
                      </div>
                    </>
                    : <div className="event-main__container__upcomming-events__no-data">
                      <span>"No events have been created yet."</span>
                      <img src={Images.upcomingEvent} alt="upcoming event" />
                    </div>
                }
              </div>
            </div>
          </div>
      }
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={onTryThisPopupConfirm}
        // titleConfirm="Update Profile"
        contentConfirm={
          (user && Object.keys(user).length === 0)
            ? "Only accounts with the role of employer or student, and already have a personal profile, can use this function. Continue?"
            : (user.role_id === 2
              ? user.r_profile
                ? "Something went wrong. Please try again!"
                : "You need to update your Personal Profile to perform this function."
              : (user.role_id === 3
                ? (roleId === 2
                  ? (
                    user.r_profile
                      ? "Something went wrong. Please try again!"
                      : "You need to update your Personal Profile to perform this function. Continue?"
                  )
                  : (
                    user.s_profile
                      ? "Something went wrong. Please try again!"
                      : "You need to update your Personal Profile to perform this function. Continue?"
                  ))
                : "Something went wrong. Please try again!"))
        }
      />
    </>

  );
}

export default RecruiterMainEventPage;