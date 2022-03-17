import { unwrapResult } from '@reduxjs/toolkit';
import LoadingUI from "components/Loading";
import Images from 'constants/images';
import InputField from "custom-fields/InputField";
import { login } from 'features/Auth/adminSlice';
import 'firebase/compat/auth';
import { FastField, Form, Formik } from 'formik';
import { getToken } from 'init-fcm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import './AdminLogin.scss';


AdminLoginPage.propTypes = {

};

function AdminLoginPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isRecruiterPath = localStorage.getItem('isRecruiterPath');
  const [isTokenFound, setTokenFound] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
  })

    console.log("Token found", isTokenFound);
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        // console.log("Token is", data);
        setFirebaseToken(data);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  const onSignIn = async (values) => {
    try {
      if (values.email !== "admin@gmail.com") {
        setIsError(true);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return;
      }

      const action = login({
        email: values.email,
        password: values.password,
        device_token: firebaseToken
      });

      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      isRecruiterPath && localStorage.removeItem('isRecruiterPath');
      history.push("/admin");
    } catch (error) {
      setIsError(true);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <div className="login">
        <div className="login__image">
          <img src={Images.admin} alt="admin" />
        </div>
        <div className="login__formm">
          <div className="login__formm__title">
            <div className="login__formm__title__dot"></div>
            <span>Sign in</span>
            <img src={Images.smDot} alt="smDot" />
          </div>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSignIn}
          >
            {formikProps => {
              const { isSubmitting } = formikProps;

              return (
                <Form>
                  <FastField
                    name="email"
                    component={InputField}

                    placeholder="Email"
                  />

                  <FastField
                    name="password"
                    component={InputField}

                    placeholder="Password*"
                    type="password"
                  />

                  <div className="form-group signin-button">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                      className="btn btn-success btn-sm"
                    >
                      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Sign in
                    </button>
                    {isError &&
                      <span className="text-danger form-span">You have entered an invalid username or password</span>}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );

  return <>{currentUI}</>
}

export default AdminLoginPage;