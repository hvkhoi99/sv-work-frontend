import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

RecruitmentDetailMenuOption.propTypes = {
  option: PropTypes.object,
  activeClassName: PropTypes.string,
  onChangeIndex: PropTypes.func,
};

RecruitmentDetailMenuOption.defaultProps = {
  option: {},
  activeClassName: '',
  onChangeIndex: null
}

function RecruitmentDetailMenuOption(props) {
  const {option, activeClassName, onChangeIndex} = props;

  return (
    <>
      <Link
        to={option.path}
        className={activeClassName}
        onClick={() => onChangeIndex(option)}
      >{option.name}</Link>
    </>
  );
}

export default RecruitmentDetailMenuOption;