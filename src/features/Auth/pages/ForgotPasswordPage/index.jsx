import { yupResolver } from '@hookform/resolvers/yup';
import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
// import Footer from 'components/Footer';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from 'reactstrap';
import helper from 'utils/common';
import * as Yup from 'yup';
import './ForgotPasswordPage.scss';
import {useHistory} from 'react-router-dom';

ForgotPasswordPage.propTypes = {
};

function ForgotPasswordPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const schema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
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

  const onSend = async (data) => {
    setErrorMessage("");
    try {
      const params = {
        email: data.email
      }

      const rs = await userApi.forgotPassword(params);
      // console.log({ rs })
      if (rs.data.status) {
        enqueueSnackbar(rs.data.message, { variant: "success" });
        // reset();
        history.push({
          pathname: "/auth/resend-forgot",
          state: {
            email: params.email
          }
        });
      } else {
        setErrorMessage(rs.data.message);
        enqueueSnackbar(rs.data.message, { variant: "error" });
      }
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  const onMoveToHome = () => {
    history.push("/");
  }

  // const onError = (errors) => console.log(errors);

  return (
    <>
      {
        isLoading
          ? <LoadingUI />
          : <div className="forgot-password">
            <div className="forgot-password__container">
              <div className="forgot-password__container__header">
                <span className="forgot-password__container__header__logo" onClick={onMoveToHome}>AIO</span>
                <span className="forgot-password__container__header__short" onClick={onMoveToHome}>
                  Access Illumination Open
                </span>
              </div>
              <div className="forgot-password__container__main">
                <div className="forgot-password__container__main__left">
                  <img src={Images.forgotpass} alt="forgot" />
                </div>
                <div className="forgot-password__container__main__right">
                  <form
                    onSubmit={handleSubmit(onSend)}
                    className="forgot-password__container__main__right__form"
                  >
                    <span className="forgot-password__container__main__right__form__title">
                      Password Assistance
                    </span>
                    <p>
                      Enter your email to recover your password. You will receive an email with instructions.
                      If you are having problems recovering your password contact.
                    </p>
                    <input
                      {...register("email")}
                      className={`form-control`}
                      placeholder="Enter your email address..."
                      style={
                        errors.email
                          ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                          : null
                      }
                    />
                    {errors.email && <span className="text-danger mt-2">{errors.email.message}</span>}
                    <div className="forgot-password__container__main__right__form__footer">
                      {/* <Button
                    type="submit"
                    color={'primary'}
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
                    Send
                  </Button> */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-success btn-sm"
                      >
                        {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
                        Send
                      </button>
                      {errorMessage !== "" && <span className="text-danger mt-2">{errorMessage}</span>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      }
      {/* <Footer /> */}
    </>
  );
}

export default ForgotPasswordPage;