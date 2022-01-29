import UploadAvatarForm from 'components/UploadAvatarForm';
import PropTypes from 'prop-types';
import React from 'react';
import * as MdIcons from 'react-icons/md';
import Popup from 'reactjs-popup';
import './PopupUploadAvatar.scss';

PopupUploadAvatar.propTypes = {

};

PopupUploadAvatar.propTypes = {
  label: PropTypes.string,
  onUpload: PropTypes.func,
  isUploading: PropTypes.bool,
  currentAvatar: PropTypes.string,
};

PopupUploadAvatar.defaultProps = {
  label: '',
  onUpload: null,
  isUploading: false,
  currentAvatar: "",
};

const ChangeAvatarButton = React.forwardRef(({ open, ...props }, ref) => (
  <button
    type="button"
    style={{
      border: 'none',
      outline: 'none',
      position: 'relative',
      backgroundColor: 'transparent',
      top: '2.8rem',
      left: '2rem',
      borderRadius: '50%',
      overFlow: 'hidden',

    }}
    className="button"
    ref={ref}
    {...props}
  >
    <MdIcons.MdChangeCircle className="change-icon" />
    {/* Trigger - {props.open ? 'Opened' : 'Closed' */}
  </button>
));

function PopupUploadAvatar(props) {
  const { label, onUpload, isUploading, currentAvatar } = props;

  return (
    <>
      <Popup
        trigger={open => <ChangeAvatarButton open={open} />}
        position="center"
        modal
        nested
        closeOnDocumentClick
      >
        {
          close => (
            <UploadAvatarForm
              label={label}
              onUpload={onUpload}
              isUploading={isUploading}
              close={close}
              currentAvatar={currentAvatar}
            />
          )
        }
      </Popup>
    </>
  );
}

export default PopupUploadAvatar;