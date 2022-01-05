import Images from 'constants/images';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as GoIcons from 'react-icons/go';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import LinesEllipsis from 'react-lines-ellipsis';
// import PropTypes from 'prop-types';
import './Candidate.scss';

CandidatePage.propTypes = {

};

function CandidatePage(props) {
  return (
    <div className="candidate">
      <div className="candidate__above">
        <div className="candidate__above__img">
          <img src={Images.tw} alt="candidate-avatar" />
        </div>
        <span className="candidate__above__candidate-name">Candidate</span>
        <span className="candidate__above__candidate-job-title">UX/UI Designer</span>
        <div className="candidate__above__btn-group">
          <button className="btn btn-success btn-sm mr-4">Approve</button>
          <button className="btn btn-secondary btn-sm">Reject</button>
        </div>
        <div className="candidate__above__overview">
          <div className="candidate__above__overview__title">
            <span>Overview</span>
            <GoIcons.GoPrimitiveDot className="candidate__above__overview__title__dot" />
          </div>
          <div className="candidate__above__overview__description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Porro aspernatur nemo mollitia sint perspiciatis amet,
            excepturi suscipit provident possimus voluptate illum maxime velit alias recusandae.
            Explicabo maiores sapiente a quasi?
          </div>
        </div>
      </div>
      <div className="candidate__below">
        <div className="candidate__below__left">
          <div className="candidate__below__left__personal-info">
            <div className="candidate__below__left__personal-info__title">
              <span>Personal Information</span>
            </div>
            <div className="candidate__below__left__personal-info__content">
              <div className="candidate__below__left__personal-info__content__top">
                <div className="candidate__below__left__personal-info__content__top__date">
                  <BsIcons.BsCalendarDate
                    // className="candidate__below__left__personal-info__content__top__date__icon"
                    className="candidates-item-icon"
                  />
                  <span>03/10/1999</span>
                </div>
                <div className="candidate__below__left__personal-info__content__top__sex">
                  <FaIcons.FaUser
                    // className="candidate__below__left__personal-info__content__top__sex__icon"
                    className="candidates-item-icon"
                  />
                  <span>Male</span>
                </div>
              </div>
              <div className="candidate__below__left__personal-info__content__center">
                <div className="candidate__below__left__personal-info__content__center__phone">
                  <FaIcons.FaPhoneAlt
                    // className="candidate__below__left__personal-info__content__center__phone__icon"
                    className="candidates-item-icon"
                  />
                  <span>0702655787</span>
                </div>
                <div className="candidate__below__left__personal-info__content__center__contact-email">
                  <MdIcons.MdEmail
                    // className="candidate__below__left__personal-info__content__center__contact-email__icon"
                    className="candidates-item-icon"
                  />
                  <LinesEllipsis
                    text={
                      "hvkhoi.99@gmail.com"
                    }
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className="candidate__below__left__personal-info__content__center__contact-email__email"
                  />
                </div>
              </div>
              <div className="candidate__below__left__personal-info__content__bottom">
                <div className="candidate__below__left__personal-info__content__bottom__location">
                  <HiIcons.HiOutlineLocationMarker
                    // className="candidate__below__left__personal-info__content__bottom__location__icon"
                    className="candidates-item-icon"
                  />
                  <LinesEllipsis
                    text={
                      "Danang, Vietnam 123123"
                    }
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className="candidate__below__left__personal-info__content__bottom__location__name"
                  />
                </div>
                <div className="candidate__below__left__personal-info__content__bottom__nationality">
                  <FaIcons.FaPassport
                    // className="candidate__below__left__personal-info__content__bottom__nationality__icon"
                    className="candidates-item-icon"
                  />
                  <span>Vietnam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="candidate__below__right">
          <div className="candidate__below__right__experiences">
            <div className="candidate__below__right__experiences__title">
              <span>Experiences</span>
            </div>
            <div className="candidate__below__right__experiences__content">
              <div className="candidate__below__right__experiences__content__item">
                <div className="candidate__below__right__experiences__content__item__title">
                  <BsIcons.BsBuilding className="candidate__below__right__experiences__content" />
                  <span>DSI Company</span>
                </div>
                <div className="candidate__below__right__experiences__content__item__info">
                  <ul>
                    <li>6/2020 - 9/2020</li>
                    <li>Product Developer</li>
                    <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, nam.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;