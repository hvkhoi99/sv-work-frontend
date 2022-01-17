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

StudentProfileCard.propTypes = {

};

function StudentProfileCard(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
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
              <StudentPersonalInfoCard />
            </div>
            <div className="student-profile-card__overview">
              <StudentOverviewCard />
            </div>
            <div className="student-profile-card__experiences">
              <StudentExperiencesCard />
            </div>
            <div className="student-profile-card__educations">
              <StudentEducationsCard />
            </div>
            <div className="student-profile-card__skills">
              <StudentSkillsCard />
            </div>
            <div className="student-profile-card__certificates">
              <StudentCertificatesCard />
            </div>
            <div className="student-profile-card__languages">
              <StudentLanguagesCard />
            </div>
          </div>
      }
    </>
  );
}

export default StudentProfileCard;