import PropTypes from 'prop-types';
import React, { useState } from 'react';
import StudentPaginatorMenuItem from '../StudentPaginatorMenuItem';
import './StudentPaginatorView.scss';
import { useHistory } from 'react-router-dom';

StudentPaginatorView.propTypes = {
  menuItems: PropTypes.array,
};

StudentPaginatorView.defaultProps = {
  menuItems: [],
}

function StudentPaginatorView(props) {
  const { menuItems } = props;
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState(history.location.pathname);


  const onChangeActiveClass = (menuItem) => {
    return setCurrentPath(menuItem.path);
  }

  const renderPageCard = (path) => {
    const result = menuItems.find((menuItem) => menuItem.path === path);
    return result.pageCard;
  }

  return (
    <div className="student-paginator-view">
      <div className="student-paginator-view__menu">
        {
          menuItems.map((menuItem, index) => {
            const activeClass = currentPath === menuItem.path
              ? "student-paginator-view__menu__item active-student-menu-item"
              : "student-paginator-view__menu__item"
            return <StudentPaginatorMenuItem
              key={index}
              index={index}
              menuItem={menuItem}
              activeClass={activeClass}
              onChangeActiveClass={onChangeActiveClass}
            />
          })
        }
      </div>
      <div className="student-paginator-view__page">
        {
          renderPageCard(currentPath)
        }
      </div>
    </div>
  );
}

export default StudentPaginatorView;