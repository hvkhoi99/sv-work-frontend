import React from 'react';
import * as AiIcons from 'react-icons/ai';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
// import PropTypes from 'prop-types';
import './StudentOverview.scss';

StudentOverviewCard.propTypes = {

};

function StudentOverviewCard(props) {
  return (
    <div className="student-overview-card">
      <div className="student-overview-card__header">
        <span className="student-overview-card__header__title">
          Overview
        </span>
        <AiIcons.AiOutlineEdit className="student-overview-card__header__icon" />
      </div>
      <div className="student-overview-card__main">
        <div className="student-overview-card__main__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae minima veritatis aut iste quos natus rerum dolorum accusamus sed ipsam nemo,
          fugiat laudantium explicabo eum, nam est voluptate odio omnis.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Repudiandae minima veritatis aut iste quos natus rerum dolorum accusamus sed ipsam nemo,
          fugiat laudantium explicabo eum, nam est voluptate odio omnis.
        </div>
        <div className="student-overview-card__main__more">
          <StudentProfileMoreOptions />
        </div>
      </div>
    </div>
  );
}

export default StudentOverviewCard;