import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
// import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import { useHistory } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
// import { Button } from 'reactstrap';
import './NotificationAlertCard.scss';

NotificationAlertCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  showNoti: PropTypes.bool,
  onChangeAlertStatus: PropTypes.func,
  notificaition: PropTypes.object,
  onMarkAsRead: PropTypes.func
};

NotificationAlertCard.defaultProps = {
  title: '',
  body: '',
  showNoti: false,
  onChangeAlertStatus: null,
  notification: {
    type: 'create-recruitment',
    image: Images.defaultAvatar
  },
  onMarkAsRead: null
}

function NotificationAlertCard(props) {
  const { showNoti, onChangeAlertStatus, notification } = props;
  const [isShowMarkAsRead, setIsShowMarkAsRead] = useState(false);
  const ref = useRef(null);
  const body = JSON.parse(notification.body);

  const history = useHistory();

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

  // const handleClick = (e) => {
  //   e.stopPropagation();
  // }

  const renderContent = (type) => {
    switch (type) {
      case "create-recruitment":
        return (
          <>
            <div className="notification-alert__container__content__main__description__text">
              <span className="notification-alert__container__content__main__description__text__name">
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-alert__container__content__main__description__text__name__icon"
                />}
              </span>
              has just created a new job titled <span className="notification-alert__container__content__main__description__text__job-title">
                {body.job.title}
              </span>
              . Join now!
            </div>
            <span className="notification-alert__container__content__main__description__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "update-recruitment":
        if (body.job.last_title !== "") {
          return (
            <>
              <div className="notification-alert__container__content__main__description__text">
                <span className="notification-alert__container__content__main__description__text__name">
                  {body.company_info.company_name}
                  {body.company_info.verify && <FaIcons.FaCheckCircle
                    className="notification-alert__container__content__main__description__text__name__icon"
                  />}
                </span>
                has just renamed job <span className="notification-alert__container__content__main__description__text__job-title">
                  {body.job.last_title}
                </span> to <span className="notification-alert__container__content__main__description__text__job-title">
                  {body.job.title}
                </span>
                . Maybe some of the criteria have been changed to match your abilities. Don't miss it!
              </div>
              <span className="notification-alert__container__content__main__description__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
            </>
          );
        } else {
          return (
            <>
              <div className="notification-alert__container__content__main__description__text">
                <span className="notification-alert__container__content__main__description__text__name">
                  {body.company_info.company_name}
                  {body.company_info.verify && <FaIcons.FaCheckCircle
                    className="notification-alert__container__content__main__description__text__name__icon"
                  />}
                </span>
                has just updated the content of job <span className="notification-alert__container__content__main__description__text__job-title">
                  {body.job.title}
                </span>
                . Maybe some criteria have changed to suit you. Don't miss it!
              </div>
              <span className="notification-alert__container__content__main__description__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
            </>
          );
        }
      case "update-avatar":
        return (
          <>
            <div className="notification-alert__container__content__main__description__text read-notification-success">
              <span className="notification-alert__container__content__main__description__text__name">
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-alert__container__content__main__description__text__name__icon"
                />}
              </span>
              just updated their avatar profile.
            </div>
            <span className="notification-alert__container__content__main__description__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "approved-application":
        return (
          <>
            <div className="notification-alert__container__content__main__description__text read-notification-success">
              <span className="notification-alert__container__content__main__description__text__name">
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-alert__container__content__main__description__text__name__icon"
                />}
              </span>
              has <span className="notification-alert__container__content__main__description__text__name">
                accepted your application
              </span>
              in job <span className="notification-alert__container__content__main__description__text__job-title">
                {body.job.title}
              </span>. From now on, you can start working on this!
            </div>
            <span className="notification-alert__container__content__main__description__date read-notification-success__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-application":
        return (
          <>
            <div className="notification-alert__container__content__main__description__text read-notification-success">
              <span className="notification-alert__container__content__main__description__text__name">
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-alert__container__content__main__description__text__name__icon"
                />}
              </span>
              has <span className="notification-alert__container__content__main__description__text__name">
                rejected your application
              </span>
              in job <span className="notification-alert__container__content__main__description__text__job-title">
                {body.job.title}
              </span>. Apply for other jobs now!
            </div>
            <span className="notification-alert__container__content__main__description__date read-notification-success__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "invited-job":
        return (
          <>
            <div className="notification-alert__container__content__main__description__text">
              <span className="notification-alert__container__content__main__description__text__name">
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className="notification-alert__container__content__main__description__text__name__icon"
                />}
              </span>
              has invited you to their <span className="notification-alert__container__content__main__description__text__job-title">
                {body.job.title}
              </span> job.
            </div>
            <span className="notification-alert__container__content__main__description__date">{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
            {/* <div className="notification-alert__container__content__main__description__actions">
              <Button
                color="success"
                // outline 
                size="sm"
                type="button"
                onClick={handleClick}
              >Accept</Button>
              <Button
                color="secondary"
                // outline 
                size="sm"
                type="button"
                onClick={handleClick}
              >Cancel</Button>
            </div> */}
          </>
        );
      // case "cancel-invite-job":
      //   return (
      //     <>
      //       <div className="notification-alert__container__content__main__description__text">
      //         <span>Company A</span> has invited you to their <span>XYZ</span> job.
      //       </div>
      //       <span className="notification-alert__container__content__main__description__date">2 minutes ago</span>
      //     </>
      //   );
      default: break;
    }
  }

  const renderTypeIcon = (type) => {
    switch (type) {
      case "create-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "update-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "update-avatar":
        return (
          <MdIcons.MdTipsAndUpdates className="notification-alert__container__content__main__avatar__type-icon__icon bg-change-avatar" />
        );
      case "approved-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "rejected-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "invited-job":
        return (
          <GiIcons.GiLetterBomb className="notification-alert__container__content__main__avatar__type-icon__icon bg-invited-job" />
        );
      // case "cancel-invite-job":
      //   return (
      //     <GiIcons.GiLetterBomb className="notification-alert__container__content__main__avatar__type-icon__icon"/>
      //   );
      default: break;
    }
  }

  const onViewNotification = (body) => {
    switch (body.type) {
      case "create-recruitment":
        return history.push(`/recruitment/${body.job.id}`);
      case "update-recruitment":
        return history.push(`/recruitment/${body.job.id}`);
      case "update-avatar":
        return history.push(`company/${body.company_info.id}`)
      case "approved-application":
        // !body.is_read && onMarkRead(true);
        return history.push(`/recruitment/${body.job.id}`);
      case "rejected-application":
        // !body.is_read && onMarkRead(true);
        return history.push(`/recruitment/${body.job.id}`);
      case "invited-job":
        // !body.is_read && onMarkRead(true);
        return history.push(`/recruitment/${body.job.id}`);
      default: break;
    }
  }

  // const onShowMarkAsRead = (e) => {
  //   e.stopPropagation();
  //   setIsShowMarkAsRead(!isShowMarkAsRead);
  // }

  // const onMarkRead = (body, isRead) => {
  //   switch (body) {
  //     case "invited-job" || "approved-application" || "rejected-application":
  //       onMarkAsRead(body.user_messages_id, isRead);
  //       setIsShowMarkAsRead(false);
  //       break;
  //     default:
  //       break;
  //   }
  // }

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
          <div className="notification-alert__container__content__main" onClick={() => onViewNotification(body)}>
            <div className="notification-alert__container__content__main__avatar">
              <img src={body.company_info.logo_image_link} alt="avatar" />
              <div className="notification-alert__container__content__main__avatar__type-icon">
                {
                  renderTypeIcon(body.type)
                }
              </div>
            </div>
            <div className="notification-alert__container__content__main__description">
              {
                renderContent(body.type)
              }
            </div>
          </div>
          {!body.is_read && <div className="notification-alert__container__content__dot">
            <span />
          </div>}
          {/* {
            body.type === ("invited-job" || "approved-application" || "rejected-application") &&
            <>
              <div
                className={`notification-alert__container__content__more-options ${isShowMarkAsRead && "is-focus-noti-option"}`}
                // ref={isShowMarkAsRead ? ref : null}
                onClick={onShowMarkAsRead}
              >
                <MdIcons.MdMoreHoriz className="notification-alert__container__content__more-options__icon" />
              </div>
              <div
                className={`notification-alert__container__content__list-options ${!isShowMarkAsRead && "invisible-noti-options"}`}
                ref={ref}
              >
                <ul className="notification-alert__container__content__list-options__list-item">
                  {body.is_read
                    ? <li
                      className="notification-alert__container__content__list-options__list-item__item"
                      onClick={() => onMarkRead(body, false)}
                    >
                      <FiIcons.FiCheck className="notification-alert__container__content__list-options__list-item__item__icon" />
                      <span>Mark as unread</span>
                    </li>
                    : <li
                      className="notification-alert__container__content__list-options__list-item__item"
                      onClick={() => onMarkRead(body, true)}
                    >
                      <FiIcons.FiCheck className="notification-alert__container__content__list-options__list-item__item__icon" />
                      <span>Mark as read</span>
                    </li>
                  }
                </ul>
              </div>
            </>
          } */}
        </div>
      </div>
    </div>
  );
}

export default NotificationAlertCard;