import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import React, { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import helper from 'utils/common';
import AppliedJobsPageCard from '../../components/Dashboard/AppliedJobsPageCard';
import CompanyFollowedPageCard from '../../components/Dashboard/CompanyFollowedPageCard';
import InvitedJobsPageCard from '../../components/Dashboard/InvitedJobsPageCard';
import SavedJobsPageCard from '../../components/Dashboard/SavedJobsPageCard';
import StudentPaginatorView from '../../components/Dashboard/StudentPaginatorView';
import SuggestedJobsCard from '../../components/Dashboard/SuggestedJobsCard';
import './StudentDashboard.scss';

StudentDashboardPage.propTypes = {

};

function StudentDashboardPage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    {
      id: 0,
      name: "Applied Jobs",
      path: `${Paths.clientDashboard}/applied-jobs`,
      icon: <RiIcons.RiCheckDoubleLine className="student-paginator-view-menu-icon" />,
      pageCard: <AppliedJobsPageCard />
    },
    {
      id: 1,
      name: "Followed Companies",
      path: `${Paths.clientDashboard}/followed-companies`,
      icon: <RiIcons.RiUserFollowLine className="student-paginator-view-menu-icon" />,
      pageCard: <CompanyFollowedPageCard />
    },
    {
      id: 2,
      name: "Saved Jobs",
      path: `${Paths.clientDashboard}/saved-jobs`,
      icon: <AiIcons.AiOutlineHeart className="student-paginator-view-menu-icon" />,
      pageCard: <SavedJobsPageCard />
    },
    {
      id: 3,
      name: "Invited Jobs",
      path: `${Paths.clientDashboard}/invited-jobs`,
      icon: <RiIcons.RiMailDownloadLine className="student-paginator-view-menu-icon" />,
      pageCard: <InvitedJobsPageCard />
    },
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

  const handleEditProfile = () => {
    history.push(`${Paths.clientProfile}`)
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="student-dashboard">
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
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleEditProfile}
                  >
                    <AiIcons.AiOutlineEdit className="student-profile-edit-icon" />
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="student-dashboard__container__main">
                <div className="student-dashboard__container__main__left">
                  <div className="student-dashboard__container__main__left__header">
                    <MdIcons.MdOutlineRecommend className="student-dashboard__container__main__left__header__icon" />
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
                <div className="student-dashboard__container__main__right">
                  <StudentPaginatorView
                    menuItems={menuItems}
                  />
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default StudentDashboardPage;