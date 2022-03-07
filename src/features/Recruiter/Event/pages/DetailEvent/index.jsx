import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './DetailEvent.scss';
import EventDetailActionCard from '../../components/EventDetailActionCard';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import EventCard from '../../components/EventCard';
import helper from 'utils/common';
import LoadingUI from 'components/Loading';
import { useSelector } from 'react-redux';
import PopupConfirm from 'components/PopupConfirm';
import { useHistory } from 'react-router-dom';
import Paths from 'constants/paths';
// import * as SiIcons from 'react-icons/si';

DetailEventPage.propTypes = {

};

function DetailEventPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [show, setShow] = useState(false);

  const onViewDetailEvent = () => {
    console.log("View event!");
  }

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  const onEditEvent = (id) => {
    if ((user && Object.keys(user).length === 0)) {
      onShow(true);
      return;
    } else {
      if (user.role_id === 2) {
        history.push(`${Paths.recruiterEvent}/${id}/update`);
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          history.push(`${Paths.recruiterEvent}/${id}/update`);
          return;
        }

        if (user.s_profile) {
          history.push(`${Paths.clientEvent}/${id}/update`);
          return;
        }
      }

      onShow(true);
      return;
    }
  }

  const onCloseEvent = (id) => {
    console.log({ id })
  }

  const onJoinEvent = (id) => {
    console.log({ id })
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            < LoadingUI />
          </div >
          : <div className="detail-event">
            <div className="detail-event__container">
              <div className="detail-event__container__top">
                <img src={Images.event1} alt="event-img" />
              </div>
              <div className="detail-event__container__center">
                <div className="detail-event__container__center__left">
                  <span className="detail-event__container__center__left__title">
                    {`${"student achievement awards".toUpperCase()}`}
                  </span>
                  <span className="detail-event__container__center__left__by">
                    By {"HVKHOI99"}
                  </span>
                  <span className="detail-event__container__center__left__address">
                    Truong Dai hoc Bach Khoa, Da Nang
                  </span>
                  <div className="detail-event__container__center__left__description">
                    <span className="detail-event__container__center__left__description__title">
                      Description
                    </span>
                    <p className="detail-event__container__center__left__description__main">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                    </p>
                  </div>
                </div>
                <div className="detail-event__container__center__right">
                  <div className="detail-event__container__center__right__more-info">
                    <EventDetailActionCard
                      onEditEvent={onEditEvent}
                      onJoinEvent={onJoinEvent}
                      onCloseEvent={onCloseEvent}
                    />
                  </div>
                  <div className="detail-event__container__center__right__share-with">
                    <span className="detail-event__container__center__right__share-with__title">
                      Share with friends
                    </span>
                    <div className="detail-event__container__center__right__share-with__apps">
                      <FiIcons.FiInstagram
                        className="detail-event__container__center__right__share-with__apps__instagram app-icon"
                      />
                      <BsIcons.BsFacebook
                        className="detail-event__container__center__right__share-with__apps__facebook app-icon"
                      />
                      <AiIcons.AiFillTwitterCircle
                        className="detail-event__container__center__right__share-with__apps__twitter"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-event__container__top-event">
                <div className="detail-event__container__top-event__title">
                  <span>Top Events</span>
                  <div className="detail-event__container__top-event__title__dot" />
                </div>
                <div className="detail-event__container__top-event__event">
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                </div>
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

export default DetailEventPage;