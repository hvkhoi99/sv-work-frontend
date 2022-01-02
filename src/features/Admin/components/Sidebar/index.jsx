import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { SidebarData } from '../SidebarData';
import SubMenu from '../SubMenu';
import './Sidebar.scss';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  
  const showSidebar = (e) => {
    e.preventDefault();
    setSidebar(!sidebar);
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={sidebar ? "sidebar__nav" : "sidebar__nav sidebar__nav--active"} >
          <div className="sidebar__wrap">
            {SidebarData.map((item, index) => {
              return <SubMenu
                item={item}
                key={index}
              />;
            })}
          </div>
          <Link className="sidebar__icon" to='#' onClick={(e) => showSidebar(e)}>
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