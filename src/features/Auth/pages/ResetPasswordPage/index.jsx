import { yupResolver } from '@hookform/resolvers/yup';
import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
// import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as FaIcons from 'react-icons/fa';
import { useLocation, useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import helper from 'utils/common';
import * as Yup from 'yup';
import './ResetPasswordPage.scss';

ResetPasswordPage.propTypes = {
};

function ResetPasswordPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const { token } = queryString.parse(search);
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);
  const schema = Yup.object().shape({
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

  const onResetPassword = async (data) => {
    console.log({ data, token });
    try {
      const params = {
        new_password: data.password,
      };

      const rs = await userApi.resetPassword(params, token);
      // console.log({ rs })
      if (rs.data.status) {
        enqueueSnackbar(rs.data.message, { variant: "success" });
        history.push("/auth/sign-in");
      } else {
        enqueueSnackbar(rs.data.message, { variant: "error" });
      }
      return;
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return;
    }
  }

  return (
    <>
      {
        isLoading
          ? <LoadingUI />
          : <div className="change-password">
            <div className="change-password__container">
              <div className="change-password__container__header">
                <span className="change-password__container__header__logo">AIO</span>
                <span className="change-password__container__header__short">
                  Access Illumination Open
                </span>
              </div>
              <div className="change-password__container__main">
                <div className="change-password__container__main__left">
                  <img src={Images.reset} alt="reset" />
                </div>
                <div className="change-password__container__main__right">
                  <form
                    onSubmit={handleSubmit(onResetPassword)}
                    className="change-password__container__main__right__form"
                  >
                    <div className="change-password__container__main__right__form__dot" />
                    <span className="change-password__container__main__right__form__title">
                      Reset Password
                      <span className="change-password__container__main__right__form__title__dot" />
                    </span>

                    <div className="change-password__container__main__right__form__form-group">
                      <input
                        {...register("password")}
                        type={isOpenA ? "text" : "password"}
                        className={`form-control`}
                        autoComplete={"password"}
                        placeholder="New Password*"
                        style={
                          errors.password
                            ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                            : null
                        }
                      />
                      <div
                        className="change-password__container__main__right__form__form-group__eyes"
                        onClick={() => setIsOpenA(!isOpenA)}
                      >
                        {
                          isOpenA
                            ? <FaIcons.FaRegEye className="change-password__container__main__right__form__form-group__eyes__icon" />
                            : <FaIcons.FaRegEyeSlash className="change-password__container__main__right__form__form-group__eyes__icon" />
                        }
                      </div>
                      {errors.password && <span className="text-danger mt-2">{errors.password.message}</span>}
                    </div>
                    <div className="change-password__container__main__right__form__form-group">
                      <input
                        {...register("passwordConfirmation")}
                        type={isOpenB ? "text" : "password"}
                        className={`form-control`}
                        autoComplete={"passwordConfirmation"}
                        placeholder=""
                        style={
                          errors.passwordConfirmation
                            ? { borderColor: 'red', boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.2)' }
                            : null
                        }
                      />
                      <div
                        className="change-password__container__main__right__form__form-group__eyes"
                        onClick={() => setIsOpenB(!isOpenB)}
                      >
                        {
                          isOpenB
                            ? <FaIcons.FaRegEye className="change-password__container__main__right__form__form-group__eyes__icon" />
                            : <FaIcons.FaRegEyeSlash className="change-password__container__main__right__form__form-group__eyes__icon" />
                        }
                      </div>
                      {errors.passwordConfirmation && <span className="text-danger mt-2">{errors.passwordConfirmation.message}</span>}
                    </div>

                    <div className="change-password__container__main__right__form__footer">
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
          </div>
      }
    </>
  );
}

export default ResetPasswordPage;