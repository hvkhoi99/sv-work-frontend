import React from 'react';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import moment from 'moment';

ExperiencesCardItem.propTypes = {
  experience: PropTypes.object
};

ExperiencesCardItem.defaultProps = {
  experience: {}
}

function ExperiencesCardItem(props) {
  const { experience } = props;

  return (
    <div className="experiences-card__content__item">
      <div className="experiences-card__content__item__icon">
        <FaIcons.FaBuilding className="candidates-item-icon" />
      </div>
      <div className="experiences-card__content__item__info">
        <span>{experience.company}</span>
        <ul>
          <li>
            {moment(new Date(experience.from_date)).format('MM/YYYY')} - {moment(new Date(experience.to_date)).format('MM/YYYY')}
          </li>
          <li>{experience.position}</li>
          <li>{experience.description}</li>
        </ul>
      </div>
    </div>
  );
}

export default ExperiencesCardItem;