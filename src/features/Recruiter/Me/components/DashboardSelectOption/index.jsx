import React from 'react';
import PropTypes from 'prop-types';

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
    <div className={className} onClick={() => onChangeIndex(option)}>
      <span>{option.name}</span>
    </div>
  );
}

export default DashboardSelectOption;