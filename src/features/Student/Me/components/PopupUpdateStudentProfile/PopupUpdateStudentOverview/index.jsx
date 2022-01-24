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
};

PopupUpdateStudentOverview.defaultProps = {
  onTextChange: null,
  initData: '',
  label: '',
  isUpdating: false
}

function PopupUpdateStudentOverview(props) {  
  const { onTextChange, initData, label, isUpdating } = props;

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