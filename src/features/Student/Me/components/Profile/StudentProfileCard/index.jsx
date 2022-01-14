import React from 'react';
import StudentCertificatesCard from '../StudentCertificates';
import StudentEducationsCard from '../StudentEducations';
import StudentExperiencesCard from '../StudentExperiences';
import StudentLanguagesCard from '../StudentLanguages';
import StudentOverviewCard from '../StudentOverview';
import StudentPersonalInfoCard from '../StudentPersonalInfo';
import StudentSkillsCard from '../StudentSkills';
// import PropTypes from 'prop-types';
import './StudentProfileCard.scss';

StudentProfileCard.propTypes = {

};

function StudentProfileCard(props) {
  return (
    <div className="student-profile-card">
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
  );
}

export default StudentProfileCard;