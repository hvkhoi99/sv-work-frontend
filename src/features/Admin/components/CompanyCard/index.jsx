import PropTypes from 'prop-types';
import React from 'react';
import './CompanyCard.scss';
// import { Link } from 'react-router-dom';

CompanyCard.propTypes = {
  handleCompanyClick: PropTypes.func,
  recruiter: PropTypes.object,
  className: PropTypes.string,
  index: PropTypes.number
}

CompanyCard.defaultProps = {
  handleCompanyClick: null,
  recruiter: {},
  className: '',
  index: 0
}

function CompanyCard(props) {
  const { recruiter, handleCompanyClick, className, index } = props;

  const handleCard = (index, recruiter) => {
    handleCompanyClick(index, recruiter)
  }

  return (
    <div className={className} onClick={() => handleCard(index, recruiter)}>
      <img src={recruiter.logo_image_link} alt="emoji" />
      <div className="company-card__right">
        <span className="company-card__right__name">{recruiter.company_name}</span>
        <span className="company-card__right__industry">{recruiter.company_industry}</span>
      </div>
    </div>
  );
}

export default CompanyCard;