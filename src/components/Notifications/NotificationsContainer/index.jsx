import NotificationCard from 'components/Notifications/NotificationCard';
import PropTypes from 'prop-types';
// import Images from 'constants/images';
import React, { useEffect, useRef, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import './NotificationsContainer.scss';

NotificationsContainer.propTypes = {
  notifications: PropTypes.array
};

NotificationsContainer.defaultProps = {
  notifications: []
}

function NotificationsContainer(props) {
  const { notifications } = props;
  const [isAll, setIsAll] = useState(true);
  const [isShowMarkAllAsRead, setIsShowMarkAllAsRead] = useState(false);
  const ref = useRef(null);

  // const notifications = [
  //   {
  //     title: 'Employer creates a new job.',
  //     body: {
  //       job: {
  //         id: 10,
  //         title: 'New Job',
  //         user_id: 3
  //       },
  //       company_info: {
  //         id: 10,
  //         company_name: 'Facebook',
  //         logo_image_link: Images.defaultAvatar,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "create-recruitment",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  //   {
  //     title: 'Employer has updated the job.',
  //     body: {
  //       job: {
  //         id: 10,
  //         title: 'Update Job',
  //         user_id: 3
  //       },
  //       company_info: {
  //         id: 10,
  //         company_name: 'Facebook',
  //         logo_image_link: Images.defaultAvatar,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "update-recruitment",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  //   {
  //     title: 'Invited to the job.',
  //     body: {
  //       job: {
  //         id: 10,
  //         title: 'Invited Job',
  //         user_id: 3
  //       },
  //       company_info: {
  //         id: 10,
  //         company_name: 'Twitter',
  //         logo_image_link: Images.defaultCompany,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "invited-job",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  //   {
  //     title: 'Application rejected.',
  //     body: {
  //       job: {
  //         id: 10,
  //         title: 'Application Job',
  //         user_id: 3
  //       },
  //       company_info: {
  //         id: 10,
  //         company_name: 'The Company C',
  //         logo_image_link: Images.defaultCompany,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "rejected-application",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  //   {
  //     title: 'Application approved.',
  //     body: {
  //       job: {
  //         id: 10,
  //         title: 'Application Job',
  //         user_id: 3
  //       },
  //       company_info: {
  //         id: 10,
  //         company_name: 'WhiteHouse',
  //         logo_image_link: Images.defaultCompany,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "approved-application",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  //   {
  //     title: 'Employer updated avatar profile.',
  //     body: {
  //       company_info: {
  //         id: 6,
  //         company_name: 'Ho Van Khoi',
  //         logo_image_link: Images.defaultCompany,
  //         verify: true,
  //         user_id: 3
  //       }
  //     },
  //     type: "update-avatar",
  //     link: '',
  //     updated_at: "2 minutes ago",
  //     is_read: 0
  //   },
  // ];

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
          {
            notifications.length > 0 &&
            notifications.map((notification, index) => {
              return <NotificationCard
                key={index}
                notification={notification}
              />
            })
          }
          {/* <NotificationCard type="invited-job"/>
          <NotificationCard type="rejected-application"/>
          <NotificationCard type="update-recruitment"/>
          <NotificationCard type="approved-application"/>
          <NotificationCard type="update-avatar"/> */}
        </ul>
      </div>
    </div>
  );
}

export default NotificationsContainer;