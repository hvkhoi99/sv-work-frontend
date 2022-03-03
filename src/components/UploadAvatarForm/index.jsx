import { Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Slider } from '@mui/material';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Spinner } from 'reactstrap';
import './UploadAvatarForm.scss';

UploadAvatarForm.propTypes = {
  label: PropTypes.string,
  onUpload: PropTypes.func,
  isUploading: PropTypes.bool,
  close: PropTypes.func,
  currentAvatar: PropTypes.string,
};

UploadAvatarForm.defaultProps = {
  label: '',
  onUpload: null,
  isUploading: false,
  close: null,
  currentAvatar: ""
}

function UploadAvatarForm(props) {
  const { label, onUpload, isUploading, close, currentAvatar } = props;
  const [initData, setInitData] = useState({
    currentAvatar,
    scaleValue: 10
  })
  const [fileName, setFileName] = useState("");
  const [editor, setEditor] = useState(null);

  const setEditorRef = (editor) => {
    setEditor(editor);
  };

  const onCrop = async () => {
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      await onUpload(url);
      close();
    }
  };

  const onScaleChange = (scaleChangeEvent) => {
    const newScaleValue = parseFloat(scaleChangeEvent.target.value);
    setInitData(state => ({
      ...state,
      scaleValue: newScaleValue
    }));
  };

  const onImageChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setInitData(state => ({
        ...state,
        currentAvatar: URL.createObjectURL(e.target.files[0])
      }));
      setFileName(e.target.files[0].name);
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
        <div className="upload-avatar-form__main__editor">
          {/* <input
            type="file"
            onChange={onImageChange}
            className="upload-avatar-form__main__editor__choose-files"
          /> */}
          <label htmlFor="upload-photo" style={{
            display: 'flex',
            width: '100%'
          }}>
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={onImageChange}
            />
            <Fab
              color="secondary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"

            >
              <AddIcon /> Upload photo
            </Fab>
            <span style={{
              margin: '.5rem 0 0 1rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              width: '9rem',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}>{fileName}asjndajsdjas</span>
          </label>

          <div className="upload-avatar-form__main__editor__slider">
            <span>Scale</span>
            <Slider
              id='avatar'
              name='avatar'
              value={initData.scaleValue}
              onChange={onScaleChange}
              // step={1}
              min={1}
              max={100}
              valueLabelDisplay='auto'
            />
          </div>
        </div>
        <AvatarEditor
          ref={setEditorRef}
          image={initData.currentAvatar !== "" ? initData.currentAvatar : Images.apple}
          width={250}
          height={250}
          borderRadius={1000}
          color={[0, 0, 0, 0.3]}
          scale={initData.scaleValue * 0.1}
          rotate={0}
        />
      </div>
      <div className="upload-avatar-form__footer">
        <Button
          type="button"
          color={'primary'}
          variant="contained"
          disabled={isUploading}
          onClick={onCrop}
        >
          {isUploading && <Spinner children="" size="sm" className="mr-2" />}
          Upload
        </Button>

        <Button
          type="button"
          variant="contained"
          color="default"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default UploadAvatarForm;