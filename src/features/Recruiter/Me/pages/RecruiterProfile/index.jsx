import Images from 'constants/images';
import React from 'react';
import './RecruiterProfile.scss';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as TiIcons from 'react-icons/ti';

RecruiterProfilePage.propTypes = {

};

function RecruiterProfilePage(props) {
  return (
    <div className="recruiter-profile">
      <div className="recruiter-profile__container">
        <div className="recruiter-profile__container__info">
          <div className="recruiter-profile__container__info__top">
            <div className="recruiter-profile__container__info__top__left">
              <img src={Images.fb} alt="recruiter-avatar" />
            </div>
            <div className="recruiter-profile__container__info__top__right">
              <span className="recruiter-profile__container__info__top__right__recruiter-name">FaceBook Company</span>
              <span className="recruiter-profile__container__info__top__right__recruiter-industry">Software Development</span>
              <span className="recruiter-profile__container__info__top__right__recruiter-address">Danang, Vietnam</span>
              <div className="recruiter-profile__container__info__top__right__btn-edit">
                <button className="btn btn-success btn-sm btn-edit">
                  <MdIcons.MdModeEditOutline className="edit-icon" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="recruiter-profile__container__info__bottom">
            <div className="recruiter-profile__container__info__bottom__industry">
              <AiIcons.AiFillSetting className="bottom-icon" />
              <span className="bottom-span">Software Development</span>
            </div>
            <div className="recruiter-profile__container__info__bottom__mail-contact">
              <AiIcons.AiTwotoneMail className="bottom-icon" />
              <span className="bottom-span">hvkhoi.99@gmail.com</span>
            </div>
            <div className="recruiter-profile__container__info__bottom__phone-number">
              <AiIcons.AiTwotonePhone className="bottom-icon" />
              <span className="bottom-span">0123456789</span>
            </div>
            <div className="recruiter-profile__container__info__bottom__company-size">
              <TiIcons.TiGroup className="bottom-icon" />
              <span className="bottom-span">10000</span>
            </div>
          </div>
        </div>
        <div className="recruiter-profile__container__overall">
          <div className="recruiter-profile__container__overall__title">
            <h3>Overall</h3>
            <GoIcons.GoPrimitiveDot className="title-dot" />
          </div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab reprehenderit suscipit illum voluptate ut deserunt beatae incidunt eum vel porro, perspiciatis error provident nulla hic dolorum obcaecati dignissimos assumenda ipsa.</p>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfilePage;