import StudentEditCustomButton from 'components/StudentEditCustomButton';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateCertificateForm from '../../StudentUpdateProfileFields/UpdateCertificateForm';
// import PropTypes from 'prop-types';

PopupUpdateStudentCertificate.propTypes = {

};

function PopupUpdateStudentCertificate(props) {
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
            <UpdateCertificateForm close={close} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentCertificate;