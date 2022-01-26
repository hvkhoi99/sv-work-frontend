import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import './StudentPersonalInfo.scss';

StudentPersonalInfoCard.propTypes = {
  profile: PropTypes.object,
  // initialValues: PropTypes.object,
  onEditStudentProfile: PropTypes.func,
};

StudentPersonalInfoCard.defaultProps = {
  profile: {},
  // initialValues: {},
  onEditStudentProfile: null
}

function StudentPersonalInfoCard(props) {
  const { profile, onEditStudentProfile } = props;

  return (
    <div className="student-personal-info-card">
      <div className="student-personal-info-card__header">
        <span className="student-personal-info-card__header__title">
          Personal Information
        </span>
      </div>
      <div className="student-personal-info-card__main">
        <div className="student-personal-info-card__main__left">
          <div className="student-personal-info-card__main__left__dob">
            <BsIcons.BsCalendarDate
              className="student-personal-info-card__icon"
            />
            <span>{moment(new Date(profile.date_of_birth)).format("MM/DD/YYYY")}</span>
          </div>
          <div className="student-personal-info-card__main__left__gender">
            <FaIcons.FaUser
              className="student-personal-info-card__icon"
            />
            <span>{profile.gender ? "Male" : "Female"}</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__center">
          <div className="student-personal-info-card__main__center__phone">
            <FaIcons.FaPhoneAlt
              className="student-personal-info-card__icon"
            />
            <span>{profile.phone_number}</span>
          </div>
          <div className="student-personal-info-card__main__center__email">
            <MdIcons.MdEmail
              className="student-personal-info-card__icon"
            />
            <span>{profile.email}</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__right">
          <div className="student-personal-info-card__main__right__address">
            <ImIcons.ImLocation
              className="student-personal-info-card__icon"
            />
            <span>{profile.address}</span>
          </div>
          <div className="student-personal-info-card__main__right__nationality">
            <FaIcons.FaPassport
              className="student-personal-info-card__icon"
            />
            <span>{profile.nationality}</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__more">
          <StudentProfileMoreOptions
            typePopup="personal-info"
            initialValues={{
              ...profile,
              gender: profile.gender ? "Male" : "Female",
              date_of_birth: moment(new Date(profile.date_of_birth)).format("YYYY-MM-DD")
            }}
            onSubmit={onEditStudentProfile}
          />
        </div>
      </div>
    </div >
  );
}

export default StudentPersonalInfoCard;