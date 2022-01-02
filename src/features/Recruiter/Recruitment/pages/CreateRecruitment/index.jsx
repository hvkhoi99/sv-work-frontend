import LoadingUI from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CreateRecruitmentForm from '../../components/CreateRecruitmentForm';
import './CreateRecruitment.scss';

CreateRecruitmentPage.propTypes = {
};

function CreateRecruitmentPage(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { update } = useParams();
  const historyRecruitment = history.location.state;
  const isEditMode = update === "update";
  const recruitment = !isEditMode ? {
    title: '',
    is_full_time: '',
    job_category: '',
    expiry_date: '',
    benefits: '',
    description: '',
    requirement: '',
    min_salary: '',
    max_salary: '',
    location: '',
    hashtags: ''
  } : {
    ...historyRecruitment,
    is_full_time: historyRecruitment.is_full_time ? "Full Time" : "Part Time",
  };

  useEffect(() => {
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
        isLoading
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