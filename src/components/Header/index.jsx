import { Button } from 'components/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import { useSelector } from 'react-redux';
import Images from 'constants/images';

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
    setHiddenMe(true);
  }

  const showMe = () => {
    setHiddenMe(!hiddenMe);
    setHiddenNoti(true);
  }

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
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
                Event
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/find-job'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Find Job
              </Link>
            </li>
            {user.role_id === 3 ? (
              <li className='nav-item'>
                <Link
                  to='/employer'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Employer
                </Link>
              </li>
            ) : user.role_id === 2 ? (
              <li className='nav-item'>
                <Link
                  to='/employer'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Student
                </Link>
              </li>
            ) : <></>}
            <li className='nav-item'>
              <Link
                to='/employer'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
            </li>
          </ul>
          {!user.role_id ? (
            button && <Button buttonStyle='btn--outline'>SIGN IN</Button>
          ) : (
            <div className="notify-me">
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
                    <MdIcons.MdMoreHoriz className="notify-me__action__notification__header__icon"/>
                  </div>
                  <ul>
                    <li>
                      <Link to="#" className="notification-link">
                        <div className="notification-content">
                          <div className="notification-content__img">
                            <img src={Images.emoji} alt="copany" />
                          </div>
                          <div className="notification-content__content">
                            <p className="notification-content__content__text">
                              <span>Company</span>&nbsp;Minima sed aperiam impedit pariatur exercitationem, consectetur porro similique dolore placeat autem neque modi maiores odio nihil molestias, aut totam in minus.
                            </p>
                            <span className="notification-content__content__date">2 phút trước</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="notification-link">
                        <div className="notification-content">
                          <div className="notification-content__img">
                            <img src={Images.emoji} alt="copany" />
                          </div>
                          <div className="notification-content__content">
                            <p className="notification-content__content__text">
                              <span>Company</span>&nbsp;Minima sed aperiam impedit pariatur exercitationem, consectetur porro similique dolore placeat autem neque modi maiores odio nihil molestias, aut totam in minus.
                            </p>
                            <span className="notification-content__content__date">2 phút trước</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="notification-link">
                        <div className="notification-content">
                          <div className="notification-content__img">
                            <img src={Images.emoji} alt="copany" />
                          </div>
                          <div className="notification-content__content">
                            <p className="notification-content__content__text">
                              <span>Company</span>&nbsp;Minima sed aperiam impedit pariatur exercitationem, consectetur porro similique dolore placeat autem neque modi maiores odio nihil molestias, aut totam in minus.
                            </p>
                            <span className="notification-content__content__date">2 phút trước</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={hiddenMe ? "notify-me__action__me" : "notify-me__action__me isVisible"}>
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
                    <li>
                      <Link to="#" className="me-link">
                        <RiIcons.RiLogoutCircleRLine className="me-link__icon" />
                        <span>Log out</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;