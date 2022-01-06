import React from 'react';
import ExperiencesCardItem from '../ExperiencesCardItem';
import PropTypes from 'prop-types';
import './ExperiencesCard.scss';

ExperiencesCard.propTypes = {
  experiences: PropTypes.array
};

ExperiencesCard.defaultProps = {
  experiences: []
}

function ExperiencesCard(props) {
  const { experiences } = props;

  return (
    <div className="experiences-card">
      <div className="experiences-card__title">
        <span>Experiences</span>
      </div>
      <div className="experiences-card__content">
        {
          experiences.length > 0
            ? experiences.map((experience, index) => {
              return <ExperiencesCardItem key={index} experience={experience} />
            })
            : <span className="card-nia">No Information Available.</span>
        }
      </div>
    </div>
  );
}

export default ExperiencesCard;