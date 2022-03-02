import adminApi from 'api/adminApi';
import NotificationCard from 'components/Notifications/NotificationCard';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import * as MdIcons from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import './AdminNotification.scss';

AdminNotificationPage.propTypes = {

};

function AdminNotificationPage(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const _limit = 5;
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const listActions = [
    { id: 0, name: "All Notifications", path: "/admin/notification/all-notifications" },
    { id: 1, name: "Unread Notifications", path: "/admin/notification/unread-notifications" }
  ]

  useEffect(() => {
    setIsLoading(true);
    const fetchNotifications = async () => {
      try {
        const params = {
          page: currentPage,
          _limit
        }
        const data = activeIndex === 0
          ? await adminApi.getListNotificationsByAdmin(params)
          : await adminApi.getListUnreadNotificationsByAdmin(params);
        if (data.data.status === 1) {
          setNotifications(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot fetch notifications. Error " + error.message);
        return;
      }
    }

    fetchNotifications();
  }, [currentPage, activeIndex]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    if (activeIndex === 0) {
      history.push(`/admin/notification/all-notifications?page=${newPage}`);
      return;
    }
    if (activeIndex === 1) {
      history.push(`/admin/notification/unread-notifications?page=${newPage}`);
      return;
    }
  };

  const onFetchAllNotifications = (index) => {
    setActiveIndex(index);
    setCurrentPage(1);
    if (index === 0) {
      history.push(`/admin/notification/all-notifications`);
      return;
    }
    if (index === 1) {
      history.push(`/admin/notification/unread-notifications`);
      return;
    }
  }

  const onMarkAsRead = async (notificationId, isRead) => {
    try {
      const newNotifications = notifications;
      const index = newNotifications.findIndex(x => x.user_messages_id === notificationId);
      if (index > -1) {
        newNotifications[index].is_read = !newNotifications[index].is_read;
        // setCountUnread(isRead ? countUnread - 1 : countUnread + 1);
        const action = await adminApi.markAsReadByAdmin(notificationId);
        if (action.data.status === 0) {
          enqueueSnackbar(action.data.message, { variant: "error" });
        }
      }
      return;
    } catch (error) {
      console.log("Cannot mark as read this notification. Error: " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  };

  return (
    <div className="admin-notification">
      <div className="admin-notification__container">
        <div className="admin-notification__container__left">
          {
            listActions.map((item, index) => {
              const activeClass = activeIndex === item.id ? "is-menu-noti-active" : "";
              return (
                <span
                  key={index}
                  className={`admin-notification__container__left__title ${activeClass}`}
                  onClick={() => onFetchAllNotifications(item.id)}
                >
                  {item.name}
                </span>
              )
            })
          }
          <div className="admin-notification__container__left__img">
            <img src={Images.forgotpass} alt="notification" />
          </div>
        </div>
        <div className="admin-notification__container__right">
          <ul className="admin-notification__container__right__notifications-container">
            {
              isLoading
                ? <>
                  {
                    [1, 2, 3, 4, 5].map((item, index) => {
                      return <li
                        key={index}
                        className="notification-skeleton-item"
                      >
                        <Skeleton circle width={65} height={65} />
                        <span className="notification-skeleton-item__line">
                          <Skeleton count={1} width={280} height={12} />
                          <Skeleton count={1} width={180} height={12} />
                          <Skeleton count={1} width={50} height={12} />
                        </span>
                      </li>
                    })
                  }
                </>
                : <>
                  {(
                    notifications.length > 0
                      ? notifications.map((notification, index) => {
                        return <NotificationCard
                          key={index}
                          notification={notification}
                          onMarkAsRead={onMarkAsRead}
                        // onHiddenAll={onHiddenAll}
                        />
                      })
                      : <span>No Notifications.</span>
                  )}
                </>
            }
          </ul>
          {notifications.length > 0 && <div className="admin-notification__container__right__paginator">
            <ReactPaginate
              previousLabel={
                <MdIcons.MdArrowBackIosNew />
              }
              nextLabel={
                <MdIcons.MdArrowForwardIos />
              }

              // initialPage={1}
              // initialPage={currentPage}
              forcePage={currentPage - 1}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default AdminNotificationPage;