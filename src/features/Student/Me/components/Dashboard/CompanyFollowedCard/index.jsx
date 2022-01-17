import Images from 'constants/images';
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as GrIcons from 'react-icons/gr';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CompanyFollowedCard.scss';

CompanyFollowedCard.propTypes = {

};

function CompanyFollowedCard(props) {
  return (
    <div className="company-followed-card">
      <Link to="#" className="company-followed-card__left">
        <div className="company-followed-card__left__avatar">
          <img src={Images.tw} alt="company-avatar" />
          <div className="company-followed-card__left__avatar__check">
            <HiIcons.HiCheckCircle className="company-followed-card__left__avatar__check__icon" />
          </div>
        </div>
        <div className="company-followed-card__left__info">
          <span className="company-followed-card__left__info__name">
            Twitter Tower
          </span>
          <div className="company-followed-card__left__info__location">
            <GrIcons.GrLocation
              className="company-followed-card__left__info__location__icon"
            />
            <span>Da Nang, Viet Nam</span>
          </div>
          <div className="company-followed-card__left__info__company-industry-size">
            <div className="company-followed-card__left__info__company-industry-size__industry">
              <AiIcons.AiFillSetting className="company-followed-card__left__info__icon" />
              <span>Outsourcing</span>
            </div>
            <div className="company-followed-card__left__info__company-industry-size__size">
              <FaIcons.FaUserFriends className="company-followed-card__left__info__icon" />
              <span>2000+</span>
            </div>
          </div>
          <div className="company-followed-card__left__info__company-mail-phone">
            <div className="company-followed-card__left__info__company-mail-phone__mail">
              <AiIcons.AiTwotoneMail className="company-followed-card__left__info__icon" />
              <span>twitter.tower1@gmail.com</span>
            </div>
            <div className="company-followed-card__left__info__company-mail-phone__phone">
              <MdIcons.MdPhone className="company-followed-card__left__info__icon" />
              <span>0702655787</span>
            </div>
          </div>
          <span className="company-followed-card__left__info__jobs-available">
            14 Jobs available
          </span>
        </div>
      </Link>
      <div className="company-followed-card__right">
        <div className="company-followed-card__right__overlay overlay">
          <div className="company-followed-card__right__overlay__action action">
            <RiIcons.RiUserUnfollowLine
              className="company-followed-card__right__overlay__action__icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyFollowedCard;