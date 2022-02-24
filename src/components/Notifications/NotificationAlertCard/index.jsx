import React from 'react';
import PropTypes from 'prop-types';
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';
import './NotificationAlertCard.scss';
import { useEffect, useState, useRef } from 'react';
import Images from 'constants/images';

NotificationAlertCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  showNoti: PropTypes.bool,
  onChangeAlertStatus: PropTypes.func,
};

NotificationAlertCard.defaultProps = {
  title: '',
  body: '',
  showNoti: false,
  onChangeAlertStatus: null,
}

function NotificationAlertCard(props) {
  const { title, body, showNoti, onChangeAlertStatus } = props;
  // const [isAlert, setIsAlert] = useState(showNoti);
  const [isShowMarkAsRead, setIsShowMarkAsRead] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isShowMarkAsRead && setIsShowMarkAsRead(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isShowMarkAsRead]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsAlert(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   }
  // }, []);

  const onShowMarkAsRead = (e) => {
    e.stopPropagation();
    setIsShowMarkAsRead(!isShowMarkAsRead);
  }

  const onViewNotification = () => {
    console.log("clicked!")
  }

  return (
    <div className={`notification-alert ${showNoti && "start-alert"}`}>
      <div className="notification-alert__container">
        <div className="notification-alert__container__header">
          <span className="notification-alert__container__header__title">
            New Notification
          </span>
          <MdIcons.MdCancel
            className="notification-alert__container__header__icon"
            onClick={() => onChangeAlertStatus(false)}
          />
        </div>
        <div className="notification-alert__container__content">
          <div className="notification-alert__container__content__main" onClick={onViewNotification}>
            <div className="notification-alert__container__content__main__avatar">
              <img src={Images.defaultAvatar} alt="avatar" />
            </div>
            <div className="notification-alert__container__content__main__description">
              <div className="notification-alert__container__content__main__description__text">
                <span>{title}</span> Lorem ipsum dolor <span>ABC</span>.
                {body}
              </div>
              <span className="notification-alert__container__content__main__description__date">
                2 minutes ago
              </span>
            </div>
          </div>
          <div className="notification-alert__container__content__dot">
            <span />
          </div>
          <div
            className={`notification-alert__container__content__more-options ${isShowMarkAsRead && "is-focus-noti-option"}`}
            ref={ref}
            onClick={onShowMarkAsRead}
          >
            <MdIcons.MdMoreHoriz className="notification-alert__container__content__more-options__icon" />
          </div>
          <div
            className={`notification-alert__container__content__list-options ${!isShowMarkAsRead && "invisible-noti-options"}`}
            ref={ref}
          >
            <ul className="notification-alert__container__content__list-options__list-item">
              <li
                className="notification-alert__container__content__list-options__list-item__item"
                onClick={() => setIsShowMarkAsRead(false)}
              >
                <FiIcons.FiCheck
                  className="notification-alert__container__content__list-options__list-item__item__icon"
                />
                <span>Mark as read</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationAlertCard;