import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import './AdminNav.scss';

AdminNav.propTypes = {

};

function AdminNav(props) {
  const history = useHistory();
  const [hiddenLogout, setHiddenLogout] = useState(true);
  const showLogout = () => {
    setHiddenLogout(!hiddenLogout);
  }
  const logOut = () => {
    setHiddenLogout(!hiddenLogout);
    history.push("/");
  }

  return (
    <div className="nav">
      <div className="nav__icon">
        <Link className="nav__options" to='#'>
          <RiIcons.RiNotification2Fill />
        </Link>
        <Link className="nav__options" to='#' onClick={showLogout}>
          <FaIcons.FaUserCircle />
        </Link>
      </div>
      <ul
        className={hiddenLogout ? "hidden-ul" : "display-ul"}
        onClick={logOut}
      >
        <li>
          <AiIcons.AiOutlineLogout />
          <span>&nbsp; Log out</span>
        </li>
      </ul>
    </div>
  );
}

export default AdminNav;