import StudentEditCustomButton from 'components/StudentEditCustomButton';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateLanguagesForm from '../../StudentUpdateProfileFields/UpdateLanguagesForm';
// import PropTypes from 'prop-types';

PopupUpdateStudentLanguages.propTypes = {
  
};

function PopupUpdateStudentLanguages(props) {
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
            <UpdateLanguagesForm close={close} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentLanguages;