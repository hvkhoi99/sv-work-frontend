import Images from 'constants/images';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './AppliedJobsCard.scss';

AppliedJobsCard.propTypes = {
  job: PropTypes.object,
  onUnApplyJob: PropTypes.func,
  isCancelling: PropTypes.bool,
};

AppliedJobsCard.defaultProps = {
  job: {},
  onUnApplyJob: null,
  isCancelling: false
}

function AppliedJobsCard(props) {
  const { job, onUnApplyJob, isCancelling } = props;

  const handleUnApplyJob = () => {
    onUnApplyJob(job.id);
  }

  return (
    <div className="applied-jobs-card">
      <Link to={`/recruitment/${job.id}`} className="applied-jobs-card__left">
        <div className="applied-jobs-card__left__avatar">
          <img src={
            job.company_info.logo_image_link === (null || "" || undefined)
              ? Images.defaultAvatar
              : job.company_info.logo_image_link
          } alt="company-avatar" />
          {
            job.company_info.verify
              ? <div className="applied-jobs-card__left__avatar__check">
                <HiIcons.HiCheckCircle className="applied-jobs-card__left__avatar__check__icon" />
              </div>
              : ""
          }
        </div>
        <div className="applied-jobs-card__left__info">
          <span className="applied-jobs-card__left__info__job-name">
            {job.title}
          </span>
          <div className="applied-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="applied-jobs-card-info-icon" />
            <span>${job.min_salary} - ${job.max_salary}</span>
          </div>
          <div className="applied-jobs-card__left__info__company">
            <div className="applied-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="applied-jobs-card-info-icon" />
              <span>{job.company_info.company_name}</span>
            </div>
            <div className="applied-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="applied-jobs-card-info-icon" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="applied-jobs-card__left__info__hashtags">
            {
              // helper.splitCommaString(
              //   `${job.hashtags}`,
              //   "applied-jobs-card__left__info__hashtags__item"
              // )
              job.hashtags.map((hashtag, index) => {
                return <span
                  key={index}
                  className="applied-jobs-card__left__info__hashtags__item"
                >{hashtag.label}</span>
              })
            }
          </div>
          <div className="applied-jobs-card__left__info__status">
            <span>Status:</span>
            <span
              className={
                job.is_closed
                  ? "applied-jobs-card__left__info__status__name color-closed"
                  : "applied-jobs-card__left__info__status__name"
              }
            >
              {job.is_closed ? "Closed" : "Recruiting"}
            </span>
            <span className="applied-jobs-card__left__info__status__updated-at">
              {`(Updated at ${moment(job.updated_at).format("MM/DD/YYYY")})`}
            </span>
          </div>
        </div>
      </Link>
      <div
        className={
          `applied-jobs-card__right ${job.status
            ? "accepted"
            : (job.status === false ? "not-accepted" : "waiting")}`
        }
      >
        <div className="applied-jobs-card__right__icon">

          {
            job.status
              ? <RiIcons.RiCheckboxCircleFill className="applied-jobs-card__right__icon__item" />
              : (
                job.status === false
                  ? <RiIcons.RiCloseCircleFill className="applied-jobs-card__right__icon__item" />
                  : <RiIcons.RiErrorWarningFill className="applied-jobs-card__right__icon__item" />
              )
          }
        </div>
        <div className="applied-jobs-card__right__overlay overlay">
          <div className="applied-jobs-card__right__overlay__action action">
            {
              job.status
                ? <span className="applied-jobs-card__right__overlay__action__approved">Approved</span>
                : <Button
                  type="button"
                  outline size="sm" color="danger"
                  onClick={handleUnApplyJob}
                  disabled={isCancelling}
                  style={isCancelling ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {isCancelling && <span className="spinner-border spinner-border-sm mr-2" />}
                  Cancel
                </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobsCard;