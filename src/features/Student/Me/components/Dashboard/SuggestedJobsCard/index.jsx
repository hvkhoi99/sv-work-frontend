import React from 'react';
// import PropTypes from 'prop-types';
import './SuggestedJobsCard.scss';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import Images from 'constants/images';

SuggestedJobsCard.propTypes = {

};

function SuggestedJobsCard(props) {
  return (
    <div className="suggested-jobs-card">
      <div className="suggested-jobs-card__date">
        <span>6 days ago</span>
        <BsIcons.BsHeart className="suggested-jobs-card__date__icon-heart" />
      </div>
      <div className="suggested-jobs-card__company-info">
        <div className="suggested-jobs-card__company-info__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="suggested-jobs-card__company-info__avatar__verify">
            <BsIcons.BsFillCheckCircleFill
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
          <div className="suggested-jobs-card__company-info__info__salary-location">
            <div className="suggested-jobs-card__company-info__info__salary-location__salary">
              <BiIcons.BiDollarCircle
                className="suggested-jobs-card__company-info__info__salary-location__salary__icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestedJobsCard;