import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

DashboardSelectOption.propTypes = {
  option: PropTypes.object,
  className: PropTypes.string,
  onChangeIndex: PropTypes.func,
};

DashboardSelectOption.defaultProps = {
  option: {},
  className: '',
  onChangeIndex: null,
}

function DashboardSelectOption(props) {
  const { option, className, onChangeIndex } = props;

  return (
    <Link to={option.path} className={className} onClick={() => onChangeIndex(option)}>
      <span>{option.name}</span>
    </Link>
  );
}

export default DashboardSelectOption;