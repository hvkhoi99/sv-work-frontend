import React, { useEffect, useState } from 'react';
import StudentCertificatesCard from '../StudentCertificates';
import StudentEducationsCard from '../StudentEducations';
import StudentExperiencesCard from '../StudentExperiences';
import StudentLanguagesCard from '../StudentLanguages';
import StudentOverviewCard from '../StudentOverview';
import StudentPersonalInfoCard from '../StudentPersonalInfo';
import StudentSkillsCard from '../StudentSkills';
// import PropTypes from 'prop-types';
import './StudentProfileCard.scss';
import LoadingChildUI from 'components/LoadingChild';
import { useDispatch, useSelector } from 'react-redux';
import studentApi from 'api/studentApi';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { updateUser } from 'features/Auth/userSlice';

StudentProfileCard.propTypes = {

};

function StudentProfileCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [responseData, setResponseData] = useState({
    experiencesResponse: [],
    educationsResponse: [],
    skillsResponse: [],
    certificatesResponse: [],
    languagesResponse: [],
  });
  const [typeUpdating, setTypeUpdating] = useState({
    isOverviewUpdating: false
  });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const params = {
          page: 1,
          _limit: 3
        }

        const experiencesResponse = await studentApi.getStudentExperiences(params);
        const educationsResponse = await studentApi.getStudentEducations(params);
        const skillsResponse = await studentApi.getStudentSkills();
        const certificatesResponse = await studentApi.getStudentCertificates(params);
        const languagesResponse = await studentApi.getStudentLanguages();

        if (
          experiencesResponse.data.status === 1 &&
          educationsResponse.data.status === 1 &&
          skillsResponse.data.status === 1 &&
          certificatesResponse.data.status === 1 &&
          languagesResponse.data.status === 1
        ) {
          setResponseData(state => ({
            experiencesResponse: experiencesResponse.data.data.data,
            educationsResponse: educationsResponse.data.data.data,
            skillsResponse: skillsResponse.data.data,
            certificatesResponse: certificatesResponse.data.data.data,
            languagesResponse: languagesResponse.data.data
          }));
          setIsLoading(false);
        } else {
          console.log("Cannot fetch responseData.");
        }
      } catch (error) {
        console.log("Cannot fetch responseData. Error: " + error.message);
      }
    };

    fetchStudentProfile();
  }, []);

  const onEditStudentProfile = async (values) => {
    try {
      const params = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        date_of_birth: moment(new Date(values.date_of_birth)).format("MM/DD/YYYY"),
        phone_number: values.phone_number,
        address: values.address,
        nationality: values.nationality,
        gender: (values.gender || "Male") ? true : false,
        job_title: values.job_title,
      };
      console.log({ params });

      const data = await studentApi.updateStudentProfile(values.user_id, params);
      if (data.data.status === 1) {
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));
        enqueueSnackbar("Your Personal Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const updateStudentOverview = async (values) => {
    setTypeUpdating(state => ({
      ...state,
      isOverviewUpdating: true
    }));
    try {
      const params = {
        over_view: values
      };

      const data = await studentApi.updateStudentOverview(params.user_id, params);
      if (data.data.status === 1) {
        enqueueSnackbar("Your profile has been updated.", { variant: "success" });
        const cpUser = {
          ...user,
          s_profile: {
            ...user.s_profile,
            over_view: values
          }
        }
        dispatch(updateUser(cpUser));
        localStorage.setItem('user', JSON.stringify(cpUser));
        setTypeUpdating(state => ({
          ...state,
          isOverviewUpdating: false
        }));
        return true;
      } else {
        setTypeUpdating(state => ({
          ...state,
          isOverviewUpdating: false
        }));
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      setTypeUpdating(state => ({
        ...state,
        isOverviewUpdating: false
      }));
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditExperience = (values) => {
    console.log({ values });
  }

  const onEditSkills = (values) => {
    console.log({ values });
  }

  const onEditCertificate = (values) => {
    console.log({ values });
  }

  const onEditLanguages = (values) => {
    console.log({ values });
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="student-profile-card">
            <div className="student-profile-card__personal-info">
              <StudentPersonalInfoCard
                profile={user.s_profile}
                onEditStudentProfile={onEditStudentProfile}
              />
            </div>
            <div className="student-profile-card__overview">
              <StudentOverviewCard
                overView={user.s_profile.over_view}
                updateStudentOverview={updateStudentOverview}
                isOverviewUpdating={typeUpdating.isOverviewUpdating}
              />
            </div>
            <div className="student-profile-card__experiences">
              <StudentExperiencesCard
                experiences={responseData.experiencesResponse}
                onEditExperience={onEditExperience}
              />
            </div>
            <div className="student-profile-card__educations">
              <StudentEducationsCard educations={responseData.educationsResponse} />
            </div>
            <div className="student-profile-card__skills">
              <StudentSkillsCard
                skills={responseData.skillsResponse}
                onEditSkills={onEditSkills}
              />
            </div>
            <div className="student-profile-card__certificates">
              <StudentCertificatesCard
                certificates={responseData.certificatesResponse}
                onEditCertificate={onEditCertificate}
              />
            </div>
            <div className="student-profile-card__languages">
              <StudentLanguagesCard
                languages={responseData.languagesResponse}
                onEditLanguages={onEditLanguages}
              />
            </div>
          </div>
      }
    </>
  );
}

export default StudentProfileCard;