import React from 'react';
// import PropTypes from 'prop-types';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import './StudentEditCustomButton.scss';

const renderIcon = (typeIcon) => {
  switch (typeIcon) {
    case "add":
      return (
        <FiIcons.FiPlusCircle className="student-experiences-card__header__icon" />
      );
    case "edit":
      return (
        <AiIcons.AiOutlineEdit className="popup-update-student-profile-button__icon" />
      );
    case "more-edit":
      return (
        <>
          Edit
        </>
      );
    default:
      break;
  }
}

const StudentEditCustomButton = React.forwardRef(({ open, typeIcon, ...props }, ref) => (
  <button
    type="button"
    className="popup-update-student-profile-button"
    ref={ref}
    {...props}
  >
    {renderIcon(typeIcon)}
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
  </button>
));

export default StudentEditCustomButton;