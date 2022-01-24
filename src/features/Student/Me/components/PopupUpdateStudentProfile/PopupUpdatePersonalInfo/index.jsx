import StudentEditCustomButton from 'components/StudentEditCustomButton';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdatePersonalInfoForm from '../../StudentUpdateProfileFields/UpdatePersonalInfoForm';

PopupUpdateStudentProfile.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

PopupUpdateStudentProfile.defaultProps = {
  initialValues: {},
  onSubmit: null,
}

function PopupUpdateStudentProfile(props) {
  const { onSubmit, initialValues } = props;

  return (
    <div className="popup-update-student-profile">
      <Popup
        trigger={open => <StudentEditCustomButton typeIcon="edit" open={open} />}
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