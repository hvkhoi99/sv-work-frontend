import { Button } from 'components/Button';
import NotificationCard from 'components/NotificationCard';
import { logout } from 'features/Auth/userSlice';
import React, { useEffect, useRef, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Header.scss';

Header.propTypes = {

}

Header.defaultProps = {

}

function Header(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const user = useSelector((state) => state.user.current);
  const [hiddenNoti, setHiddenNoti] = useState(true);
  const [hiddenMe, setHiddenMe] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const currentRoleId = parseInt(localStorage.getItem('role_id'), 10);
  const [roleId, setRoleId] = useState(currentRoleId);

  const ref = useRef(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const showNotification = () => {
    setHiddenNoti(!hiddenNoti);
    hiddenMe && setHiddenMe(true);
  }

  const showMe = () => {
    setHiddenMe(!hiddenMe);
    hiddenNoti && setHiddenNoti(true);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        hiddenMe && setHiddenMe(true);
        hiddenNoti && setHiddenNoti(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const logOut = () => {
    setHiddenMe(true);
    dispatch(logout());
    history.push("/auth/sign-in");
  }

  const changeStatusRole = () => {
    const handleRole = roleId === 3 ? 2 : 3;
    localStorage.setItem("role_id", handleRole)
    setRoleId(handleRole);
  }

  const handleChangeRole = () => {
    const result = user.role_id === 3
      ? changeStatusRole()
      : logOut();
    return result;
  }

  const currentUI = !roleId ? (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          WORK
          <i className="fab fa-linode"></i>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/event' className='nav-links' onClick={closeMobileMenu}>
              <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
              Event
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/find-job'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Find Jobs
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/auth/sign-in'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign in
            </Link>
          </li>
        </ul>
        {button && <Button buttonStyle='btn--outline'>SIGN IN</Button>}
      </div>
    </nav>
  ) : roleId === 2 ? (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          WORK
          <i className="fab fa-linode"></i>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/event' className='nav-links' onClick={closeMobileMenu}>
              <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
              Event
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/find-job'
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
              onClick={handleChangeRole}
            >
              <FaIcons.FaUserGraduate className="menu-link-icon" />
              Student
            </Link>
          </li>
        </ul>
        <div ref={ref} className="notify-me">
          <div className="notify-me__icon">
            <Link to="#" className="notify-me__notify" onClick={showNotification}>
              <RiIcons.RiNotification4Line className="notify-me__notify__icon" />
              <span className="notify-me__notify__count">4</span>
            </Link>
            <Link to="#" className="notify-me__notify" onClick={showMe}>
              <FaIcons.FaUserAstronaut className="notify-me__notify__icon" />
            </Link>
          </div>
          <div className="notify-me__action">
            <div className={hiddenNoti ? "notify-me__action__notification" : "notify-me__action__notification isVisible"}>
              <div className="notify-me__action__notification__header">
                <span>Notification</span>
                <MdIcons.MdMoreHoriz className="notify-me__action__notification__header__icon" />
              </div>
              <ul>
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
              </ul>
            </div>
            <div className={hiddenMe ? "notify-me__action__me" : "notify-me__action__me isVisible"}>
              <p className="notify-me__action__me__user-infor">Signed in as&nbsp;<span>{user.name}</span></p>
              <ul>
                <li>
                  <Link to="#" className="me-link">
                    <MdIcons.MdDashboard className="me-link__icon" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="me-link">
                    <RiIcons.RiProfileLine className="me-link__icon" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="me-link">
                    <AiIcons.AiFillSetting className="me-link__icon" />
                    <span>Account</span>
                  </Link>
                </li>
                <li onClick={logOut}>
                  <Link to="#" className="me-link">
                    <RiIcons.RiLogoutCircleRLine className="me-link__icon" />
                    <span>Sign out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          WORK
          <i className="fab fa-linode"></i>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/event' className='nav-links' onClick={closeMobileMenu}>
              <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
              Event
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/find-job'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              <ImIcons.ImSearch className="menu-link-icon" />
              Find Jobs
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='#'
              className='nav-links'
              onClick={handleChangeRole}
            >
              <FaIcons.FaBuilding className="menu-link-icon" />
              Recruier
            </Link>
          </li>
        </ul>
        <div ref={ref} className="notify-me">
          <div className="notify-me__icon">
            <Link to="#" className="notify-me__notify" onClick={showNotification}>
              <RiIcons.RiNotification4Line className="notify-me__notify__icon" />
              <span className="notify-me__notify__count">4</span>
            </Link>
            <Link to="#" className="notify-me__notify" onClick={showMe}>
              <FaIcons.FaUserAstronaut className="notify-me__notify__icon" />
            </Link>
          </div>
          <div className="notify-me__action">
            <div className={hiddenNoti ? "notify-me__action__notification" : "notify-me__action__notification isVisible"}>
              <div className="notify-me__action__notification__header">
                <span>Notification</span>
                <MdIcons.MdMoreHoriz className="notify-me__action__notification__header__icon" />
              </div>
              <ul>
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
                <NotificationCard />
              </ul>
            </div>
            <div className={hiddenMe ? "notify-me__action__me" : "notify-me__action__me isVisible"}>
              <p className="notify-me__action__me__user-infor">Signed in as&nbsp;<span>{user.name}</span></p>
              <ul>
                <li>
                  <Link to="#" className="me-link">
                    <MdIcons.MdDashboard className="me-link__icon" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="me-link">
                    <RiIcons.RiProfileLine className="me-link__icon" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="me-link">
                    <AiIcons.AiFillSetting className="me-link__icon" />
                    <span>Account</span>
                  </Link>
                </li>
                <li onClick={logOut}>
                  <Link to="#" className="me-link">
                    <RiIcons.RiLogoutCircleRLine className="me-link__icon" />
                    <span>Sign out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return <>{currentUI}</>;
}

export default Header;