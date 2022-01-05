import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
// import PropTypes from 'prop-types';
import './PersonalInfoCard.scss';

PersonalInfoCard.propTypes = {

};

function PersonalInfoCard(props) {
  return (
    <div className="personal-info-card">
      <div className="personal-info-card__title">
        <span>Personal Information</span>
      </div>
      <div className="personal-info-card__content">
        <div className="personal-info-card__content__top">
          <div className="personal-info-card__content__top__date">
            <BsIcons.BsCalendarDate
              className="candidates-item-icon"
            />
            <span>03/10/1999</span>
          </div>
          <div className="personal-info-card__content__top__sex">
            <FaIcons.FaUser
              className="candidates-item-icon"
            />
            <span>Male</span>
          </div>
        </div>
        <div className="personal-info-card__content__center">
          <div className="personal-info-card__content__center__contact-email">
            <MdIcons.MdEmail
              className="candidates-item-icon"
            />
            <span>hvkhoi.99@gmail.com</span>
          </div>
          <div className="personal-info-card__content__center__phone">
            <FaIcons.FaPhoneAlt
              className="candidates-item-icon"
            />
            <span>0702655787</span>
          </div>
        </div>
        <div className="personal-info-card__content__bottom">
          <div className="personal-info-card__content__bottom__location">
            <ImIcons.ImLocation
              className="candidates-item-icon"
            />
            <span>Danang, Vietnam</span>
          </div>
          <div className="personal-info-card__content__bottom__nationality">
            <FaIcons.FaPassport
              className="candidates-item-icon"
            />
            <span>Vietnam</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoCard;