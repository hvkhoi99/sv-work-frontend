import Images from 'constants/images';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './InvitedJobsCard.scss';

InvitedJobsCard.propTypes = {
  job: PropTypes.object,
  onAcceptInvitedJob: PropTypes.func,
  onRejectInvitedJob: PropTypes.func,
  isAccepting: PropTypes.bool,
  isRejecting: PropTypes.bool
};

InvitedJobsCard.defaultProps = {
  job: {},
  onAcceptInvitedJob: null,
  onRejectInvitedJob: null,
  isAccepting: false,
  isRejecting: false
}

function InvitedJobsCard(props) {
  const { job, onAcceptInvitedJob, onRejectInvitedJob, isAccepting, isRejecting } = props;

  const handleAcceptInvitedJob = () => {
    onAcceptInvitedJob(job.id);
  }

  const handleRejectInvitedJob = () => {
    onRejectInvitedJob(job.id);
  }

  return (
    <div className="invited-jobs-card">
      <Link to={`/recruitment/${job.id}`} className="invited-jobs-card__left">
        <div className="invited-jobs-card__left__avatar">
          <img src={
            job.company_info.logo_image_link === (null || "" || undefined)
              ? Images.defaultAvatar
              : job.company_info.logo_image_link
          } alt="company-avatar" />
          {
            job.company_info.verify
              ? <div className="invited-jobs-card__left__avatar__check">
                <HiIcons.HiCheckCircle className="invited-jobs-card__left__avatar__check__icon" />
              </div>
              : ""
          }
        </div>
        <div className="invited-jobs-card__left__info">
          <span className="invited-jobs-card__left__info__job-name">
            {job.title}
          </span>
          <div className="invited-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="invited-jobs-card-info-icon" />
            <span>${job.min_salary} - ${job.max_salary}</span>
          </div>
          <div className="invited-jobs-card__left__info__company">
            <div className="invited-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="invited-jobs-card-info-icon" />
              <span>{job.company_info.company_name}</span>
            </div>
            <div className="invited-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="invited-jobs-card-info-icon" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="invited-jobs-card__left__info__hashtags">
            {
              // helper.splitCommaString(
              //   `${job.hashtags}`,
              //   "invited-jobs-card__left__info__hashtags__item"
              // )
              job.hashtags.map((hashtag, index) => {
                return <span
                  key={index}
                  className="invited-jobs-card__left__info__hashtags__item"
                >{hashtag.label}</span>
              })
            }
          </div>
          <div className="invited-jobs-card__left__info__status">
            <span>Status:</span>
            <span
              className={
                job.is_closed
                  ? "invited-jobs-card__left__info__status__name color-closed"
                  : "invited-jobs-card__left__info__status__name"
              }
            >
              {job.is_closed ? "Closed" : "Recruiting"}
            </span>
            <span className="invited-jobs-card__left__info__status__updated-at">
              {`(Updated at ${moment(job.updated_at).format("MM/DD/YYYY")})`}
            </span>
          </div>
        </div>
      </Link>
      <div
        className={
          `invited-jobs-card__right 
          ${job.status
            ? "accepted"
            : (job.status === false ? "not-accepted" : "waiting")
          }`
        }
      >
        <div className="invited-jobs-card__right__icon">
          {
            job.status
              ? <RiIcons.RiCheckboxCircleFill className="invited-jobs-card__right__icon__item" />
              : (
                job.status === false
                  ? <RiIcons.RiCloseCircleFill className="invited-jobs-card__right__icon__item" />
                  : <RiIcons.RiErrorWarningFill className="invited-jobs-card__right__icon__item" />
              )
          }
        </div>
        <div className="invited-jobs-card__right__overlay overlay">
          <div className="invited-jobs-card__right__overlay__action action">
            {
              job.status
                ? <span className="invited-jobs-card__right__overlay__action__accepted">
                  Accepted
                </span>
                : <>
                  {
                    isAccepting
                      ? <span
                        className="spinner-border spinner-border-lg 
                        invited-jobs-card__right__overlay__action__spinner"
                      />
                      : <MdIcons.MdCheckCircleOutline
                        className="invited-jobs-card__right__overlay__action__icon"
                        onClick={handleAcceptInvitedJob}
                      />
                  }
                  {
                    isRejecting
                      ? <span
                        className="spinner-border spinner-border-lg 
                        invited-jobs-card__right__overlay__action__spinner"
                      />
                      : <ImIcons.ImCancelCircle
                        className="invited-jobs-card__right__overlay__action__icon"
                        onClick={handleRejectInvitedJob}
                      />
                  }
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitedJobsCard;