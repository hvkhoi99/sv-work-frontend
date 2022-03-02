import UpdateCompanyInfoForm from 'features/Beginner/components/UpdateCompanyInfoForm';
import PropTypes from 'prop-types';
import React from 'react';
import * as MdIcons from 'react-icons/md';
import Popup from 'reactjs-popup';
import './PopupUpdateProfile.scss';

PopupUpdateProfile.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdateWithPopup: PropTypes.bool,
};

PopupUpdateProfile.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdateWithPopup: false
}

const EditProfileButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    type="button"
    className="btn btn-success btn-sm btn-edit"
    ref={ref}
    {...props}
  >
    <MdIcons.MdModeEditOutline className="edit-icon" />
    Edit Profile
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
  </button>
));

function PopupUpdateProfile(props) {
  const { onSubmit, initialValues, isUpdateWithPopup } = props;

  return (
    <div className="popup-update-profile">
      <Popup
        trigger={open => <EditProfileButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {close => (
          <div className="popup-update-profile-container">
            <div className="popup-update-profile-container__title">
              <label>Update Company Info</label>
              <div className="popup-update-profile-container__title__dot"></div>
            </div>
            <UpdateCompanyInfoForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              close={close}
              isUpdateWithPopup={isUpdateWithPopup}
            />
          </div>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateProfile;