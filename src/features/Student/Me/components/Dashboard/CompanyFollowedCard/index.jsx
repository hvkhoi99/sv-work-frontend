import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './CompanyFollowedCard.scss';

CompanyFollowedCard.propTypes = {
  company: PropTypes.object
};

CompanyFollowedCard.defaultProps = {
  company: {}
}

function CompanyFollowedCard(props) {
  const {company} = props;

  return (
    <div className="company-followed-card">
      <Link to="#" className="company-followed-card__left">
        <div className="company-followed-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          {company.verify && <div className="company-followed-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="company-followed-card__left__avatar__check__icon" />
          </div>}
        </div>
        <div className="company-followed-card__left__info">
          <span className="company-followed-card__left__info__name">
            {company.company_name}
          </span>
          <div className="company-followed-card__left__info__location">
            <GrIcons.GrLocation
              className="company-followed-card__left__info__location__icon"
            />
            <span>{company.address}</span>
          </div>
          <div className="company-followed-card__left__info__company-industry-size">
            <div className="company-followed-card__left__info__company-industry-size__industry">
              <AiIcons.AiFillSetting className="company-followed-card__left__info__icon" />
              <span>{company.company_industry}</span>
            </div>
            <div className="company-followed-card__left__info__company-industry-size__size">
              <FaIcons.FaUserFriends className="company-followed-card__left__info__icon" />
              <span>{company.company_size}</span>
            </div>
          </div>
          <div className="company-followed-card__left__info__company-mail-phone">
            <div className="company-followed-card__left__info__company-mail-phone__mail">
              <AiIcons.AiTwotoneMail className="company-followed-card__left__info__icon" />
              <span>{company.contact_email}</span>
            </div>
            <div className="company-followed-card__left__info__company-mail-phone__phone">
              <MdIcons.MdPhone className="company-followed-card__left__info__icon" />
              <span>{company.phone_number}</span>
            </div>
          </div>
          <span className="company-followed-card__left__info__jobs-available">
            {company.jobs_available} {company.jobs_available > 1 ? "jobs" : "job"} available
          </span>
        </div>
      </Link>
      <div className="company-followed-card__right">
        <div className="company-followed-card__right__overlay overlay">
          <div className="company-followed-card__right__overlay__action action">
            <RiIcons.RiUserUnfollowLine
              className="company-followed-card__right__overlay__action__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyFollowedCard;