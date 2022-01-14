import { yupResolver } from '@hookform/resolvers/yup';
import userApi from 'api/userApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import helper from 'utils/common';
import * as Yup from 'yup';
import './RecruiterAccount.scss';

RecruiterAccountPage.propTypes = {

};

function RecruiterAccountPage(props) {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const studentAccountPath = "/me/account";
  const recruiterAccountPath = "/recruiter/me/account";
  const { enqueueSnackbar } = useSnackbar();
  const recruiter = useSelector((state) => state.user.current.r_profile);
  const student = useSelector((state) => state.user.current.s_profile);
  const [isChangeToPasswordForm, setIsChangeToPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [showReal, setShowReal] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isError, setIsError] = useState(false);

  const schema = Yup.object().shape({
    currentPassword: Yup
      .string()
      .required('Current Password is required'),
    newPassword: Yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    passwordConfirmation: Yup
      .string()
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Passwords must match'
      )
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  const eyes = [
    { id: 0, type: "currentPassword", name: "Current Password", errorMessage: errors.currentPassword, isOpen: showCurrent },
    { id: 1, type: "newPassword", name: "New Password", errorMessage: errors.newPassword, isOpen: showNew },
    { id: 2, type: "passwordConfirmation", name: "Confirm New Password", errorMessage: errors.passwordConfirmation, isOpen: showConfirm }
  ]

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const handleOpenFormChange = () => {
    setIsChangeToPasswordForm(true);
  }

  const onChangePassword = async (values) => {
    try {
      const params = {
        current_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.passwordConfirmation
      }

      const action = await userApi.changePassword(params);

      if (action.data.status === 1) {
        reset();
        setIsChangeToPasswordForm(false);
        enqueueSnackbar("Your Password has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      setIsError(true);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const handleCancel = () => {
    reset();
    setIsChangeToPasswordForm(false);
  }

  // const handleShowReal = (e) => {
  //   e.preventDefault();
  //   setShowReal(!showReal);
  // }

  const handleShow = (eye) => {
    switch (eye.id) {
      case 0:
        setShowCurrent(!eye.isOpen)
        break;
      case 1:
        setShowNew(!eye.isOpen)
        break;
      case 2:
        setShowConfirm(!eye.isOpen)
        break;
      default:
        break;
    }
  }

  return (
    <>
      {isLoading
        ? <div className="loading-ui">
          <LoadingUI />
        </div>
        : <div className={isChangeToPasswordForm ? "account change-height" : "account"}>
          <div className="account__container">
            <div className="account__container__profile">
              <div className="account__container__profile__img">
                <div className="account__container__profile__img__avatar">
                  <img src={Images.tw} alt="avatar" />
                </div>
                <div className="account__container__profile__img__app">
                  <span className="account__container__profile__img__app__name">AIO</span>
                  <i className="account__container__profile__img__app__signature">Access Illumination Open</i>
                </div>
              </div>
              <div className="account__container__profile__info">
                <span className="account__container__profile__info__name">
                  {
                    currentPath === recruiterAccountPath
                      ? recruiter.company_name
                      : currentPath === studentAccountPath
                        ? (student.first_name + ' ' + student.last_name)
                        : "Error"
                  }
                  {currentPath === recruiterAccountPath && recruiter.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                </span>
                <span className="account__container__profile__info__industry">
                  {
                    currentPath === recruiterAccountPath
                      ? recruiter.company_industry
                      : currentPath === studentAccountPath
                        ? student.job_title
                        : "Error"
                  }
                </span>
              </div>
            </div>
            <div className="account__container__settings">
              <span className="account__container__settings__title">
                {isChangeToPasswordForm ? "Change Password" : "Account Settings"}
              </span>
              <div className="account__container__settings__form">
                <form
                  className={isChangeToPasswordForm ? "disable-form" : ""}
                >
                  <div className={"account-form"}>
                    <div className="account-form__item">
                      <span>Email Address</span>
                      <input
                        className="form-control"
                        value={
                          currentPath === recruiterAccountPath
                            ? recruiter.contact_email
                            : currentPath === studentAccountPath
                              ? student.email
                              : "Error"
                        }
                        disabled
                        autoComplete="email"
                      />
                    </div>
                    <div className="account-form__item">
                      {/* <span className="password-span">Password</span>
                      <div className="account-form__item__password">
                        <input
                          className="form-control"
                          value={`askdnadskjasd`}
                          disabled
                          type={showReal ? "text" : "password"}
                          autoComplete="password"
                        />
                        {
                          showReal
                            ? <FaIcons.FaRegEye
                              onClick={handleShowReal}
                              className="account-form__item__password__icon"
                            />
                            : <FaIcons.FaRegEyeSlash
                              onClick={handleShowReal}
                              className="account-form__item__password__icon"
                            />
                        }
                      </div> */}
                      <div className="account-form__item__link">
                        <Link
                          className="change-password-link"
                          to="#"
                          onClick={handleOpenFormChange}
                        >Change Password</Link>
                      </div>
                    </div>
                  </div>
                </form>
                <form
                  className={isChangeToPasswordForm ? "" : "disable-form"}
                  onSubmit={handleSubmit(onChangePassword)}
                >
                  <div className={"change-password-form"}>
                    {
                      eyes.map((eye, index) => {
                        return <div
                          key={index}
                          className="change-password-form__content"
                        >
                          <span className="span-type-password">{eye.name}</span>
                          <div className="change-password-form__content__input-group">
                            <input
                              type={eye.isOpen ? "text" : "password"}
                              className="form-control"
                              autoComplete={`${eye.type}`}
                              {...register(`${eye.type}`)}
                            />
                            {
                              eye.isOpen
                                ? <FaIcons.FaRegEye
                                  onClick={() => handleShow(eye)}
                                  className="change-password-form__content__input-group__icon"
                                />
                                : <FaIcons.FaRegEyeSlash
                                  onClick={() => handleShow(eye)}
                                  className="change-password-form__content__input-group__icon"
                                />
                            }
                          </div>
                          {eye.errorMessage && <span className="text-danger">{eye.errorMessage.message}</span>}
                        </div>
                      })
                    }
                    <div className="form-group form-button">
                      <button
                        className="btn btn-success btn-sm"
                        type="submit"
                      >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
                        Save
                      </button>
                      <button className="btn btn-success btn-sm" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                    {
                      isError &&
                      <span
                        className="text-danger change-pass-error"
                      >
                        The current password you just entered is incorrect. Please try again.
                      </span>
                    }
                  </div>
                </form>
              </div>
            </div>
            <div className="account__container__bottom">
              <img src={Images.threeMinions} alt="minions" />
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RecruiterAccountPage;