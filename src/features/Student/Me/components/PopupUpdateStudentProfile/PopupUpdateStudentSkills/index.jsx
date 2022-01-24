import React from 'react';
// import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import StudentEditCustomButton from 'components/StudentEditCustomButton';
import UpdateSkillsForm from '../../StudentUpdateProfileFields/UpdateSkillsForm';

PopupUpdateStudentSkill.propTypes = {
  
};

function PopupUpdateStudentSkill(props) {
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
            <UpdateSkillsForm close={close} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentSkill;