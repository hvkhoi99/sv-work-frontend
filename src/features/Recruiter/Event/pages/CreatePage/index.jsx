import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import './EventCreatePage.scss';
import { useForm } from 'react-hook-form';
import { Spinner } from 'reactstrap';
// import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import helper from 'utils/common';
import LoadingUI from 'components/Loading';
import { TextField } from '@material-ui/core';
import moment from 'moment';

RecruiterCreateEventPage.propTypes = {

};

function RecruiterCreateEventPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");
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
                  <div className="event-create-page__container__main__form__left">
                    <div className="event-create-page__container__main__form__left__form-group">
                      <div className="event-create-page__container__main__form__left__form-group__title">
                        <span>Event Title</span>
                      </div>
                      <div className="event-create-page__container__main__form__left__form-group__input">
                        <input
                          {...register("title")}
                          className={`form-control`}
                          placeholder="Enter your Event Title..."
                          style={
                            errors.title
                              ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                              : null
                          }
                        />
                        {errors.title && <span className="text-danger mt-2">{errors.title.message}</span>}
                      </div>
                    </div>
                    <div className="event-create-page__container__main__form__left__form-group">
                      <div className="event-create-page__container__main__form__left__form-group__title">
                        <span>Location</span>
                      </div>
                      <div className="event-create-page__container__main__form__left__form-group__input">
                        <input
                          {...register("title")}
                          className={`form-control`}
                          placeholder="Enter your Event Title..."
                          style={
                            errors.title
                              ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                              : null
                          }
                        />
                        {errors.title && <span className="text-danger mt-2">{errors.title.message}</span>}
                      </div>
                    </div>
                    <div className="event-create-page__container__main__form__left__form-group__time">
                      <div
                        className="event-create-page__container__main__form__left__form-group__time__start"
                      >
                        <div
                          className="event-create-page__container__main__form__left__form-group__time__start__title"
                        >
                          <span>Event Starts</span>
                        </div>
                        <div
                          className="event-create-page__container__main__form__left__form-group__time__start__input"
                        >
                          <TextField
                            // fullWidth
                            // label={"Event Starts"}
                            {...register("start")}
                            type="date"
                            placeholder={"placeholder"}
                            // disabled={false}
                            error={errors.start}
                            helperText={errors.start && errors.start.message}
                            inputProps={{ min: moment(new Date().toJSON().slice(0, 10)).format('YYYY-MM-DD') }}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {/* {errors.start && <span className="text-danger mt-2">{errors.start.message}</span>} */}
                        </div>
                      </div>
                      <div
                        className="event-create-page__container__main__form__left__form-group__time__end"
                      >
                        <div
                          className="event-create-page__container__main__form__left__form-group__time__end__title"
                        >
                          <span>Event Ends</span>
                        </div>
                        <div
                          className="event-create-page__container__main__form__left__form-group__time__end__input"
                        >
                          <TextField
                            // fullWidth
                            // label={"Event ends"}
                            {...register("end")}
                            type="date"
                            placeholder={"placeholder"}
                            // disabled={false}
                            error={errors.end}
                            helperText={errors.end && errors.end.message}
                            inputProps={{ min: moment(new Date().toJSON().slice(0, 10)).format('YYYY-MM-DD') }}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          {/* {errors.end && <span className="text-danger mt-2">{errors.end.message}</span>} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="event-create-page__container__main__form__btn-gorup">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-success btn-sm"
                    >
                      {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
                      Send
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