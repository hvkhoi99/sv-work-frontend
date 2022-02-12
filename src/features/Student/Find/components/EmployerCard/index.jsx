import PropTypes from 'prop-types';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
// import helper from 'utils/common';
import './EmployerCard.scss';

EmployerCard.propTypes = {
  employer: PropTypes.object,
  onViewCompany: PropTypes.func
};

EmployerCard.defaultProps = {
  employer: {},
  onViewCompany: null
}

function EmployerCard(props) {
  const { employer, onViewCompany } = props;

  return (
    <div className="employer-card" onClick={() => onViewCompany(employer.id)}>
      <div className="employer-card__avatar">
        <img src={
          employer.logo_image_link
        } alt="employer-avatar" />
      </div>
      <span className="employer-card__employer-name">{employer.company_name}</span>
      <div className="employer-card__location">
        <GrIcons.GrLocation className="employer-card__location__icon" />
        <span className="employer-card__location__name">
          {employer.address}
        </span>
      </div>
      <span className="employer-card__jobs-available">
        {employer.count_available_jobs} jobs available
      </span>
    </div>
  );
}

export default EmployerCard;