import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import NotificationCard from 'components/Notifications/NotificationCard';
import PropTypes from 'prop-types';
// import Images from 'constants/images';
import React, { useEffect, useRef, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import './NotificationsContainer.scss';

NotificationsContainer.propTypes = {
  notifications: PropTypes.array,
  onMarkAsRead: PropTypes.func,
  onHiddenAll: PropTypes.func,
  onFetchUnreadNotifications: PropTypes.func,
  isLoading: PropTypes.bool,
  onFetchAllNotifications: PropTypes.func,
  onMarkAllAsRead: PropTypes.func
};

NotificationsContainer.defaultProps = {
  notifications: [],
  onMarkAsRead: null,
  onHiddenAll: null,
  onFetchUnreadNotifications: null,
  isLoading: true,
  onFetchAllNotifications: null,
  onMarkAllAsRead: null,
}

function NotificationsContainer(props) {
  const {
    notifications, onMarkAsRead, onHiddenAll,
    onFetchUnreadNotifications, isLoading, onFetchAllNotifications, onMarkAllAsRead
  } = props;
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [isAll, setIsAll] = useState(true);
  const [isShowMarkAllAsRead, setIsShowMarkAllAsRead] = useState(false);
  const ref = useRef(null);
  const [moreNotifications, setMoreNotifications] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const _limit = 6;

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

  useEffect(() => {
    setMoreNotifications(notifications);
  }, [notifications]);

  const onLoadMore = async (e) => {
    const bottom = Number((e.target.scrollHeight - e.target.scrollTop).toFixed(0)) - e.target.clientHeight < 1;
    if (bottom && (lastPage >= currentPage) && !isMoreLoading) {
      setCurrentPage(++currentPage);
      setIsMoreLoading(true);
      switch (isAll) {
        case true:
          try {
            const params = {
              page: currentPage,
              _limit
            }
            const data = user.role_id === 2
              ? await recruiterApi.getListNotificationsByRecruiter(params)
              : (
                user.role_id === 3
                  ? (
                    roleId === 2
                      ? await studentApi.getListNotificationsByRecruiter(params)
                      : await studentApi.getListNotificationsByStudent(params)
                  )
                  : []
              )
            if (data.data.status === 1) {
              // console.log({data})
              setLastPage(data.data.data.last_page);
              setTimeout(() => {
                setMoreNotifications(moreNotifications.concat(data.data.data.data));
                setIsMoreLoading(false);
              }, 2000);
            }
            return;
          } catch (error) {
            setIsMoreLoading(false);
            console.log("Cannot fetch notifications. Error " + error.message);
            return;
          }
        case false:
          try {
            const params = {
              page: currentPage,
              _limit
            }
            const data = user.role_id === 2
              ? await recruiterApi.getListUnreadNotificationsByRecruiter(params)
              : (
                user.role_id === 3
                  ? (
                    roleId === 2
                      ? await studentApi.getListUnreadNotificationsByRecruiter(params)
                      : await studentApi.getListUnreadNotificationsByStudent(params)
                  )
                  : []
              )
            if (data.data.status === 1) {
              setLastPage(data.data.data.last_page);
              setTimeout(() => {
                setIsMoreLoading(false);
                setMoreNotifications(moreNotifications.concat(data.data.data.data));
              }, 2000);
            }
            return;
          } catch (error) {
            setIsMoreLoading(false);
            console.log("Cannot fetch unread notifications. Error " + error.message);
            return;
          }
        default:
          break;
      }
    }
  }

  const onViewMode = (type) => {
    switch (type) {
      case "all":
        setIsAll(true);
        setCurrentPage(1);
        setLastPage(1);
        onFetchAllNotifications();
        setMoreNotifications(notifications);
        break;
      case "unread":
        setIsAll(false);
        setCurrentPage(1);
        setLastPage(1);
        onFetchUnreadNotifications();
        setMoreNotifications(notifications);
        break;
      default: break;
    }
  }

  const onShowMarkAllAsRead = () => {
    setIsShowMarkAllAsRead(!isShowMarkAllAsRead);
  }

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    setIsShowMarkAllAsRead(false);
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
            onClick={handleMarkAllAsRead}
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
          {/* <span
            className="notifications-container__content__header__see-all"
          >
            See All
          </span> */}
        </div>
        <ul onScroll={onLoadMore}>
          {
            isLoading
              ? <>
                {
                  [1, 2, 3, 4, 5, 6].map((item, index) => {
                    return <li
                      key={index}
                      className="notification-skeleton-item"
                    >
                      <Skeleton circle width={70} height={70} />
                      <span className="notification-skeleton-item__line">
                        <Skeleton count={1} width={220} height={15} />
                        <Skeleton count={1} width={150} height={15} />
                        <Skeleton count={1} width={50} height={15} />
                      </span>
                    </li>
                  })
                }
              </>
              : <>
                {(
                  moreNotifications.length > 0
                    ? moreNotifications.map((notification, index) => {
                      return <NotificationCard
                        key={index}
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onHiddenAll={onHiddenAll}
                      />
                    })
                    : <span>No Notifications.</span>
                )}
                {
                  isMoreLoading &&
                  [1, 2].map((item, index) => {
                    return <li
                      key={index}
                      className="notification-skeleton-item"
                    >
                      <Skeleton circle width={70} height={70} />
                      <span className="notification-skeleton-item__line">
                        <Skeleton count={1} width={220} height={15} />
                        <Skeleton count={1} width={150} height={15} />
                        <Skeleton count={1} width={50} height={15} />
                      </span>
                    </li>
                  })
                }
              </>
          }
        </ul>
      </div>
    </div>
  );
}

export default NotificationsContainer;