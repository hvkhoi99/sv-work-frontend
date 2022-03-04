import { Button } from '@material-ui/core';
import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import helper from 'utils/common';
import './RedirectSuccessForgotPassword.scss';

RedirectSuccessForgotPassword.propTypes = {
};

function RedirectSuccessForgotPassword(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const historyState = history.location.state !== undefined
    ? history.location.state
    : {
      email: ""
    };
  const { enqueueSnackbar } = useSnackbar();
  const [resending, setResending] = useState(false);

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      const params = {
        email: historyState.email
      }
      const rs = await userApi.forgotPassword(params);
      // console.log({ rs })
      if (rs.data.status) {
        enqueueSnackbar(rs.data.message, { variant: "success" });
      } else {
        enqueueSnackbar(rs.data.message, { variant: "error" });
      }
      setResending(false);
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      setResending(false);
      return;
    }
  }

  const handleMoveToForgotPasswordPage = () => {
    history.push(`/auth/forgot-password`)
  }

  return (
    <>
      {
        historyState.email === ""
          ? <Redirect exact to="/auth/forgot-password" />
          : (
            isLoading
              ? <LoadingUI />
              : <div className="redirect-success-forgot-password">
                <div className="redirect-success-forgot-password__container">
                  <div className="redirect-success-forgot-password__container__image">
                    <img src={Images.verifyImage1} alt="forgot password" />
                  </div>
                  <div className="redirect-success-forgot-password__container__description">
                    <span className="redirect-success-forgot-password__container__description__title">
                      Forgot Password
                    </span>
                    <div className="redirect-success-forgot-password__container__description__more-info">
                      <div className="redirect-success-forgot-password__container__description__more-info__mail">
                        You used the email <span>{historyState.email}</span> to reset your password.
                      </div>
                      <span className="redirect-success-forgot-password__container__description__more-info__verify">
                        Please check your email and click the <strong>Reset Password</strong> button to start resetting your password.
                      </span>
                    </div>
                  </div>
                  <div className="redirect-success-forgot-password__container__group-button">
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      onClick={handleResendEmail}
                      disabled={resending}
                    >
                      {
                        resending && <span className="spinner-border spinner-border-sm mr-1" />
                      }
                      Resend Forgot Password
                    </Button>
                    <Button
                      type="button"
                      color="default"
                      variant="contained"
                      onClick={handleMoveToForgotPasswordPage}
                    >Retype Email</Button>
                    <Link
                      to="/"
                      className="redirect-success-forgot-password__container__group-button__link"
                    >AIO</Link>
                  </div>
                </div>
              </div>
          )
      }
    </>
  );
}

export default RedirectSuccessForgotPassword;