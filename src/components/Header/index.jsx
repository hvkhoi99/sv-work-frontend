import DefaultHeader from 'components/DefaultHeader';
import RecruiterHeader from 'components/RecruiterHeader';
import StudentHeader from 'components/StudentHeader';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { onMessageListener } from 'init-fcm';
import './Header.scss';
// import ReactNotificationComponent from 'components/Notifications/ReactNotification';
import NotificationAlertCard from 'components/Notifications/NotificationAlertCard';

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

  const [showNoti, setShowNoti] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

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

  window.addEventListener('resize', showButton);

  // console.log({ showNoti }, { notification });

  onMessageListener()
    .then((payload) => {
      // const newTitle = JSON.parse(payload.notification.title);
      // const newBody = JSON.parse(payload.notification.body);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.description
      });
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
      }, 5000);
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
      title={notification.title}
      body={notification.body}
      showNoti={showNoti}
      onChangeAlertStatus={onChangeAlertStatus}
    />
    {currentUI}
  </>;
}

export default Header;