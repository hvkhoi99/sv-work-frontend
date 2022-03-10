import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import Paths from 'constants/paths';
// import * as SiIcons from 'react-icons/si';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import helper from 'utils/common';
import EventCard from '../../components/EventCard';
import EventCardSkeleton from '../../components/EventCardSkeleton';
import EventDetailActionCard from '../../components/EventDetailActionCard';
// import PropTypes from 'prop-types';
import './DetailEvent.scss';

DetailEventPage.propTypes = {

};

function DetailEventPage(props) {
  const history = useHistory();
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const [topEvents, setTopEvents] = useState([]);
  // const [isClosed, setIsClosed] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [event, setEvent] = useState({
    id: 0,
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    creator_name: '',
    is_closed: false,
    is_creator: false,
    is_joined: false,
    image_link: Images.bachkhoaEvent
  });
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const onViewDetailEvent = (event) => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/${event.id}`
        : `${Paths.clientEvent}/${event.id}`
    );
  }

  useEffect(() => {
    helper.scrollToTop();
    const fetchDetailOfEvent = async () => {
      try {
        const data = await userApi.getDetailOfEvent(id);
        console.log({ data })
        if (data.data.status === 1) {
          setEvent(data.data.data);
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot fetch detail of event. Error " + error.message);
        return;
      }
    }

    fetchDetailOfEvent();
  }, [id]);

  useEffect(() => {
    const fetchTopEvents = async () => {
      try {
        const params = {
          _limit: 4
        };
        const data = await userApi.getTopEvents(params);
        if (data.data.status === 1) {
          setTopEvents(data.data.data);
        }
        setIsGetting(false);
        return;
      } catch (error) {
        console.log("Cannot get top Events. Error: ", error.message);
        setIsGetting(false);
        return;
      }
    }

    fetchTopEvents();
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

  const onEditEvent = (event) => {
    if ((user && Object.keys(user).length === 0)) {
      onShow(true);
      return;
    } else {
      if (user.role_id === 2) {
        history.push({
          pathname: `${Paths.recruiterEvent}/${event.id}/update`,
          state: {
            event,
            isEditMode: true
          }
        });
        return;
      }

      if (user.role_id === 3) {
        if (roleId === 2) {
          history.push({
            pathname: `${Paths.recruiterEvent}/${event.id}/update`,
            state: {
              event,
              isEditMode: true
            }
          });
          return;
        }

        if (user.s_profile) {
          history.push({
            pathname: `${Paths.clientEvent}/${event.id}/update`,
            state: {
              event,
              isEditMode: true
            }
          });
          return;
        }
      }

      onShow(true);
      return;
    }
  }

  const onCloseEvent = async (event) => {
    setIsClosing(true);
    try {
      const action = await userApi.closeEvent(event.id);
      if (action.data.status === 1) {
        setEvent(state => ({
          ...state,
          is_closed: true
        }));
        enqueueSnackbar(action.data.message, { variant: "success" });

      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      setIsClosing(false);
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      setIsClosing(false);
      return;
    }
  }

  const onJoinEvent = async (event) => {
    setIsJoining(true);
    try {
      const action = await userApi.joinEvent(event.id);
      if (action.data.status === 1) {
        setEvent(state => ({
          ...state,
          is_joined: !state.is_joined
        }));
        enqueueSnackbar(action.data.message, { variant: "success" });

      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      setIsJoining(false);
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      setIsJoining(false);
      return;
    }
  }

  const onDeleteEvent = async (event) => {
    try {
      const action = await userApi.deleteEvent(event.id);
      if (action.data.status === 1) {
        enqueueSnackbar(action.data.message, { variant: "success" });
        history.goBack();
      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      setIsDeleting(false);
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      setIsDeleting(false);
      return;
    }
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
                <img src={event.image_link ?? Images.bachkhoaEvent} alt="event-img" />
              </div>
              <div className="detail-event__container__center">
                <div className="detail-event__container__center__left">
                  <span className="detail-event__container__center__left__title">
                    {event.title.toUpperCase()}
                  </span>
                  <div className="detail-event__container__center__left__by">
                    By <span>{event.creator_name}</span>
                  </div>
                  <span className="detail-event__container__center__left__address">
                    {event.location}
                  </span>
                  <div className="detail-event__container__center__left__description">
                    <span className="detail-event__container__center__left__description__title">
                      Description
                    </span>
                    <p className="detail-event__container__center__left__description__main">
                      {event.description}
                    </p>
                  </div>
                </div>
                <div className="detail-event__container__center__right">
                  <div className="detail-event__container__center__right__more-info">
                    <EventDetailActionCard
                      event={event}
                      onDeleteEvent={onDeleteEvent}
                      onEditEvent={onEditEvent}
                      onJoinEvent={onJoinEvent}
                      onCloseEvent={onCloseEvent}
                      isClosing={isClosing}
                      isDeleting={isDeleting}
                      isJoining={isJoining}
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
                {
                  isGetting
                    ? <div className="detail-event__container__top-event__event">
                      {
                        [1, 2, 3, 4].map((item, index) => {
                          return <EventCardSkeleton key={index} />
                        })
                      }
                    </div>
                    : (
                      topEvents.length > 0
                        ? <div className="detail-event__container__top-event__event">
                          {
                            topEvents.map((event, index) => {
                              return <div
                                key={index}
                                className="detail-event__container__top-event__event__item"
                              >
                                <EventCard
                                  event={event}
                                  onViewDetailEvent={onViewDetailEvent}
                                />
                              </div>
                            })
                          }

                        </div>
                        : <div className="detail-event__container__top-event__event">
                          {
                            [1, 2, 3, 4].map((item, index) => {
                              return <EventCardSkeleton key={index} />
                            })
                          }
                        </div>
                    )
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

export default DetailEventPage;