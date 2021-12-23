import Footer from 'components/Footer';
import UpdateCompanyInfoForm from 'components/UpdateCompanyInfoForm';
import Images from 'constants/images';
import React from 'react';
import * as GoIcons from 'react-icons/go';
import './RecruiterUpdateProfile.scss';

RecruiterUpdateProfilePage.propTypes = {

};

function RecruiterUpdateProfilePage(props) {
  return (
    <>
      <div className="first-update-profile">
        <div className="first-update-profile__container">
          <div className="first-update-profile__container__information">
            <div className="first-update-profile__container__information__img">
              <img src={Images.create} alt="create" />
            </div>
            <div className="first-update-profile__container__information__img">
              <img src={Images.recruiter} alt="recruiter" />
            </div>
          </div>
          <div className="first-update-profile__container__form">
            <div className="first-update-profile__container__form__wrap">
              <div className="first-update-profile__container__form__wrap__form-title">
                <label>Update Company Info</label>
                <GoIcons.GoPrimitiveDot className="first-update-profile__container__form__wrap__form-title__icon" />
              </div>
              <UpdateCompanyInfoForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecruiterUpdateProfilePage;