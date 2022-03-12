import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import DefaultHeader from 'components/DefaultHeader';
import NotificationAlertCard from 'components/Notifications/NotificationAlertCard';
import RecruiterHeader from 'components/RecruiterHeader';
import StudentHeader from 'components/StudentHeader';
import { onMessageListener } from 'init-fcm';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Header.scss';

Header.propTypes = {
}

function Header(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  let isRecruiterPath = localStorage.getItem('isRecruiterPath') === "true";
  const [countUnread, setCountUnread] = useState(0);
  const [showNoti, setShowNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(
    {
      title: '',
      body: JSON.stringify({
        job: {
          id: 0,
          title: '',
          user_id: 0
        },
        company_info: {
          id: 0,
          company_name: '',
          logo_image_link: null,
          verify: 0,
          user_id: 0
        },
        type: '',
        updated_at: '',
        is_read: false,
      }),
      image: '',
    }
  );
  const _limit = 6;

  const onFetchCountNotifications = useCallback(async () => {
    try {
      const data = user.role_id === 2
        ? await recruiterApi.getRecruiterCountNotifications()
        : (
          user.role_id === 3
            ? (
              roleId === 2
                ? await studentApi.getRecruiterCountNotifications()
                : (
                  user.s_profile
                    ? await studentApi.getCountNotifications()
                    : 0
                )
            )
            : 0
        )
      if (data !== 0 && data.data.status === 1) {
        setCountUnread(data.data.data)
      }
    } catch (error) {
      console.log("Cannot fetch notifications count. Error: " + error.message);
    }
  }, [roleId, user.role_id, user.s_profile])

  useEffect(() => {
    showButton();
    onFetchCountNotifications();
  }, [onFetchCountNotifications]);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
    setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const params = {
          page: 1,
          _limit
        }
        const data = user.role_id === 2
          ? await recruiterApi.getListNotificationsByRecruiter(params)
          : (
            user.role_id === 3
              ? (
                roleId === 2
                  ? await studentApi.getListNotificationsByRecruiter(params)
                  : (
                    user.s_profile
                      ? await studentApi.getListNotificationsByStudent(params)
                      : 0
                  )
              )
              : 0
          )
        if (data !== 0 && data.data.status === 1) {
          setIsLoading(false);
          setNotifications(data.data.data.data);
        }
        return;
      } catch (error) {
        console.log("Cannot fetch notifications. Error " + error.message);
        return;
      }
    }

    fetchNotifications();
  }, [roleId, user.role_id, showNoti, user.s_profile]);

  // console.log({ body: JSON.parse(notification.body) });

  onMessageListener()
    .then((payload) => {
      // setCountUnread(countUnread + 1);
      onFetchCountNotifications();
      setNotification(payload.notification);
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        // const newBody = {
        //   ...JSON.parse(notification.body),
        //   is_read: false
        // };
        // setNotification({
        //   ...notification,
        //   body: JSON.stringify(newBody)
        // });
      }, 5000);
      // console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));

  const handleChangeRole = () => {
    localStorage.setItem("isRecruiterPath", !isRecruiterPath);
    history.push(isRecruiterPath ? "/" : "/recruiter");
  }

  const handleClick = (e) => {
    setClick(!click);
  };

  const closeMobileMenu = (e) => {
    setClick(false);
  };

  const onChangeAlertStatus = (bool) => {
    return setShowNoti(bool);
  };

  const onMarkAsRead = async (notificationId, isRead) => {
    try {
      const newNotifications = notifications;
      const index = newNotifications.findIndex(x => x.user_messages_id === notificationId);
      if (index > -1) {
        newNotifications[index].is_read = !newNotifications[index].is_read;
        setCountUnread(isRead ? countUnread - 1 : countUnread + 1);
        const action = user.role_id === 2
          ? await recruiterApi.markAsReadByRecruiter(notificationId)
          : (
            user.role_id === 3
              ? (
                roleId === 2
                  ? await studentApi.markAsReadByRecruiter(notificationId)
                  : (
                    user.s_profile
                      ? await studentApi.markAsReadByStudent(notificationId)
                      : 0
                  )
              )
              : 0
          )
        // console.log({action});
        if (action !== 0 && action.data.status === 0) {
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

  const onFetchAllNotifications = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: 1,
        _limit
      }
      const data = user.role_id === 2
        ? await recruiterApi.getListNotificationsByRecruiter(params)
        : (
          user.role_id === 3
            ? (
              roleId === 2
                ? await studentApi.getListNotificationsByRecruiter(params)
                : (
                  user.s_profile
                    ? await studentApi.getListNotificationsByStudent(params)
                    : 0
                )
            )
            : 0
        )
      if (data !== 0 && data.data.status === 1) {
        setIsLoading(false);
        setNotifications(data.data.data.data);
      }
      return;
    } catch (error) {
      console.log("Cannot fetch notifications. Error " + error.message);
      return;
    }
  }

  const onFetchUnreadNotifications = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: 1,
        _limit
      }
      const data = user.role_id === 2
        ? await recruiterApi.getListUnreadNotificationsByRecruiter(params)
        : (
          user.role_id === 3
            ? (
              roleId === 2
                ? await studentApi.getListUnreadNotificationsByRecruiter(params)
                : (
                  user.s_profile
                    ? await studentApi.getListUnreadNotificationsByStudent(params)
                    : 0
                )
            )
            : 0
        )
      if (data !== 0 && data.data.status === 1) {
        // console.log({ data })
        setIsLoading(false);
        setNotifications(data.data.data.data);
      }
      return;
    } catch (error) {
      console.log("Cannot fetch unread notifications. Error " + error.message);
      return;
    }
  }

  const onMarkAllAsRead = async () => {
    try {
      const newNotifications = notifications;
      newNotifications.map((item) => {
        return item.is_read = true;
      });
      setCountUnread(0);
      const action = user.role_id === 2
        ? await recruiterApi.markAllAsReadByRecruiter()
        : (
          user.role_id === 3
            ? (
              roleId === 2
                ? await studentApi.markAllAsReadByRecruiter()
                : (
                  user.s_profile
                    ? await studentApi.markAllAsReadByStudent()
                    : 0
                )
            )
            : 0
        )
      if (action !== 0 && action.data.status === 0) {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      return;
    } catch (error) {
      console.log("Cannot mark as read this notification. Error: " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  const currentUI = !roleId ? (
    <DefaultHeader
      isRecruiterPath={isRecruiterPath}
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
      handleChangeRole={handleChangeRole}
      button={button}
    />
  ) : roleId === 2 ? (
    <RecruiterHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
      countUnread={countUnread}
      notifications={notifications}
      onMarkAsRead={onMarkAsRead}
      isLoading={isLoading}
      onFetchUnreadNotifications={onFetchUnreadNotifications}
      onFetchAllNotifications={onFetchAllNotifications}
      onMarkAllAsRead={onMarkAllAsRead}
    />
  ) : (
    <StudentHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
      countUnread={countUnread}
      notifications={notifications}
      onMarkAsRead={onMarkAsRead}
      isLoading={isLoading}
      onFetchUnreadNotifications={onFetchUnreadNotifications}
      onFetchAllNotifications={onFetchAllNotifications}
      onMarkAllAsRead={onMarkAllAsRead}
    />
  );

  return <>
    <NotificationAlertCard
      notification={notification}
      showNoti={showNoti}
      onChangeAlertStatus={onChangeAlertStatus}
      onMarkAsRead={onMarkAsRead}
    />
    {currentUI}
  </>;
}

export default Header;