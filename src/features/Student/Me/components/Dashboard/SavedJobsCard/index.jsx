import Images from 'constants/images';
import React from 'react';
import * as GiIcons from 'react-icons/gi';
// import PropTypes from 'prop-types';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom';
import helper from 'utils/common';
import './SavedJobsCard.scss';

SavedJobsCard.propTypes = {

};

function SavedJobsCard(props) {
  return (
    <div className="saved-jobs-card">
      <Link to="#" className="saved-jobs-card__left">
        <div className="saved-jobs-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="saved-jobs-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="saved-jobs-card__left__avatar__check__icon" />
          </div>
        </div>
        <div className="saved-jobs-card__left__info">
          <span className="saved-jobs-card__left__info__job-name">
            Intern Backend
          </span>
          <div className="saved-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="saved-jobs-card-info-icon" />
            <span>$1000 - $2500</span>
          </div>
          <div className="saved-jobs-card__left__info__company">
            <div className="saved-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="saved-jobs-card-info-icon" />
              <span>Twitter Tower</span>
            </div>
            <div className="saved-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="saved-jobs-card-info-icon" />
              <span>Da Nang, Viet Nam</span>
            </div>
          </div>
          <div className="saved-jobs-card__left__info__hashtags">
            {
              helper.splitCommaString(
                "Full Time, PHP, Developer",
                "saved-jobs-card__left__info__hashtags__item"
              )
            }
          </div>
          <div className="saved-jobs-card__left__info__status">
            <span>Status:</span>
            <span className="saved-jobs-card__left__info__status__name">
              Recruiting
            </span>
            <span className="saved-jobs-card__left__info__status__updated-at">
              {`(Updated at 15/01/2022)`}
            </span>
          </div>
        </div>
      </Link>
      <div className="saved-jobs-card__right">
        <div className="saved-jobs-card__right__overlay overlay">
          <div className="saved-jobs-card__right__overlay__action action">
            <GiIcons.GiShatteredHeart
              className="saved-jobs-card__right__overlay__action__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobsCard;