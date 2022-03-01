import LoadingUI from 'components/Loading';
import Paths from 'constants/paths';
import RecruiterDashboardPage from 'features/Recruiter/Me/pages/RecruiterDashboard';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import CreateRecruitmentForm from '../../components/CreateRecruitmentForm';
import moment from 'moment';
import './CreateRecruitment.scss';
import helper from 'utils/common';

CreateRecruitmentPage.propTypes = {
};

function CreateRecruitmentPage(props) {
  const history = useHistory();
  const { historyRecruitment, isEditMode, isCreateMode } = history.location.state;
  // const isHistoryObject = typeof historyRecruitment === 'object' && historyRecruitment !== null;
  const [isLoading, setIsLoading] = useState(true);
  let recruitment = isCreateMode ? {
    title: '',
    is_full_time: '',
    job_category: '',
    position: '',
    expiry_date: '',
    benefits: '',
    description: '',
    requirement: '',
    min_salary: '',
    max_salary: '',
    location: '',
    hashtags: ''
  } : isEditMode ? {
    ...historyRecruitment,
    is_full_time: historyRecruitment.is_full_time ? "Full Time" : "Part Time",
    expiry_date: moment(new Date(historyRecruitment.expiry_date)).format("YYYY-MM-DD")
  } : {};

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)
    return () => {
      clearTimeout(timer);
    }
  }, [])


  return (
    <>
      {
        isEditMode !== true && isCreateMode !== true
          ? <Redirect to={`${Paths.recruiterDashboard}/available-jobs`} component={RecruiterDashboardPage} />
          : isLoading
            ? <div className="loading-ui">
              < LoadingUI />
            </div >
            : <div className="create-recruitment">
              <div className="create-recruitment__container">
                <CreateRecruitmentForm
                  recruitment={recruitment}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
      }
    </>
  );
}

export default CreateRecruitmentPage;