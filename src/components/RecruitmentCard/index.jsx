import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as GrIcons from 'react-icons/gr';
import helper from 'utils/common';
import './RecruitmentCard.scss';

RecruitmentCard.propTypes = {
  recruitments: PropTypes.array
};

RecruitmentCard.defaultProps = {
  recruitments: []
}

function RecruitmentCard(props) {
  return (
    <div className="recruitment-card">
      <div className="recruitment-card__top">
        <div className="recruitment-card__top__left">
          <div className="recruitment-card__top__left__img">
            <img src={Images.tw} alt="avatar" />
          </div>
          <div className="recruitment-card__top__left__company-name">

            <span>Twitter</span>
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
          <GrIcons.GrLocation className="recruitment-card__center__location__icon" />
          <span>Hoa Vang, Da Nang</span>
        </div>
        <div className="recruitment-card__center__salary">
          <BiIcons.BiDollar className="recruitment-card__center__salary__icon" />
          <span>1500 - 2000/month</span>
        </div>
        <div className="recruitment-card__center__applicants">
          Applicants: <span>10</span>
        </div>
        <div className="recruitment-card__center__hashtags">
          {helper.splitCommaString("abc,cde,  def  ")}
        </div>
      </div>
    </div>
  );
}

export default RecruitmentCard;