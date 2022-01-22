import React from 'react';
// import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';

StudentExperiencesItemCard.propTypes = {

};

function StudentExperiencesItemCard(props) {
  return (
    <div className="student-experiences-item-card">
      <div className="student-experiences-item-card__main">
        <div className="student-experiences-item-card__main__building">
          <FaIcons.FaBuilding className="student-experiences-item-card__main__building__icon" />
        </div>
        <div className="student-experiences-item-card__main__info">
          <span className="student-experiences-item-card__main__info__title">
            Mobile App Developer
          </span>
          <span className="student-experiences-item-card__main__info__company">
            Apple's Tower
          </span>
          <span className="student-experiences-item-card__main__info__date">
            6/2020 - 01/2022
          </span>
          <div className="student-experiences-item-card__main__info__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iusto.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iusto.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, iusto.
          </div>
        </div>
      </div>
      <div className="student-experiences-item-card__more">
        <StudentProfileMoreOptions />
      </div>
    </div>
  );
}

export default StudentExperiencesItemCard;