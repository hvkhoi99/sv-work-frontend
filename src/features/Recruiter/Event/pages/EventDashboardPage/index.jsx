import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './EventDashboardPage.scss';
import * as HiIcons from 'react-icons/hi';
// import { Spinner } from 'reactstrap';
import * as BsIcons from 'react-icons/bs';
import Paths from 'constants/paths';
import { useHistory } from 'react-router-dom';
import DashboardSelectOption from 'features/Recruiter/Me/components/DashboardSelectOption';
import helper from 'utils/common';
import PostedEventArea from '../../components/PostedEventArea';
import JoinedEventArea from '../../components/JoinedEventArea';
import ClosedEventArea from '../../components/ClosedEventArea';
import { useSelector } from 'react-redux';
import LoadingUI from 'components/Loading';
import userApi from 'api/userApi';

EventDashboardPage.propTypes = {
};

function EventDashboardPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    count_available: 0,
    count_joined: 0,
    count_closed: 0
  });
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const location = history.location.pathname;
  const [currentPath, setCurrentPath] = useState(location);
  const postedEventPath = user.role_id === 2
    ? `${Paths.recruiterEvent}/dashboard/available-event`
    : (
      user.role_id === 3
        ? (
          roleId === 2
            ? `${Paths.recruiterEvent}/dashboard/available-event`
            : `${Paths.clientEvent}/dashboard/available-event`
        )
        : ""
    );
  const joinedEventPath = user.role_id === 2
    ? `${Paths.recruiterEvent}/dashboard/joined-event`
    : (
      user.role_id === 3
        ? (
          roleId === 2
            ? `${Paths.recruiterEvent}/dashboard/joined-event`
            : `${Paths.clientEvent}/dashboard/joined-event`
        )
        : ""
    );
  const closedEventPath = user.role_id === 2
    ? `${Paths.recruiterEvent}/dashboard/closed-event`
    : (
      user.role_id === 3
        ? (
          roleId === 2
            ? `${Paths.recruiterEvent}/dashboard/closed-event`
            : `${Paths.clientEvent}/dashboard/closed-event`
        )
        : ""
    );
  const options = [
    { id: 0, name: "Available Event", path: postedEventPath },
    { id: 1, name: "Joined Event", path: joinedEventPath },
    { id: 2, name: "Closed Event", path: closedEventPath },
  ]

  useEffect(() => {
    helper.scrollToTop();
    const fetchDashboardData = async () => {
      try {
        const data = await userApi.getDashboardEventData();
        // console.log({data})
        if (data.data.status === 1) {
          setDashboardData(data.data.data);
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot get dashboard event data.", error);
        setIsLoading(false);
        return;
      }
    }

    return fetchDashboardData();
  }, []);

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  const onMoveToFormCreateEvent = () => {
    history.push({
      pathname:
        user.role_id === 2
          ? `${Paths.recruiterEvent}/create`
          : (
            user.role_id === 3
              ? (
                roleId === 2
                  ? `${Paths.recruiterEvent}/create`
                  : `${Paths.clientEvent}/create`
              )
              : ""
          ),
      state: {
        event: null,
        isEditMode: false
      }
    });
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="event-dashboard-page">
            <div className="event-dashboard-page__container">
              <div className="event-dashboard-page__container__top">
                <div className="event-dashboard-page__container__top__left">
                  <div className="event-dashboard-page__container__top__left__inforCard">
                    <img src={
                      user.role_id === 2
                        ? user.r_profile.logo_image_link
                        : (
                          user.role_id === 3
                            ? (
                              roleId === 2
                                ? user.r_profile.logo_image_link
                                : user.s_profile.avatar_link
                            )
                            : Images.defaultAvatar
                        )
                    } alt="avatar" />
                    <div className="event-dashboard-page__container__top__left__inforCard__description">
                      <div className="event-dashboard-page__container__top__left__inforCard__description__title">
                        <span>{
                          user.role_id === 2
                            ? user.r_profile.company_name
                            : (
                              user.role_id === 3
                                ? (
                                  roleId === 2
                                    ? user.r_profile.company_name
                                    : ((user.s_profile.first_name ?? "") + " " + (user.s_profile.last_name ?? ""))
                                )
                                : "User"
                            )
                        }</span>
                        {
                          user.role_id === 2
                            ? (user.r_profile.verify &&
                              <HiIcons.HiCheckCircle className="inforCard-icon" />)
                            : (user.role_id === 3 && roleId === 2 && user.r_profile.verify &&
                              <HiIcons.HiCheckCircle className="inforCard-icon" />)
                        }
                      </div>
                      <span
                        className="event-dashboard-page__container__top__left__inforCard__description__company-industry"
                      >
                        {
                          user.role_id === 2
                            ? (user.r_profile.company_industry ?? "N/A")
                            : (
                              user.role_id === 3
                                ? (
                                  roleId === 2
                                    ? (user.r_profile.company_industry ?? "N/A")
                                    : (user.s_profile.job_title ?? "")
                                )
                                : "N/A"
                            )
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="event-dashboard-page__container__top__right">
                  <div className="event-dashboard-page__container__top__right__card">
                    <span className="event-dashboard-page__container__top__right__card__count">{dashboardData.count_available}</span>
                    <span className="event-dashboard-page__container__top__right__card__type">Available Event</span>
                  </div>
                  <div className="event-dashboard-page__container__top__right__card">
                    <span className="event-dashboard-page__container__top__right__card__count">{dashboardData.count_joined}</span>
                    <span className="event-dashboard-page__container__top__right__card__type">Joined Event</span>
                  </div>
                  <div className="event-dashboard-page__container__top__right__card">
                    <span className="event-dashboard-page__container__top__right__card__count">{dashboardData.count_closed}</span>
                    <span className="event-dashboard-page__container__top__right__card__type">Closed Event</span>
                  </div>
                  <div
                    className="event-dashboard-page__container__top__right__card"
                    // onClick={isChecking ? null : handleCreateRecruitment}
                    onClick={onMoveToFormCreateEvent}
                  >
                    {/* {
                  isChecking
                    ? <Spinner children="" size="lg" color="success" />
                    : <> */}
                    <div className="event-dashboard-page__container__top__right__card__plus-icon">
                      <BsIcons.BsFillPlusCircleFill className="plus-icon" />
                    </div>
                    <div className="event-dashboard-page__container__top__right__card__create-span">
                      <span>Create An Event</span>
                    </div>
                    {/* </>
                } */}
                  </div>
                </div>
              </div>

              <div className="event-dashboard-page__container__bottom">
                <div className="event-dashboard-page__container__bottom__left">
                  {options.map((option, index) => {
                    const className = currentPath === option.path ? "event-dashboard-page__container__bottom__left__item visited-card" : "event-dashboard-page__container__bottom__left__item";
                    return <DashboardSelectOption
                      option={option}
                      key={index}
                      className={className}
                      onChangeIndex={onChangeIndex}
                    />
                  })}
                  <div className="event-dashboard-page__container__bottom__left__img">
                    <img src={Images.manageevent} alt="recruitment dashboard" />
                  </div>
                </div>
                <div className="event-dashboard-page__container__bottom__right">
                  {currentPath === postedEventPath
                    ? <PostedEventArea
                    />
                    : currentPath === joinedEventPath
                      ? <JoinedEventArea
                      />
                      : currentPath === closedEventPath
                        ? <ClosedEventArea
                        />
                        : <></>
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default EventDashboardPage;