import PropTypes from 'prop-types';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import Popup from 'reactjs-popup';
import StudentUploadCV from '../../StudentUpdateProfileFields/StudentUploadCV';

PopupUpdateStudentCV.propTypes = {
  onSubmit: PropTypes.func,
  isUploading: PropTypes.bool,
};

PopupUpdateStudentCV.defaultProps = {
  onSubmit: null,
  isUploading: false,
}

const UploadCVButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    type="button"
    style={{
      border: 'none',
      outline: 'none',
      position: 'relative',
      backgroundColor: 'transparent',
      overFlow: 'hidden',
      width: '10rem',
      height: 'calc(10rem * 29.7 / 21)'
    }}
    ref={ref}
    {...props}
  >
    <BsIcons.BsCloudUploadFill
      className="student-resume-card__main__items__upload__icon"
    />
  </button>
));

function PopupUpdateStudentCV(props) {
  const { onSubmit, isUploading } = props;

  return (
    <div className="popup-upload-cv">
      <Popup
        trigger={open => <UploadCVButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {close => (
          <>
            <StudentUploadCV
              onSubmit={onSubmit}
              isUploading={isUploading}
              close={close}
            />
          </>
        )}
      </Popup>
    </div>
  );
}

export default PopupUpdateStudentCV;