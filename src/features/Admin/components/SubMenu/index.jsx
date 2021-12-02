import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SubMenu.scss';

const SubMenu = ({ item, onUpdateMenuStatus, index }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;

  return (
    <>
      <Link
        className={currentPath === item.path ? "sidebar__link sidebar__default" : "sidebar__link"}
        to={item.path}
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