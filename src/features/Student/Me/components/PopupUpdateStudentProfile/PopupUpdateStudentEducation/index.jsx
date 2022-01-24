import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import StudentEditCustomButton from 'components/StudentEditCustomButton';
import UpdateEducationForm from '../../StudentUpdateProfileFields/UpdateEducationForm';

PopupUpdateStudentEducation.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  isUpdate: PropTypes.bool,
};

PopupUpdateStudentEducation.defaultProps = {
  initialValues: {},
  onSubmit: null,
  typeIcon: '',
  isUpdate: false,
}

function PopupUpdateStudentEducation(props) {
  const { initialValues, onSubmit, typeIcon, isUpdate } = props;

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
            <UpdateEducationForm
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

export default PopupUpdateStudentEducation;