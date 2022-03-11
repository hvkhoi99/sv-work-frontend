import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import LoadingUI from 'components/Loading';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import { Spinner } from 'reactstrap';
import styled from "styled-components";
import helper from 'utils/common';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import './EventCreatePage.scss';
import studentApi from 'api/studentApi';
import { useSelector } from 'react-redux';
import recruiterApi from 'api/recruiterApi';
import { useHistory } from 'react-router-dom';
import Paths from 'constants/paths';
import userApi from 'api/userApi';

RecruiterCreateEventPage.propTypes = {

};


const StyledTextField = styled(TextField)`
  /* default */
  /* .MuiInput-underline:before {
    border-bottom: 1px solid green;
  } */
  /* hover (double-ampersand needed for specificity reasons. */
  /* && .MuiInput-underline:hover:before {
    border-bottom: 2px solid lightblue;
  } */
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid var(--success);
  }

  .MuiInput {
    &::placeholder {
      color: 'blue'
    }
  }
`;

function RecruiterCreateEventPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { event, isEditMode } = history.location.state;
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [uploadData, setUploadData] = useState({
    file: null,
    image: null,
  });
  const schema = Yup.object().shape({
    title: Yup
      .string()
      .required('Event Title is required'),
    location: Yup
      .string()
      .required('Location is required'),
    start: Yup
      .string()
      .required('Event Starts is required'),
    end: Yup
      .string()
      .required('Event Ends is required'),
    description: Yup
      .string()
      .required('Description is required')
      .min(5, "Description must be at least 5 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset
    setValue
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    helper.scrollToTop();
    if (isEditMode) {
      setValue(
        'title', event.title
      );
      setValue(
        'description', event.description
      );
      setValue(
        'location', event.location
      );
      setValue(
        'start', moment(new Date(event.start_date)).format('YYYY-MM-DDThh:mm')
      );
      setValue(
        'end', moment(new Date(event.end_date)).format('YYYY-MM-DDThh:mm')
      );
      setUploadData(state => ({
        ...state,
        image: event.image_link
      }));
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, [isEditMode, event, setValue]);

  const onImageChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setUploadData({
        image: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      });
    }
  }

  const onPostEvent = async (data) => {
    console.log({ data })
    try {
      const formData = new FormData();
      if (uploadData.file) {
        formData.append(
          "file",
          uploadData.file
        );
      }
      formData.append(
        "title",
        data.title
      );
      formData.append(
        "description",
        data.description
      );
      formData.append(
        "location",
        data.location
      );
      formData.append(
        "start_date",
        data.start
      );
      formData.append(
        "end_date",
        data.end
      );
      if (isEditMode) {
        const action = await userApi.updateEvent(event.id, formData);
        if (action.data.status === 1) {
          enqueueSnackbar(action.data.message, { variant: "success" });
          helper.scrollToTop();
          history.goBack();
        } else {
          enqueueSnackbar(action.data.message, { variant: "error" });
        }
      } else {
        const action = user.role_id === 2
          ? await recruiterApi.createEventByRecruiter(formData)
          : (
            user.role_id === 3
              ? (
                roleId === 2
                  ? await studentApi.createEventByRecruiter(formData)
                  : await studentApi.createEventByStudent(formData)
              )
              : 0
          );
        if (action !== 0 && action.data.status === 1) {
          enqueueSnackbar(action.data.message, { variant: "success" });
          helper.scrollToTop();
          history.push(
            roleId === 2
              ? `${Paths.recruiterEvent}/dashboard`
              : `${Paths.clientEvent}/dashboard`
          );
        } else {
          enqueueSnackbar(action.data.message, { variant: "error" });
        }
      }
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  const onDeleteEventImage = () => {
    setUploadData({
      image: null,
      file: null
    });
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="event-create-page">
            <div className="event-create-page__container">
              <div className="event-create-page__container__header">
                <span>Create an Event</span>
                <div className="event-create-page__container__header__dot" />
              </div>
              <div className="event-create-page__container__main">
                <form
                  onSubmit={handleSubmit(onPostEvent)}
                  className="event-create-page__container__main__form"
                >
                  <div className="event-create-page__container__main__form__above">
                    <div className="event-create-page__container__main__form__above__left">
                      <div className="event-create-page__container__main__form__above__left__form-group">
                        <div className="event-create-page__container__main__form__above__left__form-group__title">
                          <span>Event Title</span>
                        </div>
                        <div className="event-create-page__container__main__form__above__left__form-group__input">
                          <input
                            {...register("title")}
                            className={`form-control`}
                            // placeholder="Enter your Event Title..."
                            style={
                              errors.title
                                ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                                : null
                            }
                          />
                          {errors.title && <span className="text-danger mt-2">{errors.title.message}</span>}
                        </div>
                      </div>
                      <div className="event-create-page__container__main__form__above__left__form-group">
                        <div className="event-create-page__container__main__form__above__left__form-group__title">
                          <span>Location</span>
                        </div>
                        <div className="event-create-page__container__main__form__above__left__form-group__input">
                          <input
                            {...register("location")}
                            className={`form-control`}
                            // placeholder="Enter your Event Location..."
                            style={
                              errors.location
                                ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                                : null
                            }
                          />
                          {errors.location && <span className="text-danger mt-2">{errors.location.message}</span>}
                        </div>
                      </div>
                      <div className="event-create-page__container__main__form__above__left__time">
                        <div
                          className="event-create-page__container__main__form__above__left__time__start"
                        >
                          <div
                            className="event-create-page__container__main__form__above__left__time__start__title"
                          >
                            <span>Event Starts</span>
                          </div>
                          <div
                            className="event-create-page__container__main__form__above__left__time__start__input"
                          >
                            <StyledTextField
                              // fullWidth
                              // label={"Event Starts"}
                              {...register("start")}
                              type="datetime-local"
                              className="event-create-page__container__main__form__above__left__time__start__input__input"
                              placeholder={"placeholder"}
                              // disabled={false}
                              error={errors.start}
                              helperText={errors.start && errors.start.message}
                              inputProps={{
                                min: moment(new Date().toJSON().slice(0, 10)).format('YYYY-MM-DDThh:mm'),
                                style: {
                                  fontSize: '0.9rem',
                                }
                              }}

                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            {/* {errors.start && <span className="text-danger mt-2">{errors.start.message}</span>} */}
                          </div>
                        </div>
                        <div
                          className="event-create-page__container__main__form__above__left__time__end"
                        >
                          <div
                            className="event-create-page__container__main__form__above__left__time__end__title"
                          >
                            <span>Event Ends</span>
                          </div>
                          <div
                            className="event-create-page__container__main__form__above__left__time__end__input"
                          >
                            <StyledTextField
                              // fullWidth
                              // label={"Event ends"}
                              {...register("end")}
                              type="datetime-local"
                              className="event-create-page__container__main__form__above__left__time__end__input__input"
                              placeholder={"placeholder"}
                              // disabled={false}
                              error={errors.end}
                              helperText={errors.end && errors.end.message}
                              inputProps={{
                                min: moment(new Date().toJSON().slice(0, 10)).format('YYYY-MM-DDThh:mm'),
                                style: {
                                  fontSize: '0.9rem',
                                  // colorScheme: 'green'
                                }
                              }}

                              InputLabelProps={{
                                shrink: true,

                              }}
                            />
                            {/* {errors.end && <span className="text-danger mt-2">{errors.end.message}</span>} */}
                          </div>
                        </div>
                      </div>
                      <div className="event-create-page__container__main__form__above__left__upload-title">
                        <span>Upload Image</span>
                      </div>
                      {
                        uploadData.image
                          ? <div className="event-create-page__container__main__form__above__left__image">
                            <img src={uploadData.image} alt="event" />
                            <div className="event-create-page__container__main__form__above__left__image__overlay">
                              {/* <h3 className="event-create-page__container__main__form__above__left__image__title">ABC</h3> */}
                              <div className="event-create-page__container__main__form__above__left__image__actions">
                                <RiIcons.RiDeleteBinFill
                                  className="event-create-page__container__main__form__above__left__image__actions__icon"
                                  onClick={onDeleteEventImage}
                                />
                              </div>
                            </div>
                          </div>
                          : <label htmlFor="upload-photo" className="event-create-page__container__main__form__above__left__action">
                            <input
                              style={{ display: 'none' }}
                              id="upload-photo"
                              name="upload-photo"
                              type="file"
                              onChange={onImageChange}
                            />
                            <div className="event-create-page__container__main__form__above__left__action__upload-image">
                              <BsIcons.BsCloudUpload className="event-create-page__container__main__form__above__left__action__upload-image__icon" />
                            </div>
                            <span className="event-create-page__container__main__form__above__left__action__drag-drop">
                              Drag and drop or select a file to upload
                            </span>
                            <span className="event-create-page__container__main__form__above__left__action__choose">
                              Choose a file to Upload
                            </span>
                          </label>
                      }
                    </div>
                    <div className="event-create-page__container__main__form__above__right">
                      <div className="event-create-page__container__main__form__above__right__title">
                        <span>Description</span>
                      </div>
                      <div className="event-create-page__container__main__form__above__right__input">
                        <textarea
                          {...register("description")}
                          className={`form-control`}
                          type="textarea"
                          style={
                            errors.description
                              ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                              : null
                          }
                        />
                        {errors.description && <span className="text-danger mt-2">{errors.description.message}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="event-create-page__container__main__form__btn-group">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-success btn-sm"
                    >
                      {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
                      {isEditMode ? "Save" : "Post"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default RecruiterCreateEventPage;