import adminApi from 'api/adminApi';
import NotificationAlertCard from 'components/Notifications/NotificationAlertCard';
import NotificationsContainer from 'components/Notifications/NotificationsContainer';
import { addToRecruiters, logout } from 'features/Auth/adminSlice';
import { onMessageListener } from 'init-fcm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './AdminNav.scss';

AdminNav.propTypes = {
};

function AdminNav(props) {
  const history = useHistory();
  const [hiddenLogout, setHiddenLogout] = useState(true);
  const [hiddenNoti, setHiddenNoti] = useState(true);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [countUnread, setCountUnread] = useState(0);
  const [showNoti, setShowNoti] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [isScaleUp, setIsScaleUp] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        !hiddenLogout && setHiddenLogout(true);
        !hiddenNoti && setHiddenNoti(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hiddenLogout, hiddenNoti]);

  useEffect(() => {
    const fetchCountNotifications = async () => {
      try {
        const data = await adminApi.getAdminCountNotifications();
        // console.log({ data })
        if (data.data.status === 1) {
          setCountUnread(data.data.data)
        }
      } catch (error) {
        console.log("Cannot fetch notifications count. Error: " + error.message);
      }
    }

    fetchCountNotifications();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const params = {
          page: 1,
          _limit
        }
        const data = await adminApi.getListNotificationsByAdmin(params);
        if (data.data.status === 1) {
          setNotifications(data.data.data.data);
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot fetch notifications. Error " + error.message);
        return;
      }
    }

    fetchNotifications();
  }, [showNoti]);

  useEffect(() => {
    if (countUnread > 0) {
      setIsScaleUp(true);
      setTimeout(() => {
        setIsScaleUp(false);
      }, 350);
    }
  }, [countUnread]);

  const fetchCompanyProfile = async (company) => {
    try {
      const data = await adminApi.getCompanyProfile(company.id);
      console.log({data});
      dispatch(addToRecruiters(data.data.data));
      return;
    } catch (error) {
      console.log("Cannot fetch company profile. Error " + error.message);
      return;
    }
  }

  onMessageListener()
    .then(async (payload) => {
      setCountUnread(countUnread + 1);
      setNotification(payload.notification);
      const body = JSON.parse(payload.notification.body);
      await fetchCompanyProfile(body.company_info);
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
      }, 5000);
      console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));

  const showLogout = (e) => {
    e.preventDefault();
    setHiddenLogout(!hiddenLogout);
    setHiddenNoti(true);
  }

  const showNotification = (e) => {
    e.preventDefault();
    setHiddenNoti(!hiddenNoti);
    setHiddenLogout(true);
  }

  const logOut = async () => {
    setHiddenLogout(true);
    dispatch(logout());
    history.push("/admin/auth/admin-sign-in");
  }

  const onMarkAsRead = async (notificationId, isRead) => {
    try {
      const newNotifications = notifications;
      const index = newNotifications.findIndex(x => x.user_messages_id === notificationId);
      if (index > -1) {
        newNotifications[index].is_read = !newNotifications[index].is_read;
        setCountUnread(isRead ? countUnread - 1 : countUnread + 1);
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

  const onFetchAllNotifications = async () => {
    setIsLoading(true);
    try {
      const params = {
        page: 1,
        _limit
      }
      const data = await adminApi.getListNotificationsByAdmin(params);
      if (data.data.status === 1) {
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
      const data = await adminApi.getListUnreadNotificationsByAdmin(params);
      if (data.data.status === 1) {
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
      const action = await adminApi.markAllAsReadByAdmin();
      // console.log({action});
      if (action.data.status === 0) {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      return;
    } catch (error) {
      console.log("Cannot mark as read this notification. Error: " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  const onChangeAlertStatus = (bool) => {
    return setShowNoti(bool);
  };

  return (
    <>
      <NotificationAlertCard
        notification={notification}
        showNoti={showNoti}
        onChangeAlertStatus={onChangeAlertStatus}
        onMarkAsRead={onMarkAsRead}
      />
      <div className="nav" ref={ref}>
        <div className="nav__icon">
          <div className="nav__icon__group">
            <Link className="nav__options" to='#' onClick={(e) => showNotification(e)}>
              <RiIcons.RiNotification2Fill className="nav__options__icon" />
              {countUnread > 0 && <span
                className={`nav__options__count ${isScaleUp ? "scale-up-count-nav-noti" : "scale-down-count-nav-noti"}`}
              >
                {countUnread}</span>}
            </Link>
            <div className={`nav__icon__group__notification-container ${hiddenNoti && "hidden-ul"}`}>
              <NotificationsContainer
                notifications={notifications}
                onMarkAsRead={onMarkAsRead}
                isLoading={isLoading}
                onFetchUnreadNotifications={onFetchUnreadNotifications}
                onFetchAllNotifications={onFetchAllNotifications}
                onMarkAllAsRead={onMarkAllAsRead}
              />
            </div>
          </div>
          <div className="nav__icon__group">
            <Link className="nav__options" to='#' onClick={(e) => showLogout(e)}>
              <FaIcons.FaUserCircle className={hiddenLogout ? "nav__options__icon" : "nav__options__icon isVisited"} />
            </Link>
            <ul
              className={hiddenLogout ? 'hidden-ul' : 'visible-ul'}
              onClick={logOut}
            >
              <li>
                <AiIcons.AiOutlineLogout />
                <span>&nbsp; Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNav;