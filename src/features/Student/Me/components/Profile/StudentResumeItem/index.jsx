// import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
// import { Link } from 'react-router-dom';
import * as TiIcons from 'react-icons/ti';
import './StudentResumeItem.scss';

StudentResumeItemCard.propTypes = {
  cv: PropTypes.object,
  onDeleteCV: PropTypes.func
};

StudentResumeItemCard.defaultProps = {
  cv: {
    id: 0,
    title: '',
    link: ''  
  },
  onDeleteCV: null,
}

function StudentResumeItemCard(props) {
  const { cv, onDeleteCV } = props;

  const renderLink = (link) => {
    if (link.includes('.pdf')) {
      return link.replace('.pdf', '.jpg');
    }
    return link;
  }

  return (
    <div className="student-resume-item-card">
      <div className="student-resume-item-card__background">
        <img src={renderLink(cv.link)} alt="CV" />
        <a
          href={cv.link}
          target="_blank" rel="noopener noreferrer"
          className="student-resume-item-card__background__overlay"
        > </a>
      </div>
      <div className="student-resume-item-card__delete">
        <TiIcons.TiDelete 
        className="student-resume-item-card__delete__icon" 
        onClick={() => onDeleteCV(cv)}
        />
      </div>
      <div className="student-resume-item-card__info">
        <span className="student-resume-item-card__info__job-title">{cv.title}</span>
      </div>
    </div>
  );
}

export default StudentResumeItemCard;