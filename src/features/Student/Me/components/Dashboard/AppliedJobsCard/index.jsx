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

AppliedJobsCard.propTypes = {
  data: PropTypes.object
};

AppliedJobsCard.defaultProps = {
  data: {}
}

function AppliedJobsCard(props) {
  const { data } = props;

  return (
    <div className="applied-jobs-card">
      <Link to="#" className="applied-jobs-card__left">
        <div className="applied-jobs-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="applied-jobs-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="applied-jobs-card__left__avatar__check__icon" />
          </div>
        </div>
        <div className="applied-jobs-card__left__info">
          <span className="applied-jobs-card__left__info__job-name">
            Intern Backend
          </span>
          <div className="applied-jobs-card__left__info__salary">
            <HiIcons.HiCurrencyDollar className="applied-jobs-card-info-icon" />
            <span>$1000 - $2500</span>
          </div>
          <div className="applied-jobs-card__left__info__company">
            <div className="applied-jobs-card__left__info__company__name">
              <MdIcons.MdLocationCity className="applied-jobs-card-info-icon" />
              <span>Twitter Tower</span>
            </div>
            <div className="applied-jobs-card__left__info__company__location">
              <MdIcons.MdLocationOn className="applied-jobs-card-info-icon" />
              <span>Da Nang, Viet Nam</span>
            </div>
          </div>
          <div className="applied-jobs-card__left__info__hashtags">
            {
              helper.splitCommaString(
                "Full Time, PHP, Developer",
                "applied-jobs-card__left__info__hashtags__item"
              )
            }
          </div>
          <div className="applied-jobs-card__left__info__status">
            <span>Status:</span>
            <span className="applied-jobs-card__left__info__status__name">
              Recruiting
            </span>
            <span className="applied-jobs-card__left__info__status__updated-at">
              {`(Updated at 15/01/2022)`}
            </span>
          </div>
        </div>
      </Link>
      <div
        className={
          `applied-jobs-card__right ${data.status
            ? "applied-jobs-accepted"
            : (data.status === false ? "not-accepted" : "waiting")}`
        }
      >
        <div className="applied-jobs-card__right__icon">

          {
            data.status
              ? <RiIcons.RiCheckboxCircleFill className="applied-jobs-card__right__icon__item" />
              : (
                data.status === false
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