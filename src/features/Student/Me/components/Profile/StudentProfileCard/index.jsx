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
import { useSelector } from 'react-redux';
import studentApi from 'api/studentApi';

StudentProfileCard.propTypes = {

};

function StudentProfileCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.current);
  const [responseData, setResponseData] = useState({
    experiencesResponse: [],
    educationsResponse: [],
    skillsResponse: [],
    certificatesResponse: [],
    languagesResponse: [],
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

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="student-profile-card">
            <div className="student-profile-card__personal-info">
              <StudentPersonalInfoCard profile={user.s_profile} />
            </div>
            <div className="student-profile-card__overview">
              <StudentOverviewCard overView={user.s_profile.over_view} />
            </div>
            <div className="student-profile-card__experiences">
              <StudentExperiencesCard experiences={responseData.experiencesResponse} />
            </div>
            <div className="student-profile-card__educations">
              <StudentEducationsCard educations={responseData.educationsResponse} />
            </div>
            <div className="student-profile-card__skills">
              <StudentSkillsCard skills={responseData.skillsResponse}/>
            </div>
            <div className="student-profile-card__certificates">
              <StudentCertificatesCard certificates={responseData.certificatesResponse}/>
            </div>
            <div className="student-profile-card__languages">
              <StudentLanguagesCard languages={responseData.languagesResponse}/>
            </div>
          </div>
      }
    </>
  );
}

export default StudentProfileCard;