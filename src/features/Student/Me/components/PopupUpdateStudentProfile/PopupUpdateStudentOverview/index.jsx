import StudentEditCustomButton from 'components/StudentEditCustomButton';
import TextEditor from 'components/TextEditor';
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';

PopupUpdateStudentOverview.propTypes = {
  onTextChange: PropTypes.func,
  initData: PropTypes.string,
  label: PropTypes.string,
  isUpdating: PropTypes.bool,
  typeIcon: PropTypes.string,
};

PopupUpdateStudentOverview.defaultProps = {
  onTextChange: null,
  initData: '',
  label: '',
  isUpdating: false,
  typeIcon: ''
}

function PopupUpdateStudentOverview(props) {
  const { onTextChange, initData, label, isUpdating, typeIcon } = props;

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
            <TextEditor
              title={label}
              close={close}
              onTextChange={onTextChange}
              initData={initData}
              isUpdating={isUpdating}
            />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentOverview;