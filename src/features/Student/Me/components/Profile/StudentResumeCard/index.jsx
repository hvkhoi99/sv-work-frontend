import React from 'react';
// import PropTypes from 'prop-types';
import './StudentResumeCard.scss';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import StudentResumeItemCard from '../StudentResumeItem';

StudentResumeCard.propTypes = {

};

function StudentResumeCard(props) {
  return (
    <div className="student-resume-card">
      <div className="student-resume-card__header">
        <span>Manage Resume</span>
        <FiIcons.FiPlusCircle className="student-resume-card__header__icon" />
      </div>
      <div className="student-resume-card__main">
        <div className="student-resume-card__main__items">
          <div className="student-resume-card__main__items__item">
            <StudentResumeItemCard />
          </div>
          <div className="student-resume-card__main__items__item">
            <StudentResumeItemCard />
          </div>
        </div>
        <div className="student-resume-card__main__upload">
          <BsIcons.BsCloudUploadFill
            className="student-resume-card__main__upload__icon"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentResumeCard;