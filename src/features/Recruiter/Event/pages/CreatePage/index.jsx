import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import LoadingUI from 'components/Loading';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as BsIcons from 'react-icons/bs';
import { Spinner } from 'reactstrap';
import styled from "styled-components";
import helper from 'utils/common';
// import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import './EventCreatePage.scss';

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
    border-bottom: 2px solid green;
  }

  .MuiInput {
    &::placeholder {
      color: 'blue'
    }
  }
`;

function RecruiterCreateEventPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // const { enqueueSnackbar } = useSnackbar();
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
      .required('Description is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // reset
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onPostEvent = (data) => {
    console.log({ data });
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
                      <div className="event-create-page__container__main__form__above__left__action">
                        <div className="event-create-page__container__main__form__above__left__action__upload-image">
                          <BsIcons.BsCloudUpload className="event-create-page__container__main__form__above__left__action__upload-image__icon" />
                        </div>
                        <span className="event-create-page__container__main__form__above__left__action__drag-drop">
                          Drag and drop or select a file to upload
                        </span>
                        <span className="event-create-page__container__main__form__above__left__action__choose">
                          Choose a file to Upload
                        </span>
                      </div>
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
                      Post
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