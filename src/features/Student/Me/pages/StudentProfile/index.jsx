import { Switch } from '@material-ui/core';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import DashboardSelectOption from 'features/Recruiter/Me/components/DashboardSelectOption';
import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import helper from 'utils/common';
import StudentProfileCard from '../../components/Profile/StudentProfileCard';
import StudentResumeCard from '../../components/Profile/StudentResumeCard';
import './StudentProfile.scss';

StudentProfilePage.propTypes = {

};

function StudentProfilePage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = history.location.pathname;
  const [currentPath, setCurrentPath] = useState(location);
  const profilePath = `${Paths.clientProfile}/info`;
  const resumePath = `${Paths.clientProfile}/resume`;
  const user = useSelector((state) => state.user.current);
  const [checked, setChecked] = useState(user.s_profile.open_for_job);

  const options = [
    { id: 0, name: "Profile", path: profilePath },
    { id: 1, name: "Resume", path: resumePath }
  ]

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  const onOpenJob = (e) => {
    setChecked(e.target.checked);
  }

  console.log({ checked })

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="student-profile">
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
                        {user.s_profile.first_name} {user.s_profile.last_name}
                      </span>
                      <span className="student-profile__container__right__base-info__left__info__career">
                        {user.s_profile.job_title}
                      </span>
                      <div className="student-profile__container__right__base-info__left__info__open-job">
                        <span>Open Job</span>
                        <Switch
                          checked={checked}
                          onChange={(e) => onOpenJob(e)}
                        />
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
                <div className="student-profile__container__right__more-info">
                  {currentPath === profilePath
                    ? <StudentProfileCard />
                    : currentPath === resumePath
                      ? <StudentResumeCard />
                      : <></>}

                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default StudentProfilePage;