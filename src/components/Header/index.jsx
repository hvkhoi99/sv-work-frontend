import DefaultHeader from 'components/DefaultHeader';
import RecruiterHeader from 'components/RecruiterHeader';
import StudentHeader from 'components/StudentHeader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { onMessageListener } from 'init-fcm';
import './Header.scss';
import NotificationAlertCard from 'components/Notifications/NotificationAlertCard';
import studentApi from 'api/studentApi';
import { useSelector } from 'react-redux';
import recruiterApi from 'api/recruiterApi';

Header.propTypes = {

}

Header.defaultProps = {

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
        is_read: 0,
      }),
      image: '',
    }
  );

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  
  useEffect(() => {
    showButton();
    console.log("re-render")

    const fetchCountNotifications = async () => {
      try {
        const data = user.role_id === 2
        ? await recruiterApi.getRecruiterCountNotifications()
        : (
          user.role_id === 3
          ? (
            roleId === 2
            ? await studentApi.getRecruiterCountNotifications()
            : await studentApi.getCountNotifications()
          )
          : 0
        )
        setCountUnread(data.data.data)
      } catch (error) {
        console.log("Cannot fetch notifications count. Error: " + error.message);
      }
    }

    fetchCountNotifications();
  }, [roleId, user.role_id])

  window.addEventListener('resize', showButton);

  // console.log({ body: JSON.parse(notification.body) });

  onMessageListener()
    .then((payload) => {
      setCountUnread(countUnread + 1);
      setNotification(payload.notification);
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        setNotification({
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
            is_read: 0,
          }),
          image: '',
        })
      }, 5000);
      console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));

  const handleChangeRole = () => {
    localStorage.setItem("isRecruiterPath", !isRecruiterPath);
    history.push(isRecruiterPath ? "/" : "/recruiter");
  }

  const handleClick = (e) => {
    // e.preventDefault();
    setClick(!click);
  };
  const closeMobileMenu = (e) => {
    // e.preventDefault();
    setClick(false);
  };
  const onChangeAlertStatus = (bool) => {
    return setShowNoti(bool);
  }

  // console.log({countUnread})


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
    />
  ) : (
    <StudentHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
      countUnread={countUnread}
    />
  );


  return <>
    <NotificationAlertCard
      notification={notification}
      showNoti={showNoti}
      onChangeAlertStatus={onChangeAlertStatus}
    />
    {currentUI}
  </>;
}

export default Header;