import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as BsIcons from 'react-icons/bs';
import * as GrIcons from 'react-icons/gr';
import * as RiIcons from 'react-icons/ri';
import { Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './StudentUploadCV.scss';

StudentUploadCV.propTypes = {
  onSubmit: PropTypes.func,
  isUploading: PropTypes.bool,
  close: PropTypes.func,
};

StudentUploadCV.defaultProps = {
  onSubmit: null,
  isUploading: false,
  close: null
}

function StudentUploadCV(props) {
  const { onSubmit, close } = props;
  const [fileValue, setFileValue] = useState(null);
  const schema = Yup.object().shape({
    title: Yup
      .string()
      .required('Title of CV is required')
      .typeError('Title of CV is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset
  } = useForm({ resolver: yupResolver(schema) });

  const onUpload = async (data) => {
    console.log({data});
    if (fileValue !== null) {
      const values = {
        title: data.title,
        file: fileValue
      };
      await onSubmit(values);
      close();
    }
  }
  
  const onError = (errors) => console.log(errors);

  // const handleCancel = () => {
  //   reset();
  // }

  const onImageChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setFileValue(e.target.files[0]);
    }
  }

  const handleDeleteCurrentFile = () => {
    setFileValue(null);
  }

  return (
    <div className="student-upload-cv">
      <form onSubmit={handleSubmit(onUpload, onError)} className="student-upload-cv__form">
        <div className="student-upload-cv__form__header">
          <span className="student-upload-cv__form__header__title">
            Upload Your Resume
          </span>
          <div className="student-upload-cv__form__header__dot" />
        </div>
        <div className="student-upload-cv__form__main">
          <div className="student-upload-cv__form__main__header">
            <span className="student-upload-cv__form__main__header__title">
              Title
            </span>
            <input
              {...register("title")}
              className={`form-control`}
              style={
                errors.title
                ? {borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)'}
                : null
              }
            />
            {errors.title && <span className="text-danger">{errors.title.message}</span>}
          </div>
          <div className="student-upload-cv__form__main__center">
            <span className="student-upload-cv__form__main__center__description">
              Support file types are: PDF, JPG, PNG and JPEG
            </span>
          </div>
          {
            fileValue === null
              ? <label htmlFor="upload-photo" className="student-upload-cv__form__main__upload-area">
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={onImageChange}
                />
                <div className="student-upload-cv__form__main__upload-area__image">
                  <BsIcons.BsCloudUpload className="student-upload-cv__form__main__upload-area__image__icon" />
                </div>
                <span className="student-upload-cv__form__main__upload-area__description">
                  Choose a File to Upload
                </span>
              </label>
              : <div className="student-upload-cv__form__main__uploaded-cv">
                <div className="student-upload-cv__form__main__uploaded-cv__item">
                  <div className="student-upload-cv__form__main__uploaded-cv__item__left">
                    <GrIcons.GrDocumentPdf className="student-upload-cv__form__main__uploaded-cv__item__left__icon" />
                    <span>{fileValue.name}</span>
                  </div>
                  <RiIcons.RiDeleteBin5Fill
                    className="student-upload-cv__form__main__uploaded-cv__item__right-icon"
                    onClick={handleDeleteCurrentFile}
                  />
                </div>
              </div>
          }
        </div>
        <div className="student-upload-cv__form__footer">
          <Button
            type="submit"
            color={'primary'}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
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
      </form>
    </div>
  );
}

export default StudentUploadCV;