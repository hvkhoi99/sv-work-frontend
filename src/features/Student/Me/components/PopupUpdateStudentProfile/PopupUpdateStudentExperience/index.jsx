import StudentEditCustomButton from 'components/StudentEditCustomButton';
import React from 'react';
import Popup from 'reactjs-popup';
// import PropTypes from 'prop-types';
import UpdateExperienceForm from '../../StudentUpdateProfileFields/UpdateExperienceForm';

PopupUpdateStudentExperience.propTypes = {
  
};

function PopupUpdateStudentExperience(props) {
  return (
    <div className="popup-update-student-profile">
      <Popup
        trigger={open => <StudentEditCustomButton typeIcon="add" open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {close => (
          <>
            <UpdateExperienceForm close={close} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentExperience;