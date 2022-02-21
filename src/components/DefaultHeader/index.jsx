import { Button } from 'components/Button';
import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import { Link } from 'react-router-dom';


DefaultHeader.propTypes = {
  isRecruiterPath: PropTypes.bool,
  closeMobileMenu: PropTypes.func,
  handleClick: PropTypes.func,
  click: PropTypes.bool,
  handleChangeRole: PropTypes.func,
  button: PropTypes.bool
};

DefaultHeader.defaultProps = {
  isRecruiterPath: false,
  closeMobileMenu: null,
  handleClick: null,
  click: false,
  handleChangeRole: null,
  button: false
}

function DefaultHeader(props) {
  const { isRecruiterPath, closeMobileMenu, click, handleClick, handleChangeRole, button } = props;

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={isRecruiterPath ? Paths.recruiterHome : Paths.clientHome} className='navbar-logo' onClick={closeMobileMenu}>
            <span className='app-name'>AIO</span>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to={isRecruiterPath ? Paths.recruiterEvent : Paths.clientEvent} className='nav-links' onClick={closeMobileMenu}>
                <BsIcons.BsFillCalendar2EventFill className="menu-link-icon" />
                {isRecruiterPath ? "Manage Events" : "Event"}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={isRecruiterPath ? Paths.recruiterFindCandidates : Paths.clientFindJobs}
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <ImIcons.ImSearch className="menu-link-icon" />
                {isRecruiterPath ? "Candidates" : "Jobs"}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='#'
                className='nav-links'
                onClick={handleChangeRole}
              >
                <FaIcons.FaBuilding className="menu-link-icon" />
                {isRecruiterPath ? "Student" : "Recruiter"}
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to={Paths.signin}
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
    </>
  );
}

export default DefaultHeader;