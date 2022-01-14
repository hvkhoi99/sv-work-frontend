import Images from 'constants/images';
import React from 'react';
// import PropTypes from 'prop-types';
import './StudentResumeItem.scss';
import {Link} from 'react-router-dom';

StudentResumeItemCard.propTypes = {
  
};

function StudentResumeItemCard(props) {
  return (
    <div className="student-resume-item-card">
      <div className="student-resume-item-card__background">
        <img src={Images.googleCV} alt="CV" />
        <Link to="#" className="student-resume-item-card__background__overlay" />
      </div>
      <div className="student-resume-item-card__info">
        <span className="student-resume-item-card__info__job-title">ReactJS</span>
      </div>
    </div>
  );
}

export default StudentResumeItemCard;