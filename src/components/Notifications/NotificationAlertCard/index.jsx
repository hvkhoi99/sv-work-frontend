import Images from 'constants/images';
import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
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
  const { showNoti, onChangeAlertStatus, notification, onMarkAsRead } = props;
  const [isShowMarkAsRead, setIsShowMarkAsRead] = useState(false);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const ref = useRef(null);
  const body = JSON.parse(notification.body);
  const [isRead, setIsRead] = useState(false);
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

  useEffect(() => {
    !showNoti && setIsRead(false);
  }, [showNoti]);

  const renderContent = (type) => {
    switch (type) {
      case "create-event":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has just created a new event titled <span
                className={`notification-alert__container__content__main__description__text__job-title 
              ${isRead && "read-notification-content__content__text__job-title"}`}
              >
                {body.job.title}
              </span>
              . Join now!
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "create-recruitment":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has just created a new job titled <span
                className={`notification-alert__container__content__main__description__text__job-title 
              ${isRead && "read-notification-content__content__text__job-title"}`}
              >
                {body.job.title}
              </span>
              . Join now!
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "update-recruitment":
        if (body.job.last_title !== "") {
          return (
            <>
              <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
                <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                  {body.company_info.company_name}
                  {body.company_info.verify && <FaIcons.FaCheckCircle
                    className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                  />}
                </span>
                has just renamed job <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                  {body.job.last_title}
                </span> to <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                  {body.job.title}
                </span>
                . Maybe some of the criteria have been changed to match your abilities. Don't miss it!
              </div>
              <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
            </>
          );
        } else {
          return (
            <>
              <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
                <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                  {body.company_info.company_name}
                  {body.company_info.verify && <FaIcons.FaCheckCircle
                    className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                  />}
                </span>
                has just updated the content of job <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                  {body.job.title}
                </span>
                . Maybe some criteria have changed to suit you. Don't miss it!
              </div>
              <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
            </>
          );
        }
      case "update-avatar":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              just updated their avatar profile.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "approved-application":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                accepted your application
              </span>
              in job <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span>. From now on, you can start working on this!
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-application":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                rejected your application
              </span>
              in job <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span>. Apply for other jobs now!
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "invited-job":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
                {body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-alert__container__content__main__description__text__name__icon ${isRead && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has invited you to their <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span> job.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
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
      //       <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
      //         <span>Company A</span> has invited you to their <span>XYZ</span> job.
      //       </div>
      //       <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>2 minutes ago</span>
      //     </>
      //   );
      case "applied-job":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.student_info.first_name ?? ""} {body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                applied
              </span>
              to your <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span> job posting. Let's see what {
                body.student_info.gender === null
                  ? "he" : (
                    body.student_info.gender ? "he" : "she"
                  )
              }'s got!
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "follow-company":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.student_info.first_name ?? ""} {body.student_info.last_name ?? ""}
              </span>
              just followed you. From now on, {
                body.student_info.gender === null
                  ? "he" : (
                    body.student_info.gender ? "he" : "she"
                  )
              } can receive notifications about your job posting.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-your-job":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.student_info.first_name ?? ""} {body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                declined your offer
              </span>
              of job <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span>.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "accepted-your-job":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.student_info.first_name ?? ""} {body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                accepted
              </span>
              your <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                {body.job.title}
              </span> job offer.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-verify-profile":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                The Administrator
              </span>
              has <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                declined
              </span>
              your request to verify your <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                company profile
              </span>.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "accepted-verify-profile":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                The Administrator
              </span>
              has <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                accepted
              </span>
              your request to verify your <span className={`notification-alert__container__content__main__description__text__job-title ${isRead && "read-notification-content__content__text__job-title"}`}>
                company profile
              </span>. From now on, you can use the full features of Recruiter.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "verify-company-profile":
        return (
          <>
            <div className={`notification-alert__container__content__main__description__text ${isRead && "read-notification-content__content__text"}`}>
              <span className={`notification-alert__container__content__main__description__text__name ${isRead && "read-notification-content__content__text__name"}`}>
                {body.company_info.company_name}
              </span>
              has requested to verify their company profile.
            </div>
            <span className={`notification-alert__container__content__main__description__date ${isRead && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(body.updated_at)} locale="en-US" />}</span>
          </>
        );
      default: break;
    }
  }

  const renderTypeIcon = (type) => {
    switch (type) {
      case "create-event":
        return (
          <MdIcons.MdEvent className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
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
      case "applied-job":
        return (
          <RiIcons.RiCheckDoubleLine className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "follow-company":
        return (
          <RiIcons.RiChatFollowUpFill className="notification-alert__container__content__main__avatar__type-icon__icon bg-follow" />
        );
      case "accepted-your-job":
        return (
          <BiIcons.BiNetworkChart className="notification-alert__container__content__main__avatar__type-icon__icon bg-accepted-job" />
        );
      case "rejected-your-job":
        return (
          <BiIcons.BiNetworkChart className="notification-alert__container__content__main__avatar__type-icon__icon bg-accepted-job" />
        );
      case "verify-company-profile":
        return (
          <GoIcons.GoUnverified className="notification-alert__container__content__main__avatar__type-icon__icon" />
        );
      case "accepted-verify-profile":
        return (
          <MdIcons.MdAdminPanelSettings className="notification-alert__container__content__main__avatar__type-icon__icon bg-accepted-job" />
        );
      case "rejected-verify-profile":
        return (
          <MdIcons.MdAdminPanelSettings className="notification-alert__container__content__main__avatar__type-icon__icon bg-accepted-job" />
        );
      // case "cancel-invite-job":
      //   return (
      //     <GiIcons.GiLetterBomb className="notification-alert__container__content__main__avatar__type-icon__icon"/>
      //   );
      default: break;
    }
  }

  const onMarkRead = (body, isRead) => {
    onMarkAsRead(body.user_messages_id, isRead);
    setIsRead(isRead);
    setIsShowMarkAsRead(false);
  }

  const onViewNotification = async (body) => {
    await onMarkAsRead(body.user_messages_id, true);
    setIsRead(true);
    onChangeAlertStatus(false);
    switch (body.type) {
      case "create-event":
        return history.push(
          roleId === 2
            ? `${Paths.recruiterEvent}/${body.job.id}`
            : `${Paths.clientEvent}/${body.job.id}`
        );
      case "create-recruitment":
        return history.push(`/recruitment/${body.job.id}`);
      case "update-recruitment":
        return history.push(`/recruitment/${body.job.id}`);
      case "update-avatar":
        return history.push(`/company/${body.company_info.id}`)
      case "approved-application":
        return history.push(`/recruitment/${body.job.id}`);
      case "rejected-application":
        return history.push(`/recruitment/${body.job.id}`);
      case "invited-job":
        return history.push(`/recruitment/${body.job.id}`);
      case "applied-job":
        return history.push(`/recruiter/candidate/${body.student_info.id}`);
      case "follow-company":
        return history.push(`/recruiter/candidate/${body.student_info.id}`);
      case "accepted-your-job":
        return history.push(`/recruiter/candidate/${body.student_info.id}`);
      case "rejected-your-job":
        return history.push(`/recruiter/candidate/${body.student_info.id}`);
      default: break;
    }
  }

  const onShowMarkAsRead = (e) => {
    e.stopPropagation();
    setIsShowMarkAsRead(!isShowMarkAsRead);
  }

  const renderAvatarLink = (body) => {
    // switch (body.type) {
    //   case "create-recruitment" || "update-recruitment" || "update-avatar" || "approved-application" || "rejected-application" || "invited-job" || "verify-company-profile":
    //     return (<img src={body.company_info.logo_image_link} alt="avatar" />)
    //   case "applied-job" || "follow-company" || "accepted-your-job" || "rejected-your-job":
    //     return (<img src={body.student_info.avatar_link} alt="avatar" />)
    //   default:
    //     return (<img src={Images.employerAvatar} alt="avatar" />)
    // }
    if (["create-event", "create-recruitment", "update-recruitment", "update-avatar", "approved-application", "rejected-application", "invited-job", "verify-company-profile"].includes(body.type)) {
      return (<img src={body.company_info.logo_image_link} alt="avatar" />);
    }

    if (["applied-job", "follow-company", "accepted-your-job", "rejected-your-job"].includes(body.type)) {
      return (<img src={body.student_info.avatar_link} alt="avatar" />);
    }

    return (<img src={Images.employerAvatar} alt="avatar" />);
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
          <div className="notification-alert__container__content__main" onClick={() => onViewNotification(body)}>
            <div className="notification-alert__container__content__main__avatar">
              {
                renderAvatarLink(body)
              }
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
          {!isRead && <div className="notification-alert__container__content__dot">
            <span />
          </div>}
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
              {isRead
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
        </div>
      </div>
    </div>
  );
}

export default NotificationAlertCard;