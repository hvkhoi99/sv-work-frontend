import StudentEditCustomButton from 'components/StudentEditCustomButton';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateExperienceForm from '../../StudentUpdateProfileFields/UpdateExperienceForm';

PopupUpdateStudentExperience.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  isUpdate: PropTypes.bool,
};

PopupUpdateStudentExperience.defaultProps = {
  initialValues: {},
  onSubmit: null,
  typeIcon: '',
  isUpdate: false,
}

function PopupUpdateStudentExperience(props) {
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
            <UpdateExperienceForm
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

export default PopupUpdateStudentExperience;