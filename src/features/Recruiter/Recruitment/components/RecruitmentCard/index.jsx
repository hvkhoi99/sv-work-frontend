import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import helper from 'utils/common';
import './RecruitmentCard.scss';

RecruitmentCard.propTypes = {
  recruitment: PropTypes.object,
  onViewJob: PropTypes.func,
};

RecruitmentCard.defaultProps = {
  recruitment: {},
  onViewJob: null
}

function RecruitmentCard(props) {
  const { onViewJob, recruitment } = props;

  const handleViewJob = (e) => {
    e.preventDefault();
    onViewJob();
  }

  const handleApply = (e) => {
    e.stopPropagation();
    console.log("apply")
  }

  return (
    <div className="recruitment-card" onClick={handleViewJob}>
      <div className="recruitment-card__top">
        <div className="recruitment-card__top__left">
          <div className="recruitment-card__top__left__img">
            <img src={
              Images.defaultAvatar
            } alt="company-avatar" />
          </div>
          <div className="recruitment-card__top__left__company-name">

            <span>{recruitment.value}</span>
          </div>
        </div>
        <div className="recruitment-card__top__right">
          <span>6 days ago</span>
          <AiIcons.AiOutlineHeart className="recruitment-card__top__right__icon" />
        </div>
      </div>
      <div className="recruitment-card__center">
        <span className="recruitment-card__center__title">
          Senior Developer - Full Time
        </span>
        <div className="recruitment-card__center__location">
          <MdIcons.MdLocationOn className="recruitment-card__center__location__icon" />
          <span>Hoa Vang, Da Nang</span>
        </div>
        <div className="recruitment-card__center__salary">
          <HiIcons.HiCurrencyDollar className="recruitment-card__center__salary__icon" />
          <span>1500 - 2000/month</span>
        </div>
        <div className="recruitment-card__center__applicants">
          Applicants: <span>10</span>
        </div>
        <div className="recruitment-card__center__hashtags">
          {helper.splitCommaString("abc,cde,  def  ")}
        </div>
      </div>
      <div className="recruitment-card__bottom">
        <button type="button" className="btn btn-success btn-sm" onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}

export default RecruitmentCard;