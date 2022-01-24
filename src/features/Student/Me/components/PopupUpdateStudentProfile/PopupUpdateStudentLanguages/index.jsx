import StudentEditCustomButton from 'components/StudentEditCustomButton';
import React from 'react';
import Popup from 'reactjs-popup';
import UpdateLanguagesForm from '../../StudentUpdateProfileFields/UpdateLanguagesForm';
import PropTypes from 'prop-types';

PopupUpdateStudentLanguages.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  typeIcon: PropTypes.string,
  isUpdate: PropTypes.bool,
};

PopupUpdateStudentLanguages.defaultProps = {
  initialValues: {},
  onSubmit: null,
  typeIcon: '',
  isUpdate: false,
}

function PopupUpdateStudentLanguages(props) {
  const { initialValues, onSubmit, typeIcon, isUpdate } = props;

  return (
    <div className="popup-update-student-profile">
      <Popup
        trigger={
          open => <StudentEditCustomButton
            typeIcon={typeIcon}
            open={open}
          />
        }
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {close => (
          <>
            <UpdateLanguagesForm
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

export default PopupUpdateStudentLanguages;