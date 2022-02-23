import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import NotificationCard from 'components/Notifications/NotificationCard';
import * as MdIcons from 'react-icons/md';
import './NotificationsContainer.scss';
import { useState } from 'react';
import * as FiIcons from 'react-icons/fi';

NotificationsContainer.propTypes = {

};

function NotificationsContainer(props) {
  const [isAll, setIsAll] = useState(true);
  const [isShowMarkAllAsRead, setIsShowMarkAllAsRead] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isShowMarkAllAsRead && setIsShowMarkAllAsRead(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isShowMarkAllAsRead]);

  const onViewMode = (type) => {
    switch (type) {
      case "all":
        setIsAll(true);
        break;
      case "unread":
        setIsAll(false)
        break;
      default: break;
    }
  }

  const onShowMarkAllAsRead = () => {
    setIsShowMarkAllAsRead(!isShowMarkAllAsRead);
  }

  return (
    <div className="notifications-container">
      <div className="notifications-container__header" >
        <span className="notifications-container__header__title">Notification</span>
        <div className="notifications-container__header__more-options" ref={ref}>
          <MdIcons.MdMoreHoriz
            className="notifications-container__header__more-options__icon"
            onClick={onShowMarkAllAsRead}
          // ref={ref}
          />
          <div
            className={`notifications-container__header__more-options__mark-all ${!isShowMarkAllAsRead && "show-mark-all-as-read"}`}
            onClick={onShowMarkAllAsRead}
          >
            <FiIcons.FiCheck className="notifications-container__header__more-options__mark-all__icon" />
            <span>
              Mark all as read
            </span>
          </div>
        </div>
      </div>
      <div className="notifications-container__view-mode">
        <span
          className={`notifications-container__view-mode__all ${isAll && "isAllNotification"}`}
          onClick={() => onViewMode("all")}
        >
          All
        </span>
        <span
          className={`notifications-container__view-mode__unread  ${!isAll && "isAllNotification"}`}
          onClick={() => onViewMode("unread")}
        >
          Unread
        </span>
      </div>
      <div className="notifications-container__content">
        <div className="notifications-container__content__header">
          <span
            className="notifications-container__content__header__recently"
          >
            Recently
          </span>
          <span
            className="notifications-container__content__header__see-all"
          >
            See All
          </span>
        </div>
        <ul>
          <NotificationCard type="create-recruitment"/>
          <NotificationCard type="invited-job"/>
          <NotificationCard type="update-recruitment"/>
          <NotificationCard type="approved-application"/>
          <NotificationCard type="update-avatar"/>
        </ul>
      </div>
    </div>
  );
}

export default NotificationsContainer;