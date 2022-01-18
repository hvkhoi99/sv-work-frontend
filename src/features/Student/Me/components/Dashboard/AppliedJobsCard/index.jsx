import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import helper from 'utils/common';
import './AppliedJobsCard.scss';
import moment from 'moment';

AppliedJobsCard.propTypes = {
  job: PropTypes.object,
};

AppliedJobsCard.defaultProps = {
  job: {},
}

function AppliedJobsCard(props) {
  const { job } = props;

  return (
    <div className="applied-jobs-card">
      <Link to={`/recruitment/${job.id}`} className="applied-jobs-card__left">
        <div className="applied-jobs-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          {
            job.company_info.verify && <div className="applied-jobs-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="applied-jobs-card__left__avatar__check__icon" />
          </div>
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
              helper.splitCommaString(
                `${job.job_category}`,
                "applied-jobs-card__left__info__hashtags__item"
              )
            }
          </div>
          <div className="applied-jobs-card__left__info__status">
            <span>Status:</span>
            <span className="applied-jobs-card__left__info__status__name">
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
            ? "applied-jobs-accepted"
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
        <div className="applied-jobs-card__right__overlay">
          <div className="applied-jobs-card__right__overlay__action">
            <Button outline size="sm" color="danger">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobsCard;