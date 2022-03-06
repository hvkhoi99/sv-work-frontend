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

EventDashboardPage.propTypes = {
};

function EventDashboardPage(props) {
  const postedEventPath = `${Paths.clientEvent}/dashboard/posted-event`;
  const joinedEventPath = `${Paths.clientEvent}/dashboard/joined-event`;
  const closedEventPath = `${Paths.clientEvent}/dashboard/closed-event`;
  const history = useHistory();
  const location = history.location.pathname;
  const [currentPath, setCurrentPath] = useState(location);
  const options = [
    { id: 0, name: "Posted Event", path: postedEventPath },
    { id: 1, name: "Joined Event", path: joinedEventPath },
    { id: 2, name: "Closed Event", path: closedEventPath },
  ]

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  const onMoveToFormCreateEvent = () => {
    history.push(`${Paths.clientEvent}/create`);
  }

  return (
    <div className="event-dashboard-page">
      <div className="event-dashboard-page__container">
        <div className="event-dashboard-page__container__top">
          <div className="event-dashboard-page__container__top__left">
            <div className="event-dashboard-page__container__top__left__inforCard">
              <img src={
                Images.defaultAvatar
              } alt="recruiter-avatar" />
              <div className="event-dashboard-page__container__top__left__inforCard__description">
                <div className="event-dashboard-page__container__top__left__inforCard__description__title">
                  <span>Ho Van Khoi</span>
                  <HiIcons.HiCheckCircle className="inforCard-icon" />
                </div>
                <span
                  className="event-dashboard-page__container__top__left__inforCard__description__company-industry"
                >Software Company</span>
              </div>
            </div>
          </div>
          <div className="event-dashboard-page__container__top__right">
            <div className="event-dashboard-page__container__top__right__card">
              <span className="event-dashboard-page__container__top__right__card__count">10</span>
              <span className="event-dashboard-page__container__top__right__card__type">Posted Event</span>
            </div>
            <div className="event-dashboard-page__container__top__right__card">
              <span className="event-dashboard-page__container__top__right__card__count">10</span>
              <span className="event-dashboard-page__container__top__right__card__type">Joined Event</span>
            </div>
            <div className="event-dashboard-page__container__top__right__card">
              <span className="event-dashboard-page__container__top__right__card__count">10</span>
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
  );
}

export default EventDashboardPage;