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
import './NotificationCard.scss';
// import { useSnackbar } from 'notistack';
// import studentApi from 'api/studentApi';

NotificationCard.propTypes = {
  notificaition: PropTypes.object,
  onMarkAsRead: PropTypes.func,
  onHiddenAll: PropTypes.func,
};

NotificationCard.defaultProps = {
  notification: {
    type: 'create-recruitment',
    image: Images.defaultAvatar
  },
  onMarkAsRead: null,
  onHiddenAll: null,
}

function NotificationCard(props) {
  const { notification, onMarkAsRead, onHiddenAll } = props;
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef(null);
  const history = useHistory();
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  // const body = JSON.parse(notification.body);
  // const [isAccepting, setIsAccepting] = useState(false);
  // const [isCancelling, setIsCancelling] = useState(false);
  // const [isRepliedInvitedJob, setIsRepliedInvitedJob] = useState(null);
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // setIsRepliedInvitedJob(
    //   notification.type === "invited-job"
    //     ? notification.is_replied : null
    // );
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isHidden === false && setIsHidden(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isHidden, notification.is_replied, notification.type]);

  // const onAcceptInvitedJob = async (e, id) => {
  //   e.stopPropagation();
  //   !notification.is_read && onMarkRead(true);
  //   setIsAccepting(true);
  //   try {
  //     const action = await studentApi.acceptInvitedJob(id);
  //     if (action.data.status === 1) {
  //       setIsRepliedInvitedJob(true);
  //       enqueueSnackbar(
  //         `Successfully accepted the job offer.`,
  //         { variant: "success" }
  //       );
  //     } else {
  //       enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
  //     }
  //     setIsAccepting(false);
  //     return;
  //   } catch (error) {
  //     enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
  //     setIsAccepting(false);
  //     return;
  //   }
  // }

  // const onRejectInvitedJob = async (e, id) => {
  //   e.stopPropagation();
  //   !notification.is_read && onMarkRead(true);
  //   setIsCancelling(true);
  //   try {
  //     const action = await studentApi.rejectInvitedJob(id);
  //     if (action.data.status === 1) {
  //       setIsRepliedInvitedJob(false);
  //       enqueueSnackbar(
  //         `Successfully cancelled the job offer.`,
  //         { variant: "success" }
  //       );
  //     } else {
  //       enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
  //     }
  //     setIsCancelling(false);
  //     return;
  //   } catch (error) {
  //     enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
  //     setIsCancelling(false);
  //     return;
  //   }
  // }

  // console.log({ isRepliedInvitedJob })

  const renderContent = (type) => {
    switch (type) {
      case "create-event":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has just created a new event titled <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span>
              . Join now!
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "create-recruitment":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has just created a new job titled <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span>
              . Join now!
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "update-recruitment":
        if (notification.body.job.last_title !== "") {
          return (
            <>
              <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
                <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                  {notification.body.company_info.company_name}
                  {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                    className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                  />}
                </span>
                has just renamed job <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                  {notification.body.job.last_title}
                </span> to <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                  {notification.body.job.title}
                </span>
                . Maybe some of the criteria have been changed to match your abilities. Don't miss it!
              </div>
              <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
            </>
          );
        } else {
          return (
            <>
              <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
                <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                  {notification.body.company_info.company_name}
                  {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                    className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                  />}
                </span>
                has just updated the content of job <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                  {notification.body.job.title}
                </span>
                . Maybe some criteria have changed to suit you. Don't miss it!
              </div>
              <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
            </>
          );
        }

      case "update-avatar":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              just updated their avatar profile.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "approved-application":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                accepted your application
              </span>
              in job <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span>. From now on, you can start working on this!
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-application":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                rejected your application
              </span>
              in job <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span>. Apply for other jobs now!
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "invited-job":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
                {notification.body.company_info.verify && <FaIcons.FaCheckCircle
                  className={`notification-content__content__text__name__icon ${notification.is_read && "read-notification-content__content__text__name__icon"}`}
                />}
              </span>
              has invited you to their <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span> job.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
            {/* <div className="notification-content__content__actions">
              {
                isRepliedInvitedJob === null
                  ? <>
                    <Button
                      color="success"
                      size="sm"
                      type="button"
                      onClick={(e) => onAcceptInvitedJob(e, notification.body.job.id)}
                      disabled={isAccepting}
                      style={isAccepting ? { cursor: "default" } : { cursor: "pointer" }}
                    >
                      {isAccepting && <span className="spinner-border spinner-border-sm mr-1" />}
                      Accept
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      type="button"
                      onClick={(e) => onRejectInvitedJob(e, notification.body.job.id)}
                      disabled={isCancelling}
                      style={isCancelling ? { cursor: "default" } : { cursor: "pointer" }}
                    >
                      {isCancelling && <span className="spinner-border spinner-border-sm mr-1" />}
                      Cancel
                    </Button>
                  </>
                  : (
                    isRepliedInvitedJob
                      ? <Button
                        color="success"
                        size="sm"
                        type="button"
                        disabled={true}
                        style={{ cursor: "default" }}
                      >
                        Accepted
                      </Button>
                      : <Button
                        color="secondary"
                        size="sm"
                        type="button"
                        disabled={true}
                        style={{ cursor: "default" }}
                      >
                        Cancelled
                      </Button>
                  )
              }
            </div> */}
          </>
        );
      // case "cancel-invite-job":
      //   return (
      //     <>
      //       <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
      //         <span>Company A</span> has invited you to their <span>XYZ</span> job.
      //       </div>
      //       <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>2 minutes ago</span>
      //     </>
      //   );
      case "applied-job":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.student_info.first_name ?? ""} {notification.body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                applied
              </span>
              to your <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span> job posting. Let's see what {
                notification.body.student_info.gender === null
                  ? "he" : (
                    notification.body.student_info.gender ? "he" : "she"
                  )
              }'s got!
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "follow-company":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.student_info.first_name ?? ""} {notification.body.student_info.last_name ?? ""}
              </span>
              just followed you. From now on, {
                notification.body.student_info.gender === null
                  ? "he" : (
                    notification.body.student_info.gender ? "he" : "she"
                  )
              } can receive notifications about your job posting.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-your-job":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.student_info.first_name ?? ""} {notification.body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                declined your offer
              </span>
              of job <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span>.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "accepted-your-job":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.student_info.first_name ?? ""} {notification.body.student_info.last_name ?? ""}
              </span>
              has just <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                accepted
              </span>
              your <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                {notification.body.job.title}
              </span> job offer.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "accepted-verify-profile":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                The Administrator
              </span>
              has <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                accepted
              </span>
              your request to verify your <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                company profile
              </span>. From now on, you can use the full features of Recruiter.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "rejected-verify-profile":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                The Administrator
              </span>
              has <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                declined
              </span>
              your request to verify your <span className={`notification-content__content__text__job-title ${notification.is_read && "read-notification-content__content__text__job-title"}`}>
                company profile
              </span>.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      case "verify-company-profile":
        return (
          <>
            <div className={`notification-content__content__text ${notification.is_read && "read-notification-content__content__text"}`}>
              <span className={`notification-content__content__text__name ${notification.is_read && "read-notification-content__content__text__name"}`}>
                {notification.body.company_info.company_name}
              </span>
              has requested to verify their company profile.
            </div>
            <span className={`notification-content__content__date ${notification.is_read && "read-notification-content__content__date"}`}>{<ReactTimeAgo date={Date.parse(notification.body.updated_at)} locale="en-US" />}</span>
          </>
        );
      default: break;
    }
  }

  const renderTypeIcon = (type) => {
    switch (type) {
      case "create-event":
        return (
          <MdIcons.MdEvent className="notification-content__img__type-icon__icon" />
        );
      case "create-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-content__img__type-icon__icon" />
        );
      case "update-recruitment":
        return (
          <SiIcons.SiWorkplace className="notification-content__img__type-icon__icon" />
        );
      case "update-avatar":
        return (
          <MdIcons.MdTipsAndUpdates className="notification-content__img__type-icon__icon bg-change-avatar" />
        );
      case "approved-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-content__img__type-icon__icon" />
        );
      case "rejected-application":
        return (
          <RiIcons.RiNewspaperFill className="notification-content__img__type-icon__icon" />
        );
      case "invited-job":
        return (
          <GiIcons.GiLetterBomb className="notification-content__img__type-icon__icon bg-invited-job" />
        );
      case "applied-job":
        return (
          <RiIcons.RiCheckDoubleLine className="notification-content__img__type-icon__icon bg-applied" />
        );
      case "follow-company":
        return (
          <RiIcons.RiMapPinUserFill className="notification-content__img__type-icon__icon bg-follow" />
        );
      case "accepted-your-job":
        return (
          <BiIcons.BiNetworkChart className="notification-content__img__type-icon__icon bg-accepted-job" />
        );
      case "rejected-your-job":
        return (
          <BiIcons.BiNetworkChart className="notification-content__img__type-icon__icon bg-accepted-job" />
        );
      case "verify-company-profile":
        return (
          <GoIcons.GoUnverified className="notification-content__img__type-icon__icon" />
        );
      case "accepted-verify-profile":
        return (
          <MdIcons.MdAdminPanelSettings className="notification-content__img__type-icon__icon bg-accepted-job" />
        );
      case "rejected-verify-profile":
        return (
          <MdIcons.MdAdminPanelSettings className="notification-content__img__type-icon__icon bg-accepted-job" />
        );
      // case "cancel-invite-job":
      //   return (
      //     <GiIcons.GiLetterBomb className="notification-content__img__type-icon__icon"/>
      //   );
      default: break;
    }
  }

  const onMarkRead = (isRead) => {
    onMarkAsRead(notification.user_messages_id, isRead);
    setIsHidden(true);
  }

  const onShowMarkAsRead = (e) => {
    // e.stopPropagation();
    setIsHidden(!isHidden);
  }

  const onViewNotification = (notification) => {
    !notification.is_read && onMarkRead(true);
    switch (notification.type) {
      case "create-event":
        onHiddenAll();
        return history.push(
          roleId === 2
            ? `${Paths.recruiterEvent}/${notification.body.job.id}`
            : `${Paths.clientEvent}/${notification.body.job.id}`
        );
      case "create-recruitment":
        onHiddenAll();
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "update-recruitment":
        onHiddenAll();
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "update-avatar":
        onHiddenAll();
        return history.push(`/company/${notification.body.company_info.id}`)
      case "approved-application":
        onHiddenAll();
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "rejected-application":
        onHiddenAll();
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "invited-job":
        onHiddenAll();
        return history.push(`/recruitment/${notification.body.job.id}`);
      case "applied-job":
        onHiddenAll();
        return history.push(`/recruiter/candidate/${notification.body.student_info.id}`);
      case "follow-company":
        onHiddenAll();
        return history.push(`/recruiter/candidate/${notification.body.student_info.id}`);
      case "accepted-your-job":
        onHiddenAll();
        return history.push(`/recruiter/candidate/${notification.body.student_info.id}`);
      case "rejected-your-job":
        onHiddenAll();
        return history.push(`/recruiter/candidate/${notification.body.student_info.id}`);
      default: break;
    }
  }

  const renderAvatarLink = (notification) => {
    if (["create-event", "create-recruitment", "update-recruitment", "update-avatar", "approved-application", "rejected-application", "invited-job", "verify-company-profile"].includes(notification.type)) {
      return (<img src={notification.body.company_info.logo_image_link} alt="avatar" />);
    }

    if (["applied-job", "follow-company", "accepted-your-job", "rejected-your-job"].includes(notification.type)) {
      return (<img src={notification.body.student_info.avatar_link} alt="avatar" />);
    }

    return (<img src={Images.employerAvatar} alt="avatar" />);
  }

  return (
    <li className="noti-card-container">
      <div className="notification-link" onClick={() => onViewNotification(notification)}>
        <div className={`notification-content ${notification.is_read && "read-notification-content"}`}>
          <div className="notification-content__img">
            {
              renderAvatarLink(notification)
            }
            <div className="notification-content__img__type-icon">
              {
                renderTypeIcon(notification.type)
              }
            </div>
          </div>
          <div className={`notification-content__content ${notification.is_read && "read-notification-content__content"}`}>
            {
              renderContent(notification.type)
            }
          </div>
        </div>
      </div>
      {notification.type !== "invited-job" && <div
        className={`noti-card-container__more-options ${!isHidden && "is-focus-noti-option"}`}
        onClick={onShowMarkAsRead}
      // ref={!isHidden ? ref : null}
      >
        <div className="noti-card-container__more-options__action">
          <MdIcons.MdMoreHoriz className="noti-card-container__more-options__action__icon" />
        </div>
      </div>}
      <ul
        className={`noti-card-container__mark-read ${isHidden && "invisible-noti-options"}`}
        ref={ref}
      >
        {notification.is_read
          ? <li
            className="noti-card-container__mark-read__item"
            onClick={() => onMarkRead(false)}
          >
            <FiIcons.FiCheck className="noti-card-container__mark-read__item__icon" />
            <span>Mark as unread</span>
          </li>
          : <li
            className="noti-card-container__mark-read__item"
            onClick={() => onMarkRead(true)}
          >
            <FiIcons.FiCheck className="noti-card-container__mark-read__item__icon" />
            <span>Mark as read</span>
          </li>
        }
      </ul>
      {!notification.is_read && <div className="noti-card-container__dot">
        <span />
      </div>}
    </li>
  );
}

export default NotificationCard;