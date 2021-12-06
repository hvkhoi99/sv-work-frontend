import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import './CompanyCard.scss';
// import { Link } from 'react-router-dom';

CompanyCard.propTypes = {
  handleCompanyClick: PropTypes.func
}

CompanyCard.defaultProps = {
  handleCompanyClick: null
}

function CompanyCard(props) {
  const { recruiter, handleCompanyClick } = props;

  const handleCard = (recruiter) => {
    handleCompanyClick(recruiter)
  }

  return (
    <div className="company-card__item company-card__item--visited" onClick={() => handleCard(recruiter)}>
      <img src={Images.fptSoftware} alt="emoji" />
      <div>
        <span className="company-card__name">{recruiter.company_name}</span>
        <span className="company-card__industry">{recruiter.company_industry}</span>
      </div>
    </div>
  );
}

export default CompanyCard;