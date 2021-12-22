import Footer from 'components/Footer';
import Header from 'components/Header';
import Images from 'constants/images';
import React from 'react';
import * as RiIcons from 'react-icons/ri';
import './RecruiterUpdateProfile.scss';

RecruiterUpdateProfilePage.propTypes = {

};

function RecruiterUpdateProfilePage(props) {
  return (
    <>
      <Header />
      <div className="first-update-profile">
        <div className="first-update-profile__container">
          <div className="first-update-profile__container__information">
            <div className="first-update-profile__container__information__bg">
              {/* <TiIcons.TiWarningOutline className="first-update-profile__container__information__bg__icon" /> */}
              <RiIcons.RiErrorWarningLine className="first-update-profile__container__information__bg__icon" />
              <span>You need to update your employer profile to get started.</span>
            </div>
            <div className="first-update-profile__container__information__img">
              <img src={Images.create} alt="create" />
            </div>
          </div>
          <div className="first-update-profile__container__form">
            <form></form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecruiterUpdateProfilePage;