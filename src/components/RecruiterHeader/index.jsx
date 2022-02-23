import Images from 'constants/images';
import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import LinesEllipsis from 'react-lines-ellipsis';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'features/Auth/userSlice';
import firebase from 'firebase/compat/app';
import NotificationsContainer from 'components/Notifications/NotificationsContainer';

RecruiterHeader.propTypes = {
  closeMobileMenu: PropTypes.func,
  handleClick: PropTypes.func,
  click: PropTypes.bool,
};

RecruiterHeader.defaultProps = {
  closeMobileMenu: null,
  handleClick: null,
  click: false,
}

function RecruiterHeader(props) {
  const {
    closeMobileMenu, click, handleClick,
  } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const ref = useRef(null);
  const history = useHistory();
  const [hiddenNoti, setHiddenNoti] = useState(true);
  const [hiddenMe, setHiddenMe] = useState(true);

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

  const showNotification = (e) => {
    e.preventDefault();
    setHiddenNoti(!hiddenNoti);
    setHiddenMe(true);
  }

  const showMe = (e) => {
    setHiddenMe(!hiddenMe);
    setHiddenNoti(true);
    // e.preventDefault();
  }

  const logOut = async () => {
    setHiddenMe(true);
    if (user.signin_method === "google.com") {
      await firebase.auth().signOut()
    }
    dispatch(logout());
    return history.push("/auth/sign-in");
  }

  const handleMoveToStudent = () => {
    if (user.role_id === 2) {
      logOut();
    } else {
      localStorage.setItem("role_id", 3);
      history.push("/")
    }
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={Paths.recruiterHome} className='navbar-logo' onClick={closeMobileMenu}>
            <span className='app-name'>AIO</span>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to={Paths.recruiterEvent} className='nav-links' onClick={closeMobileMenu}>
                <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
                Event
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={Paths.recruiterFindCandidates}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <ImIcons.ImSearch className="menu-link-icon" />
                Candidates
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='#'
                className='nav-links'
                onClick={handleMoveToStudent}
              >
                <FaIcons.FaUserGraduate className="menu-link-icon" />
                Student
              </Link>
            </li>
          </ul>
          <div ref={ref} className="notify-me">
            <div className="notify-me__icon">
              <div className="notify-me__notify" onClick={(e) => showNotification(e)}>
                <RiIcons.RiNotification4Line className="notify-me__notify__icon" />
                <span className="notify-me__notify__count">4</span>
              </div>
              <div className="notify-me__notify" onClick={(e) => showMe(e)}>
                {/* <FaIcons.FaUserAstronaut className="notify-me__notify__icon" /> */}
                <img src={
                  user.r_profile === null
                    ? Images.defaultCompany
                    : user.r_profile.logo_image_link
                } alt="recruiter-avatar" />
              </div>
            </div>
            <div className="notify-me__action">
              <div className={hiddenNoti ? "notify-me__action__notification" : "notify-me__action__notification isVisible"}>
                <NotificationsContainer
                />
              </div>
              <div className={hiddenMe ? "notify-me__action__me" : "notify-me__action__me isVisible"}>
                <div className="notify-me__action__me__user-infor">
                  Signed in as&nbsp;
                  <LinesEllipsis
                    text={
                      user.r_profile === null
                        ? "Recruiter"
                        : user.r_profile.company_name
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
                    <Link to={Paths.recruiterDashboard} className="me-link" onClick={(e) => showMe(e)}>
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
                    <Link to={Paths.recruiterProfile} className="me-link" onClick={(e) => showMe(e)}>
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
                    <Link to={Paths.recruiterAccount} className="me-link" onClick={(e) => showMe(e)}>
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

export default RecruiterHeader;