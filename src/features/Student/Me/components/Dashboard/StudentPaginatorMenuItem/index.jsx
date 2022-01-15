import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

StudentPaginatorMenuItem.propTypes = {
  menuItem: PropTypes.object,
  activeClass: PropTypes.string,
  onChangeActiveClass: PropTypes.func
};

StudentPaginatorMenuItem.defaultProps = {
  menuItem: {},
  activeClass: '',
  onChangeActiveClass: null
}

function StudentPaginatorMenuItem(props) {
  const { menuItem, activeClass, onChangeActiveClass } = props;

  const handleChangeActiveClass = (e, index) => {
    // e.preventDefault();
    onChangeActiveClass(index);
  }

  return (
    <Link
      to={menuItem.path}
      className={`${activeClass}`}
      onClick={(e) => handleChangeActiveClass(e, menuItem)}
    >
      {menuItem.icon}
      <span>{menuItem.name}</span>
    </Link>
  );
}

export default StudentPaginatorMenuItem;