import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingUI from "components/Loading";
import Images from 'constants/images';
import RHFInputField from 'custom-fields/RHFInputField';
import { login } from 'features/Auth/adminSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
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

  const onLogin = async (values) => {
    try {
      const action = login({
        email: values.email,
        password: values.password
      });

      const actionResult = await dispatch(action);
      unwrapResult(actionResult);

      history.push("/admin");
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
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
            <span>Sign in</span>
            <img src={Images.smDot} alt="smDot" />
          </div>
          <form onSubmit={handleSubmit(onLogin)} onKeyDown={(e) => checkKeyDown(e)}>
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
            <div className="form-group button">
              <button disabled={isSubmitting} className="btn btn-success btn-sm" type="submit">
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );

  return <>{currentUI}</>
}

export default AdminLoginPage;