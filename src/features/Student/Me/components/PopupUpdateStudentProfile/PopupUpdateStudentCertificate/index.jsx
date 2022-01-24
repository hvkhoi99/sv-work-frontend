import StudentEditCustomButton from 'components/StudentEditCustomButton';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateCertificateForm from '../../StudentUpdateProfileFields/UpdateCertificateForm';
import PropTypes from 'prop-types';

PopupUpdateStudentCertificate.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  isUpdate: PropTypes.bool,
};

PopupUpdateStudentCertificate.defaultProps = {
  initialValues: {},
  onSubmit: null,
  typeIcon: '',
  isUpdate: false,
}

function PopupUpdateStudentCertificate(props) {
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
            <UpdateCertificateForm
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

export default PopupUpdateStudentCertificate;