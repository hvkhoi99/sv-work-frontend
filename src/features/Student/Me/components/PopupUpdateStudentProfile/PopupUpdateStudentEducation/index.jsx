import React from 'react';
// import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import StudentEditCustomButton from 'components/StudentEditCustomButton';
import UpdateEducationForm from '../../StudentUpdateProfileFields/UpdateEducationForm';

PopupUpdateStudentEducation.propTypes = {

};

function PopupUpdateStudentEducation(props) {
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
            <UpdateEducationForm close={close} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentEducation;