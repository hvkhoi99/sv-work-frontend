import NotificationsContainer from 'components/Notifications/NotificationsContainer';
import Images from 'constants/images';
import Paths from 'constants/paths';
import { logout } from 'features/Auth/userSlice';
import firebase from 'firebase/compat/app';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import LinesEllipsis from 'react-lines-ellipsis';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

StudentHeader.propTypes = {
  closeMobileMenu: PropTypes.func,
  handleClick: PropTypes.func,
  click: PropTypes.bool,
  countUnread: PropTypes.number,
  notifications: PropTypes.array,
  onMarkAsRead: PropTypes.func,
  onFetchUnreadNotifications: PropTypes.func,
  isLoading: PropTypes.bool,
  onFetchAllNotifications: PropTypes.func,
  onMarkAllAsRead: PropTypes.func
};

StudentHeader.defaultProps = {
  closeMobileMenu: null,
  handleClick: null,
  click: false,
  countUnread: 0,
  notifications: [],
  onMarkAsRead: null,
  onFetchUnreadNotifications: null,
  isLoading: true,
  onFetchAllNotifications: null,
  onMarkAllAsRead: null,
}

function StudentHeader(props) {
  const {
    closeMobileMenu, click, handleClick, countUnread,
    notifications, onMarkAsRead, onFetchUnreadNotifications, 
    isLoading, onFetchAllNotifications, onMarkAllAsRead
  } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const ref = useRef(null);
  const history = useHistory();
  const [hiddenNoti, setHiddenNoti] = useState(true);
  const [hiddenMe, setHiddenMe] = useState(true);
  const [isScaleUp, setIsScaleUp] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        hiddenMe === false && setHiddenMe(true);
        hiddenNoti === false && setHiddenNoti(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hiddenMe, hiddenNoti]);

  useEffect(() => {
    if (countUnread > 0) {
      setIsScaleUp(true);
      setTimeout(() => {
        setIsScaleUp(false);
      }, 350);
    }
  }, [countUnread]);

  const showNotification = (e) => {
    e.preventDefault();
    setHiddenNoti(!hiddenNoti);
    setHiddenMe(true);
  }

  const showMe = (e) => {
    setHiddenMe(!hiddenMe);
    setHiddenNoti(true);
  }

  const handleMoveToRecruiter = () => {
    if (user.r_profile !== null) {
      localStorage.setItem("role_id", 2);
      history.push("/recruiter");
      return;
    } else {
      // localStorage.setItem("role_id", 2);
      history.push("/first-update/recruiter");
      return;
    }
  }

  const logOut = async () => {
    setHiddenMe(true);
    dispatch(logout());
    if (user.signin_method === "google.com") {
      await firebase.auth().signOut();
    }
    return history.push("/auth/sign-in");
  }
  
  const onHiddenAll = () => {
    setHiddenMe(true);
    setHiddenNoti(true);
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={Paths.clientHome} className='navbar-logo' onClick={closeMobileMenu}>
            <span className='app-name'>AIO</span>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to={Paths.clientEvent} className='nav-links' onClick={closeMobileMenu}>
                <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
                Event
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={Paths.clientFindJobs}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <ImIcons.ImSearch className="menu-link-icon" />
                Jobs
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='#'
                className='nav-links'
                onClick={handleMoveToRecruiter}
              >
                <FaIcons.FaBuilding className="menu-link-icon" />
                Recruiter
              </Link>
            </li>
          </ul>
          <div ref={ref} className="notify-me">
            <div className="notify-me__icon">
              <div className="notify-me__notify" onClick={(e) => showNotification(e)}>
                <RiIcons.RiNotification4Line className="notify-me__notify__icon" />
                {countUnread > 0 && <span
                  className={`notify-me__notify__count ${isScaleUp ? "scale-up-count-noti" : "scale-down-count-noti"}`}
                >
                  {countUnread}</span>}
              </div>
              <div className="notify-me__notify" onClick={(e) => showMe(e)}>
                {/* <FaIcons.FaUserAstronaut className="notify-me__notify__icon" /> */}
                <img src={
                  user.s_profile === null
                    ? Images.defaultAvatar
                    : user.s_profile.avatar_link
                } alt="student-avatar" />
              </div>
            </div>
            <div className="notify-me__action">
              <div className={hiddenNoti
                ? "notify-me__action__notification"
                : "notify-me__action__notification isVisible"}
              >
                <NotificationsContainer
                  notifications={notifications}
                  onMarkAsRead={onMarkAsRead}
                  onHiddenAll={onHiddenAll}
                  isLoading={isLoading}
                  onFetchUnreadNotifications={onFetchUnreadNotifications}
                  onFetchAllNotifications={onFetchAllNotifications}
                  onMarkAllAsRead={onMarkAllAsRead}
                />
              </div>
              <div className={hiddenMe ? "notify-me__action__me" : "notify-me__action__me isVisible"}>
                <div className="notify-me__action__me__user-infor">
                  Signed in as&nbsp;
                  <LinesEllipsis
                    text={
                      user.s_profile === null
                        ? "Student"
                        : user.s_profile.last_name
                    }
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className="notify-me__action__me__user-infor__name"
                  />
                </div>
                <ul>
                  <li>
                    <Link to={Paths.clientDashboard} className="me-link" onClick={(e) => showMe(e)}>
                      <div className="me-link__left">
                        <MdIcons.MdDashboard className="me-link__left__icon" />
                        <span>Dashboard</span>
                      </div>
                      <div className="me-link__right">
                        <BsIcons.BsChevronRight className="me-link__right__icon" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={Paths.clientProfile} className="me-link" onClick={(e) => showMe(e)}>
                      <div className="me-link__left">
                        <RiIcons.RiProfileLine className="me-link__left__icon" />
                        <span>Profile</span>
                      </div>
                      <div className="me-link__right">
                        <BsIcons.BsChevronRight className="me-link__right__icon" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={Paths.clientAccount} className="me-link" onClick={(e) => showMe(e)}>
                      <div className="me-link__left">
                        <AiIcons.AiFillSetting className="me-link__left__icon" />
                        <span>Account</span>
                      </div>
                      <div className="me-link__right">
                        <BsIcons.BsChevronRight className="me-link__right__icon" />
                      </div>
                    </Link>
                  </li>
                  <li onClick={logOut}>
                    <Link to="#" className="me-link">
                      <div className="me-link__left">
                        <RiIcons.RiLogoutCircleRLine className="me-link__left__icon" />
                        <span>Sign out</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default StudentHeader;