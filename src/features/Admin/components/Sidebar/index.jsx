import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { SidebarData } from '../SidebarData';
import SubMenu from '../SubMenu';
import './styles.scss';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="nav">
          <Link className="nav__options" to='/'>
            <FaIcons.FaHome />
          </Link>
          <Link className="nav__options" to='#'>
            <RiIcons.RiNotification2Fill />
          </Link>
          <Link className="nav__options" to='#'>
            <FaIcons.FaUserCircle />
          </Link>
        </div>
        <div className={sidebar ? "sidebar__nav" : "sidebar__nav sidebar__nav--active"} >
          <div className="sidebar__wrap">
            {SidebarData.map((item, index) => {
              return <SubMenu
                item={item}
                key={index}
              />;
            })}
          </div>
          <Link className="sidebar__icon" to='#' onClick={showSidebar}>
            {sidebar
              ? <AiIcons.AiFillCaretLeft />
              : <AiIcons.AiFillCaretRight />
            }
          </Link>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;