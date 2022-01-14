import Images from 'constants/images';
import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
// import PropTypes from 'prop-types';
import './SuggestedJobsCard.scss';

SuggestedJobsCard.propTypes = {

};

function SuggestedJobsCard(props) {
  return (
    <div className="suggested-jobs-card">
      <div className="suggested-jobs-card__date">
        <span>6 days ago</span>
        <RiIcons.RiHeart3Line className="suggested-jobs-card__date__icon-heart" />
      </div>
      <div className="suggested-jobs-card__company-info">
        <div className="suggested-jobs-card__company-info__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="suggested-jobs-card__company-info__avatar__verify">
            <FaIcons.FaCheckCircle
              className="suggested-jobs-card__company-info__avatar__verify__icon"
            />
          </div>
        </div>
        <div className="suggested-jobs-card__company-info__info">
          <span className="suggested-jobs-card__company-info__info__job-name">
            Senior Developer - Full Time
          </span>
          <div className="suggested-jobs-card__company-info__info__company-name-size">
            <span className="suggested-jobs-card__company-info__info__company-name-size__name">
              Twitter Tower
            </span>
            <div className="suggested-jobs-card__company-info__info__company-name-size__size">
              <FaIcons.FaUserFriends
                className="suggested-jobs-card__company-info__info__company-name-size__size__icon"
              />
              <span>1000</span>
            </div>
          </div>
        </div>
      </div>
      <div className="suggested-jobs-card__salary-location">
        <div className="suggested-jobs-card__salary-location__salary">
          <BiIcons.BiDollarCircle
            className="suggested-jobs-card__salary-location__salary__icon"
          />
          <span>$1000 - $2000</span>
        </div>
        <div className="suggested-jobs-card__salary-location__location">
          <MdIcons.MdLocationOn
            className="suggested-jobs-card__salary-location__location__icon"
          />
          <span>Da Nang, Viet Nam</span>
        </div>
        <div className="suggested-jobs-card__btn-apply">
          <button className="btn btn-success btn-sm">Apply</button>
        </div>
      </div>
    </div>
  );
}

export default SuggestedJobsCard;