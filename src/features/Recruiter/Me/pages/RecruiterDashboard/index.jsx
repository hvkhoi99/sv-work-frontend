import Images from 'constants/images';
import React, { useState } from 'react';
import * as HiIcons from 'react-icons/hi';
import * as BsIcons from 'react-icons/bs';
import './RecruiterDashboard.scss';
import DashboardSelectOption from '../../components/DashboardSelectOption';

RecruiterDashboardPage.propTypes = {

};

function RecruiterDashboardPage(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const options = [
    { id: 0, name: "Available Jobs" },
    { id: 1, name: "Closed Recruitments" }
  ]

  const onChangeIndex = (option) => {
    setCurrentIndex(option.id);
    console.log({option})
  }

  return (
    <div className="recruiter-dashboard">
      <div className="recruiter-dashboard__container">

        <div className="recruiter-dashboard__container__top">
          <div className="recruiter-dashboard__container__top__left">
            <div className="recruiter-dashboard__container__top__left__inforCard">
              <img src={Images.fb} alt="apple" />
              <div className="recruiter-dashboard__container__top__left__inforCard__description">
                <div className="recruiter-dashboard__container__top__left__inforCard__description__title">
                  <span>Apple Company</span>
                  <HiIcons.HiCheckCircle className="inforCard-icon" />
                </div>
                <span>Industry company</span>
              </div>
            </div>
          </div>
          <div className="recruiter-dashboard__container__top__right">
            <div className="recruiter-dashboard__container__top__right__card">
              <span className="recruiter-dashboard__container__top__right__card__count">10</span>
              <span className="recruiter-dashboard__container__top__right__card__type">Jobs Avalable</span>
            </div>
            <div className="recruiter-dashboard__container__top__right__card">
              <span className="recruiter-dashboard__container__top__right__card__count">123</span>
              <span className="recruiter-dashboard__container__top__right__card__type">Applicants</span>
            </div>
            <div className="recruiter-dashboard__container__top__right__card">
              <span className="recruiter-dashboard__container__top__right__card__count">1</span>
              <span className="recruiter-dashboard__container__top__right__card__type">Closed</span>
            </div>
            <div className="recruiter-dashboard__container__top__right__card">
              <div className="recruiter-dashboard__container__top__right__card__plus-icon">
                <BsIcons.BsFillPlusCircleFill className="plus-icon" />
              </div>
              <div className="recruiter-dashboard__container__top__right__card__create-span">
                <span>Create recruitment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="recruiter-dashboard__container__bottom">
          <div className="recruiter-dashboard__container__bottom__left">
            {options.map((option, index) => {
              const className = currentIndex === option.id ? "recruiter-dashboard__container__bottom__left__item visited-card" : "recruiter-dashboard__container__bottom__left__item";
              return <DashboardSelectOption
                option={option}
                key={option.id}
                className={className}
                onChangeIndex={onChangeIndex}
              />
            })}
          </div>
          <div className="recruiter-dashboard__container__bottom__right">

          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboardPage;