import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from '@reduxjs/toolkit';
import Footer from 'components/Footer';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import RHFInputField from 'custom-fields/RHFInputField';
import { signup } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import '../SignIn/SignIn.scss';

SignUpPage.propTypes = {

};

function SignUpPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { roleId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    passwordConfirmation: Yup
      .string()
      .oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      )
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onRegister = async (values) => {
    try {
      const action = signup({
        email: values.email,
        password: values.passwordConfirmation,
        role_id: parseInt(roleId, 10)
      });

      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      enqueueSnackbar("You have successfully registered an account.", { variant: "success" });
      history.push("/auth/sign-in");
    } catch (error) {
      setIsError(true);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <>
        <div className="login">
          <div className="login__image">
            <img src={Images.teamwork} alt="admin" />
          </div>
          <div className="login__form">
            <div className="login__form__ellipse">
              <img src={Images.ellipse} alt="ellipse" />
            </div>
            <div className="login__form__title">
              <span>Sign up</span>
              <img src={Images.smDot} alt="smDot" />
            </div>
            <form onSubmit={handleSubmit(onRegister)} onKeyDown={(e) => checkKeyDown(e)}>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="email"
                  control={control}
                  scheme={errors.email}
                  placeholder="Email"
                  moreClassName="shadow-input radius"
                />
              </div>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="password"
                  control={control}
                  scheme={errors.password}
                  type="password"
                  moreClassName="shadow-input radius"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="passwordConfirmation"
                  control={control}
                  scheme={errors.passwordConfirmation}
                  type="password"
                  moreClassName="shadow-input radius"
                  placeholder="Confirm password"
                />
              </div>
              <div className="form-group button signin-button">
                <button disabled={isSubmitting} className="btn btn-success btn-sm justify-content-center" type="submit">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Sign Up
                </button>
                {isError &&
                  <span className="text-danger form-span">This email address is already being used</span>}
              </div>
              <div className="form-group signUp">
                <span>Already have an account?</span>
                <Link to="/auth/sign-in" className="signUp__link">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );

  return <>{currentUI}</>
}

export default SignUpPage;