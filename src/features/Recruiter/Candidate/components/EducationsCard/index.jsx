import React from 'react';
import EducationsCardItem from '../EducationsCardItem';
import PropTypes from 'prop-types';
import './EducationsCard.scss';

EducationsCard.propTypes = {
  educations: PropTypes.array
};

EducationsCard.defaultProps = {
  educations: [],
}

function EducationsCard(props) {
  const { educations } = props;

  return (
    <div className="educations-card">
      <div className="educations-card__title">
        <span>Educations</span>
      </div>
      <div className="educations-card__content">
        {
          educations.length > 0
            ? educations.map((education, index) => {
              return <EducationsCardItem key={index} education={education} />
            })
            : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default EducationsCard;