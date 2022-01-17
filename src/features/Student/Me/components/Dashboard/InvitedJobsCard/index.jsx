// import PropTypes from 'prop-types';
import Images from 'constants/images';
import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom';
import helper from 'utils/common';
import './InvitedJobsCard.scss';

InvitedJobsCard.propTypes = {

};

function InvitedJobsCard(props) {
  return (
    <div className="invited-jobs-card">
      <Link to="#" className="invited-jobs-card__left">
        <div className="invited-jobs-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="invited-jobs-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="invited-jobs-card__left__avatar__check__icon" />
          </div>
        </div>
        <div className="invited-jobs-card__left__info">
          <span className="invited-jobs-card__left__info__job-name">
            Intern Backend
          </span>
          <div className="invited-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="invited-jobs-card-info-icon" />
            <span>$1000 - $2500</span>
          </div>
          <div className="invited-jobs-card__left__info__company">
            <div className="invited-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="invited-jobs-card-info-icon" />
              <span>Twitter Tower</span>
            </div>
            <div className="invited-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="invited-jobs-card-info-icon" />
              <span>Da Nang, Viet Nam</span>
            </div>
          </div>
          <div className="invited-jobs-card__left__info__hashtags">
            {
              helper.splitCommaString(
                "Full Time, PHP, Developer",
                "invited-jobs-card__left__info__hashtags__item"
              )
            }
          </div>
          <div className="invited-jobs-card__left__info__status">
            <span>Status:</span>
            <span className="invited-jobs-card__left__info__status__name">
              Recruiting
            </span>
            <span className="invited-jobs-card__left__info__status__updated-at">
              {`(Updated at 15/01/2022)`}
            </span>
          </div>
        </div>
      </Link>
      <div className="invited-jobs-card__right accepted" >
        {/* <div className="invited-jobs-card__right__icon">
          <RiIcons.RiCheckboxCircleFill className="invited-jobs-card__right__icon__item" />
        </div> */}
        <div className="invited-jobs-card__right__overlay overlay">
          <div className="invited-jobs-card__right__overlay__action action">
            <ImIcons.ImCancelCircle
              className="invited-jobs-card__right__overlay__action__icon"
            />
            <MdIcons.MdCheckCircleOutline
              className="invited-jobs-card__right__overlay__action__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitedJobsCard;