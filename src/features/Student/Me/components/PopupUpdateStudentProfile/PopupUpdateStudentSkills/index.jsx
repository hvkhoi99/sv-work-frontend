import StudentEditCustomButton from 'components/StudentEditCustomButton';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateSkillsForm from '../../StudentUpdateProfileFields/UpdateSkillsForm';

PopupUpdateStudentSkill.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  isUpdate: PropTypes.bool,
};

PopupUpdateStudentSkill.defaultProps = {
  initialValues: {},
  onSubmit: null,
  typeIcon: '',
  isUpdate: false,
}

function PopupUpdateStudentSkill(props) {
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
            <UpdateSkillsForm
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

export default PopupUpdateStudentSkill;