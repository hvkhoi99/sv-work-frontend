import DefaultHeader from 'components/DefaultHeader';
import RecruiterHeader from 'components/RecruiterHeader';
import StudentHeader from 'components/StudentHeader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { onMessageListener } from 'init-fcm';
import './Header.scss';
import NotificationAlertCard from 'components/Notifications/NotificationAlertCard';
import studentApi from 'api/studentApi';

Header.propTypes = {

}

Header.defaultProps = {

}

function Header(props) {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  let isRecruiterPath = localStorage.getItem('isRecruiterPath') === "true";
  // const [countUnread, setCountUnread] = useState(0);

  const [showNoti, setShowNoti] = useState(false);
  // const [notification, setNotification] = useState({ title: "", body: "" });
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
  }, []);

  useEffect(() => {
    const fetchCountNotifications = async () => {
      try {
        const data = await studentApi.getRecruiterCountNotifications();
        console.log({data})
      } catch (error) {
        console.log("Cannot fetch notifications count. Error: " + error.message);
      }
    }

    fetchCountNotifications();
  }, [])
  

  window.addEventListener('resize', showButton);

  console.log({ body: JSON.parse(notification.body) });

  onMessageListener()
    .then((payload) => {
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
      }, 10000);
      console.log({ payload });
    })
    .catch((err) => console.log("failed: ", err));


  const handleChangeRole = () => {
    localStorage.setItem("isRecruiterPath", !isRecruiterPath);
    history.push(isRecruiterPath ? "/" : "/recruiter");
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onChangeAlertStatus = (bool) => {
    return setShowNoti(bool);
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
    />
  ) : (
    <StudentHeader
      closeMobileMenu={closeMobileMenu}
      handleClick={handleClick}
      click={click}
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