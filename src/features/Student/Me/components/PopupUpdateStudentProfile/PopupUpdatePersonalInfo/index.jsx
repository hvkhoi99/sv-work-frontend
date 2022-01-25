import StudentEditCustomButton from 'components/StudentEditCustomButton';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdatePersonalInfoForm from '../../StudentUpdateProfileFields/UpdatePersonalInfoForm';

PopupUpdateStudentProfile.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  typeIcon: PropTypes.string,
};

PopupUpdateStudentProfile.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  typeIcon: ''
}

function PopupUpdateStudentProfile(props) {
  const { onSubmit, initialValues, isUpdate, typeIcon } = props;

  return (
    <div className="popup-update-student-profile">
      <Popup
        trigger={open => <StudentEditCustomButton typeIcon={typeIcon} open={open} />}
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
              isUpdate={isUpdate}
            />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentProfile;