import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import PropTypes from 'prop-types';
import './PersonalInfoCard.scss';
import moment from 'moment';

PersonalInfoCard.propTypes = {
  personalInfo: PropTypes.object
};

PersonalInfoCard.defaultProps = {
  personalInfo: {}
}

function PersonalInfoCard(props) {
  const { personalInfo } = props;

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
            <span>{moment(personalInfo.date_of_birth).format("MM/DD/YYYY")}</span>
          </div>
          <div className="personal-info-card__content__top__sex">
            <FaIcons.FaUser
              className="candidates-item-icon"
            />
            <span>{personalInfo.gender ? "Male" : "Female"}</span>
          </div>
        </div>
        <div className="personal-info-card__content__center">
          <div className="personal-info-card__content__center__contact-email">
            <MdIcons.MdEmail
              className="candidates-item-icon"
            />
            <span>{personalInfo.email}</span>
          </div>
          <div className="personal-info-card__content__center__phone">
            <FaIcons.FaPhoneAlt
              className="candidates-item-icon"
            />
            <span>{personalInfo.phone_number}</span>
          </div>
        </div>
        <div className="personal-info-card__content__bottom">
          <div className="personal-info-card__content__bottom__location">
            <ImIcons.ImLocation
              className="candidates-item-icon"
            />
            <span>{personalInfo.address}</span>
          </div>
          <div className="personal-info-card__content__bottom__nationality">
            <FaIcons.FaPassport
              className="candidates-item-icon"
            />
            <span>{personalInfo.nationality}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoCard;