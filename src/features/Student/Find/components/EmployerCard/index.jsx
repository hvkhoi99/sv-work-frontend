import Images from 'constants/images';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
// import PropTypes from 'prop-types';
import './EmployerCard.scss';

EmployerCard.propTypes = {

};

function EmployerCard(props) {
  return (
    <div className="employer-card">
      <div className="employer-card__avatar">
        <img src={Images.apple} alt="employer-avatar" />
      </div>
      <span className="employer-card__employer-name">Apple Inc.</span>
      <div className="employer-card__location">
        <GrIcons.GrLocation className="employer-card__location__icon" />
        <span className="employer-card__location__name">
          California, American
        </span>
      </div>
      <span className="employer-card__jobs-available">
        5 jobs available
      </span>
    </div>
  );
}

export default EmployerCard;