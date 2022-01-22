import Images from 'constants/images';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom';
import './SavedJobsCard.scss';

SavedJobsCard.propTypes = {
  job: PropTypes.object,
  onUnSaveJob: PropTypes.func,
  isUnSaving: PropTypes.bool,
};

SavedJobsCard.defaultProps = {
  job: {},
  onUnSaveJob: null,
  isUnSaving: false
}

function SavedJobsCard(props) {
  const { job, onUnSaveJob, isUnSaving } = props;

  const handleUnSaveJob = () => {
    onUnSaveJob(job.id);
  }

  return (
    <div className="saved-jobs-card">
      <Link to={`/recruitment/${job.id}`} className="saved-jobs-card__left">
        <div className="saved-jobs-card__left__avatar">
          <img src={
            job.company_info.logo_image_link === (null || "" || undefined)
              ? Images.defaultAvatar
              : job.company_info.logo_image_link
          } alt="company-avatar" />
          {job.company_info.verify && <div className="saved-jobs-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="saved-jobs-card__left__avatar__check__icon" />
          </div>}
        </div>
        <div className="saved-jobs-card__left__info">
          <span className="saved-jobs-card__left__info__job-name">
            {job.title}
          </span>
          <div className="saved-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="saved-jobs-card-info-icon" />
            <span>${job.min_salary} - ${job.max_salary}</span>
          </div>
          <div className="saved-jobs-card__left__info__company">
            <div className="saved-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="saved-jobs-card-info-icon" />
              <span>{job.company_info.company_name}</span>
            </div>
            <div className="saved-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="saved-jobs-card-info-icon" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="saved-jobs-card__left__info__hashtags">
            {
              // helper.splitCommaString(
              //   `${job.hashtags}`,
              //   "saved-jobs-card__left__info__hashtags__item"
              // )
              job.hashtags.map((hashtag, index) => {
                return <span
                  key={index}
                  className="saved-jobs-card__left__info__hashtags__item"
                >{hashtag.label}</span>
              })
            }
          </div>
          <div className="saved-jobs-card__left__info__status">
            <span>Status:</span>
            <span
              className={
                job.is_closed
                  ? "saved-jobs-card__left__info__status__name color-closed"
                  : "saved-jobs-card__left__info__status__name"
              }
            >
              {job.is_closed ? "Closed" : "Recruiting"}
            </span>
            <span className="saved-jobs-card__left__info__status__updated-at">
              {`(Updated at ${moment(job.updated_at).format("MM/DD/YYYY")})`}
            </span>
          </div>
        </div>
      </Link>
      <div className="saved-jobs-card__right">
        <div className="saved-jobs-card__right__overlay overlay">
          <div className="saved-jobs-card__right__overlay__action action">
            {
              isUnSaving
                ? <span
                  className="spinner-border spinner-border-lg 
                  saved-jobs-card__right__overlay__action__spinner"
                />
                : <GiIcons.GiShatteredHeart
                  className="saved-jobs-card__right__overlay__action__icon"
                  onClick={handleUnSaveJob}
                />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobsCard;