import PropTypes from 'prop-types';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import helper from 'utils/common';
import './RecruitmentCard.scss';

RecruitmentCard.propTypes = {
  recruitment: PropTypes.object,
  applyText: PropTypes.string,
  onViewJob: PropTypes.func,
  onApplyJob: PropTypes.func,
};

RecruitmentCard.defaultProps = {
  recruitment: {},
  applyText: 'Apply',
  onViewJob: null,
  onApplyJob: null,
}

function RecruitmentCard(props) {
  const { onViewJob, recruitment } = props;
  // const [isApplying, setIsApplying] = useState(false);

  const handleViewJob = (e) => {
    e.preventDefault();
    onViewJob(recruitment.id);
  }

  // const handleApply = (e) => {
  //   e.stopPropagation();
  //   setIsApplying(!isApplying);
  //   onApplyJob(recruitment.id);
  // }

  // const renderDisabledStatusForApplyButton = (application) => {
  //   if (application.state === null) {
  //     if (application.is_invited) {
  //       return true;
  //     } else {
  //       if (application.is_applied) {
  //         return false;
  //       } else {
  //         return false;
  //       }
  //     }
  //   } else {
  //     return true;
  //   }
  // }

  console.log({recruitment})

  return (
    <div className="recruitment-card" onClick={handleViewJob}>
      <div className="recruitment-card__top">
        <div className="recruitment-card__top__left">
          <div className="recruitment-card__top__left__img">
            <img src={
              // recruitment.company_info.logo_image_link === (null || "" || undefined)
              // ? Images.defaultCompany
              // : 
              recruitment.company_info.logo_image_link
            } alt="company-avatar" />
          </div>
          <div className="recruitment-card__top__left__company-name">
            <span>{recruitment.company_info.company_name}</span>
          </div>
        </div>
        <div className="recruitment-card__top__right">
          <span><ReactTimeAgo date={Date.parse(recruitment.created_at)} locale="en-US" /></span>
          {
            recruitment.application.is_saved
              ? <AiIcons.AiFillHeart
                className="recruitment-card__top__right__icon"
              />
              : <AiIcons.AiOutlineHeart
                className="recruitment-card__top__right__icon"
              />
          }
        </div>
      </div>
      <div className="recruitment-card__center">
        <span className="recruitment-card__center__title">
          {helper.capitalize(recruitment.title)}
        </span>
        <div className="recruitment-card__center__location">
          <MdIcons.MdLocationOn className="recruitment-card__center__location__icon" />
          <span>{recruitment.location}</span>
        </div>
        <div className="recruitment-card__center__salary">
          <HiIcons.HiCurrencyDollar className="recruitment-card__center__salary__icon" />
          <span>{recruitment.min_salary} - {recruitment.max_salary}/month</span>
        </div>
        <div className="recruitment-card__center__applicants">
          Applicants: <span>{recruitment.count_applications}</span>
        </div>
        <div className="recruitment-card__center__status">
          Status: <span style={recruitment.is_closed ? { color: 'red' } : { color: 'var(--success)' }}>{recruitment.is_closed ? "Closed" : "Recruiting"}</span>
        </div>
        <div className="recruitment-card__center__hashtags">
          {
            recruitment.hashtags.map((hashtag, index) => {
              return <span
                key={index}
              >
                {hashtag.label}
              </span>
            })
          }
        </div>
      </div>
      {/* <div className="recruitment-card__bottom">
        <button
          type="button"
          className="btn btn-success btn-sm"
          style={
            (renderDisabledStatusForApplyButton(recruitment.application) || recruitment.is_closed)
              ? { cursor: "default" } : { cursor: "pointer" }
          }
          disabled={renderDisabledStatusForApplyButton(recruitment.application) || recruitment.is_closed}
          onClick={handleApply}
        >
          {isApplying && <span className="spinner-border spinner-border-sm mr-1" />}
          {applyText}
        </button>
      </div> */}
    </div>
  );
}

export default RecruitmentCard;