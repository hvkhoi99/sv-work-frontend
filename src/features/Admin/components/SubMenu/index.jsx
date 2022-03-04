import { logout } from 'features/Auth/adminSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './SubMenu.scss';

const SubMenu = ({ item, onUpdateMenuStatus, index }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const dispatch = useDispatch();

  const logOut = async (item) => {
    if (item.path === "#") {
      dispatch(logout());
      history.push("/admin/auth/admin-sign-in");
      return;
    }
    return;
  }

  return (
    <>
      <Link
        className={currentPath === item.path ? "sidebar__link sidebar__default" : "sidebar__link"}
        to={item.path}
        onClick={() => logOut(item)}
      >
        <div>
          {item.icon}
          <span className="sidebar__label">{item.title}</span>
        </div>
      </Link>
    </>
  );
};

export default SubMenu;