import { yupResolver } from '@hookform/resolvers/yup';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as HiIcons from 'react-icons/hi';
import { Link } from 'react-router-dom';
import scroll from 'utils/common';
import * as Yup from 'yup';
import './RecruiterAccount.scss';

RecruiterAccountPage.propTypes = {

};

function RecruiterAccountPage(props) {
  const [isChangeToPasswordForm, setIsChangeToPasswordForm] = useState(false);

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
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });
  // const onSubmit = async data => { console.log(data); };


  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const handleOpenFormChange = () => {
    setIsChangeToPasswordForm(true);
  }

  const onChangePassword = (values) => {
    console.log({ values });
    reset();
    setIsChangeToPasswordForm(false);
  }

  const handleCancel = () => {
    reset();
    setIsChangeToPasswordForm(false);
  }

  return (
    <div className={isChangeToPasswordForm ? "account change-height" : "account"}>
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
              Facebook company
              {true && <HiIcons.HiCheckCircle className="inforCard-icon" />}
            </span>
            <span className="account__container__profile__info__industry">Software development</span>
          </div>
        </div>
        <div className="account__container__settings">
          <span className="account__container__settings__title">
            {isChangeToPasswordForm ? "Change Password" : "Account Settings"}
          </span>
          <div className="account__container__settings__form">
            <form onSubmit={handleSubmit(onChangePassword)}>
              <div className={isChangeToPasswordForm ? "account-form disable-form" : "account-form"}>
                <div className="account-form__item">
                  <span>Email Address</span>
                  <input
                    className="form-control"
                    value="abc@gmail.com"
                    disabled
                  />
                </div>
                <div className="account-form__item">
                  <span className="password-span">Password</span>
                  <div className="account-form__item__password">
                    <input
                      className="form-control"
                      value="****************"
                      disabled
                    />
                    <Link
                      className="change-password-link"
                      // to={`${Paths.recruiterAccount}/change-password`}
                      to="#"
                      onClick={handleOpenFormChange}
                    >Change Password</Link>
                  </div>
                </div>
              </div>
              <div className={isChangeToPasswordForm ? "change-password-form" : "change-password-form disable-form"}>
                <div className="form-group">
                  <span className="span-type-password">Current Password</span>
                  <input
                    className="form-control"
                    {...register("currentPassword")}
                  />
                  {errors.currentPassword && <span className="text-danger">{errors.currentPassword.message}</span>}
                </div>
                <div className="form-group">
                  <span className="span-type-password">New Password</span>
                  <input
                    className="form-control"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                </div>
                <div className="form-group">
                  <span className="span-type-password">Confirm New Password</span>
                  <input
                    className="form-control"
                    {...register("passwordConfirmation")}
                  />
                  {errors.passwordConfirmation && <span className="text-danger">{errors.passwordConfirmation.message}</span>}

                </div>
                <div className="form-group form-button">
                  <button className="btn btn-success btn-sm" type="submit">Save</button>
                  <button className="btn btn-success btn-sm" type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="account__container__bottom">
          <img src={Images.threeMinions} alt="minions" />
        </div>
      </div>
    </div>
  );
}

export default RecruiterAccountPage;