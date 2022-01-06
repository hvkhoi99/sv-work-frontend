import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as GoIcons from 'react-icons/go';
import helper from 'utils/common';
import AnotherCVCard from '../../components/AnotherCVCard';
import CertificatesCard from '../../components/CertificatesCard';
import EducationsCard from '../../components/EducationsCard';
import ExperiencesCard from '../../components/ExperiencesCard';
import LanguagesCard from '../../components/LanguagesCard';
import PersonalInfoCard from '../../components/PersonalInfoCard';
import SkillsCard from '../../components/SkillsCard';
import './Candidate.scss';

CandidatePage.propTypes = {
  candidateId: PropTypes.number,
};

CandidatePage.defaultProps = {
  candidateId: 0
}

function CandidatePage(props) {
  const { candidateId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [candidate, setCandidate] = useState({});
  // const {candidateId} = useParams();

  useEffect(() => {
    helper.scrollToTop(350);
    const fetchCandidateProfile = async () => {
      try {
        const data = await studentApi.getCandidateProfile(candidateId);
        console.log(data.data.data)
        setCandidate(data.data.data)
        setIsLoading(false);

      } catch (error) {
        console.log("Cannot fetch candidate's profile. " + error.message)
      }
    }

    fetchCandidateProfile();
  }, [candidateId])

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="candidate">
            <div className="candidate__above">
              <div className="candidate__above__img">
                <img src={Images.tw} alt="candidate-avatar" />
              </div>
              <span className="candidate__above__candidate-name">
                {candidate.first_name} {candidate.last_name}
              </span>
              <span className="candidate__above__candidate-job-title">
                {candidate.job_title}
              </span>
              <div className="candidate__above__btn-group">
                <button className="btn btn-success btn-sm mr-4">Approve</button>
                <button className="btn btn-secondary btn-sm">Reject</button>
              </div>
              <div className="candidate__above__overview">
                <div className="candidate__above__overview__title">
                  <span>Overview</span>
                  <GoIcons.GoPrimitiveDot className="candidate__above__overview__title__dot" />
                </div>
                <div className="candidate__above__overview__description">
                  {ReactHtmlParser(candidate.over_view)}
                </div>
              </div>
            </div>
            <div className="candidate__below">
              <div className="candidate__below__left">
                <PersonalInfoCard
                  personalInfo={{
                    date_of_birth: candidate.date_of_birth,
                    gender: candidate.gender,
                    email: candidate.email,
                    phone_number: candidate.phone_number,
                    address: candidate.address,
                    nationality: candidate.nationality
                  }}
                />
                <SkillsCard skills={candidate.skills} />
                <LanguagesCard languages={candidate.languages} />
                <AnotherCVCard />
              </div>
              <div className="candidate__below__right">
                <ExperiencesCard experiences={candidate.experiences} />
                <EducationsCard educations={candidate.educations} />
                <CertificatesCard certificates={candidate.certificates} />
              </div>
            </div>
          </div>
      }
    </>

  );
}

export default CandidatePage;