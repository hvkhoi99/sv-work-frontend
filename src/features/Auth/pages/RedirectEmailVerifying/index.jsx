import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './RedirectEmailVerifyingPage.scss';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Images from 'constants/images';
import { Button } from '@material-ui/core';
import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';

RedirectEmailVerifyingPage.propTypes = {

};

function RedirectEmailVerifyingPage(props) {
  const history = useHistory();
  const historyState = history.location.state !== undefined
    ? history.location.state
    : {
      email: "",
      code: 0,
      role: 0
    };
  const { enqueueSnackbar } = useSnackbar();
  const [resending, setResending] = useState(false);

  const handleResendEmail = async () => {
    setResending(true);
    try {
      const params = {
        email: historyState.email
      }
      const action = await userApi.resendVerificationEmail(params);
      // console.log({ action });
      if (action.data.status === 1) {
        enqueueSnackbar(action.data.message, { variant: "success" });
      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
      }
      setResending(false);
    } catch (error) {
      console.log("Cannot re-send verification email. Error: " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      setResending(false);
    }
  }

  const handleMoveToSignup = () => {
    console.log("Entered New Email.");
    history.push(`/auth/sign-up/${historyState.role}`)
  }

  return (
    <>
      {
        historyState.email === ""
          ? <Redirect exact to="/auth/sign-in" />
          : <div className="redirect-email-verifying-page">
            <div className="redirect-email-verifying-page__container">
              <div className="redirect-email-verifying-page__container__image">
                <img src={Images.verifyImage1} alt="verify-img" />
              </div>
              <div className="redirect-email-verifying-page__container__description">
                <span className="redirect-email-verifying-page__container__description__title">
                  Verify your email address
                </span>
                <div className="redirect-email-verifying-page__container__description__more-info">
                  <div className="redirect-email-verifying-page__container__description__more-info__mail">
                    Your've entered <span>{historyState.email}</span> as the email address for your account.
                  </div>
                  <span className="redirect-email-verifying-page__container__description__more-info__verify">
                    Please check your email and click the verify button to activate your account.
                  </span>
                </div>
              </div>
              <div className="redirect-email-verifying-page__container__group-button">
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
                  Resend Verification Email
                </Button>
                <Button
                  type="button"
                  color="default"
                  variant="contained"
                  onClick={handleMoveToSignup}
                >Entered New Email</Button>
                <Link
                  to="/"
                  className="redirect-email-verifying-page__container__group-button__link"
                >AIO</Link>
              </div>
            </div>
          </div >
      }
    </>
  );
}

export default RedirectEmailVerifyingPage;