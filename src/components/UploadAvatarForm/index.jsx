import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Button } from 'reactstrap';
import './UploadAvatarForm.scss';

UploadAvatarForm.propTypes = {
  label: PropTypes.string,
  onUpload: PropTypes.func,
  isUploading: PropTypes.bool,
  close: PropTypes.func,
};

UploadAvatarForm.defaultProps = {
  label: '',
  onUpload: null,
  isUploading: false,
  close: null,
}

function UploadAvatarForm(props) {
  const { label, onUpload, isUploading, close } = props;
  const [avatar, setAvatar] = useState(null);

  const handleToUploadAvatar = () => {
    onUpload();
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <div className="upload-avatar-form">
      <div className="upload-avatar-form__header">
        <span>
          {label}
        </span>
        <div className="upload-avatar-form__header__dot" />
      </div>
      <div className="upload-avatar-form__main">
        <div className="upload-avatar-form__main__choose-files">
          <input type="file" onChange={onImageChange} />
          {/* <img src={avatar !== null ? avatar : Images.fptSoftware} alt="preview avatar" /> */}
          <AvatarEditor
            image={avatar !== null ? avatar : Images.apple}
            width={250}
            height={250}
            borderRadius={1000}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
        </div>
      </div>
      <div className="upload-avatar-form__footer">
        <Button
          type="button"
          color={'success'}
          disabled={isUploading}
          onClick={handleToUploadAvatar}
        >
          {/* {isUploading && <Spinner children="" size="sm" />} */}
          &nbsp;Upload
        </Button>

        <Button
          type="button"
          color="secondary"
          onClick={close}
        >
          &nbsp;Cancel
        </Button>
      </div>
    </div>
  );
}

export default UploadAvatarForm;