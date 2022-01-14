import Images from 'constants/images';
import React from 'react';
import { useSelector } from 'react-redux';
import './StudentDashboard.scss';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import SuggestedJobsCard from '../../components/Dashboard/SuggestedJobsCard';

StudentDashboardPage.propTypes = {

};

function StudentDashboardPage(props) {
  const user = useSelector((state) => state.user.current);

  return (
    <div className="student-dashboard">
      <div className="student-dashboard__container">
        <div className="student-dashboard__container__base-info">
          <div className="student-dashboard__container__base-info__avatar">
            <img src={Images.tw} alt="avatar" />
          </div>
          <span className="student-dashboard__container__base-info__name">
            {user.s_profile.first_name + " " + user.s_profile.last_name}
          </span>
          <span className="student-dashboard__container__base-info__job-title">
            {user.s_profile.job_title}
          </span>
          <div className="student-dashboard__container__base-info__btn-edit">
            <button type="butotn" className="btn btn-success btn-sm">
              <AiIcons.AiOutlineEdit className="student-profile-edit-icon" />
              Edit Profile
            </button>
          </div>
        </div>
        <div className="student-dashboard__container__main">
          <div className="student-dashboard__container__main__left">
            <div className="student-dashboard__container__main__left__header">
              <MdIcons.MdOutlineRecommend className="student-dashboard__container__main__left__header__icon"/>
              <span>Suggested Jobs</span>
            </div>
            <div className="student-dashboard__container__main__left__main">
              <div className="student-dashboard__container__main__left__main__item">
                <SuggestedJobsCard />
              </div>
              <div className="student-dashboard__container__main__left__main__item">
                <SuggestedJobsCard />
              </div>
              <div className="student-dashboard__container__main__left__main__item">
                <SuggestedJobsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;