import React from 'react';
import EducationsCardItem from '../EducationsCardItem';
// import PropTypes from 'prop-types';
import './EducationsCard.scss';

EducationsCard.propTypes = {
  
};

function EducationsCard(props) {
  return (
    <div className="educations-card">
      <div className="educations-card__title">
        <span>Educations</span>
      </div>
      <div className="educations-card__content">
        <EducationsCardItem />
      </div>
    </div>
  );
}

export default EducationsCard;