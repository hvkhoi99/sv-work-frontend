import PropTypes from 'prop-types';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import Popup from 'reactjs-popup';
import UpdatePersonalInfoForm from '../UpdatePersonalInfoForm';
import './PopupUpdateStudentProfile.scss';

PopupUpdateStudentProfile.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

PopupUpdateStudentProfile.defaultProps = {
  initialValues: {},
  onSubmit: null,
}

const EditProfileButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    type="button"
    className="popup-update-student-profile-button"
    ref={ref}
    {...props}
  >
    <AiIcons.AiOutlineEdit className="popup-update-student-profile-button__icon" />
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
  </button>
));

function PopupUpdateStudentProfile(props) {
  const { onSubmit, initialValues } = props;

  return (
    <div className="popup-update-student-profile">
      <Popup
        trigger={open => <EditProfileButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {close => (
          <>
            <UpdatePersonalInfoForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              close={close}
            />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentProfile;