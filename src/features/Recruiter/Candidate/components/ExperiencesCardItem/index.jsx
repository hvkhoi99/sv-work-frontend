import React from 'react';
// import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';

ExperiencesCardItem.propTypes = {

};

function ExperiencesCardItem(props) {
  return (
    <div className="experiences-card__content__item">
      <div className="experiences-card__content__item__icon">
        <FaIcons.FaBuilding className="candidates-item-icon" />
      </div>
      <div className="experiences-card__content__item__info">
        <span>DSI Company</span>
        <ul>
          <li>6/2020 - 9/2020</li>
          <li>Product Developer</li>
          <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, nam.</li>
        </ul>
      </div>
    </div>
  );
}

export default ExperiencesCardItem;