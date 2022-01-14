import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
// import PropTypes from 'prop-types';
import './StudentPersonalInfo.scss';

StudentPersonalInfoCard.propTypes = {

};

function StudentPersonalInfoCard(props) {
  return (
    <div className="student-personal-info-card">
      <div className="student-personal-info-card__header">
        <span className="student-personal-info-card__header__title">
          Personal Information
        </span>
        <AiIcons.AiOutlineEdit className="student-personal-info-card__header__icon" />
      </div>
      <div className="student-personal-info-card__main">
        <div className="student-personal-info-card__main__left">
          <div className="student-personal-info-card__main__left__dob">
            <BsIcons.BsCalendarDate
              className="student-personal-info-card__icon"
            />
            <span>10/03/1999</span>
          </div>
          <div className="student-personal-info-card__main__left__gender">
            <FaIcons.FaUser
              className="student-personal-info-card__icon"
            />
            <span>{true ? "Male" : "Female"}</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__center">
          <div className="student-personal-info-card__main__center__phone">
            <FaIcons.FaPhoneAlt
              className="student-personal-info-card__icon"
            />
            <span>0702655787</span>
          </div>
          <div className="student-personal-info-card__main__center__email">
            <MdIcons.MdEmail
              className="student-personal-info-card__icon"
            />
            <span>hvkhoi.99@gmail.com</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__right">
          <div className="student-personal-info-card__main__right__address">
            <ImIcons.ImLocation
              className="student-personal-info-card__icon"
            />
            <span>Danang, VietNam</span>
          </div>
          <div className="student-personal-info-card__main__right__nationality">
            <FaIcons.FaPassport
              className="student-personal-info-card__icon"
            />
            <span>Viet Nam</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__more">
          <FiIcons.FiMoreHorizontal className="student-personal-info-card__main__more__icon"/>
        </div>
      </div>
    </div >
  );
}

export default StudentPersonalInfoCard;