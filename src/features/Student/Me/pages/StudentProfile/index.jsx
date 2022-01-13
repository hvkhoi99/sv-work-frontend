import React, { useState } from 'react';
import './StudentProfile.scss';
import DashboardSelectOption from 'features/Recruiter/Me/components/DashboardSelectOption';
import Paths from 'constants/paths';
import Images from 'constants/images';
import { useHistory } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import { Switch } from '@material-ui/core';

StudentProfilePage.propTypes = {

};

function StudentProfilePage(props) {
  const profilePath = `${Paths.clientProfile}/info`;
  const resumePath = `${Paths.clientProfile}/resume`;
  const history = useHistory();
  const location = history.location.pathname;
  const [currentPath, setCurrentPath] = useState(location);

  const options = [
    { id: 0, name: "Profile", path: profilePath },
    { id: 1, name: "Resume", path: resumePath }
  ]

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  return (
    <div className="student-profile">
      <div className="student-profile__container">
        <div className="student-profile__container__left">
          <div className="student-profile__container__left__menu">
            {options.map((option, index) => {
              const className = currentPath === option.path
                ? "student-profile__container__left__menu__item student-profile-menu-visited"
                : "student-profile__container__left__menu__item";
              return <DashboardSelectOption
                option={option}
                key={index}
                className={className}
                onChangeIndex={onChangeIndex}
              />
            })}
          </div>
          <div className="student-profile__container__left__img">
            <img src={Images.student} alt="student" />
          </div>
        </div>
        <div className="student-profile__container__right">
          <div className="student-profile__container__right__base-info">
            <div className="student-profile__container__right__base-info__left">
              <div className="student-profile__container__right__base-info__left__avatar">
                <img src={Images.tw} alt="avatar" />
                <div className="student-profile__container__right__base-info__left__avatar__icon">
                  <MdIcons.MdChangeCircle className="change-icon" />
                </div>
              </div>
              <div className="student-profile__container__right__base-info__left__info">
                <span className="student-profile__container__right__base-info__left__info__name">
                  Ho Van Khoi
                </span>
                <span className="student-profile__container__right__base-info__left__info__career">
                  Senior full stack developer
                </span>
                <div className="student-profile__container__right__base-info__left__info__open-job">
                  <span>Open Job</span>
                  <Switch />
                </div>
              </div>
            </div>
            <div className="student-profile__container__right__base-info__right">
              <div className="student-profile__container__right__base-info__right__view-as">
                View as:&nbsp;
                <span>Yourself</span>
                <FaIcons.FaChevronDown
                  className="student-profile__container__right__base-info__right__view-as__icon-down"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;