import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import AnotherCVCard from 'features/Recruiter/Candidate/components/AnotherCVCard';
import CertificatesCard from 'features/Recruiter/Candidate/components/CertificatesCard';
import EducationsCard from 'features/Recruiter/Candidate/components/EducationsCard';
import ExperiencesCard from 'features/Recruiter/Candidate/components/ExperiencesCard';
import LanguagesCard from 'features/Recruiter/Candidate/components/LanguagesCard';
import PersonalInfoCard from 'features/Recruiter/Candidate/components/PersonalInfoCard';
import SkillsCard from 'features/Recruiter/Candidate/components/SkillsCard';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as GoIcons from 'react-icons/go';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import helper from 'utils/common';
import './CandidateDetail.scss';

CandidateDetailPage.propTypes = {
  onApproveCandidate: PropTypes.func,
};

CandidateDetailPage.defaultProps = {
  onApproveCandidate: null,
}

function CandidateDetailPage(props) {
  const { onApproveCandidate, isClosed } = props;
  const { id } = useParams();
  console.log({id})
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const [candidate, setCandidate] = useState({});
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    helper.scrollToTop();
    const fetchCandidateProfile = async () => {
      try {
        const data = user.role_id === 2
          ? await recruiterApi.getCandidateProfile(id)
          : await studentApi.getCandidateProfile(id);
        setCandidate(data.data.data)
        setIsLoading(false);
      } catch (error) {
        console.log("Cannot fetch candidate's profile. " + error.message)
      }
    }

    fetchCandidateProfile();
  }, [user, id])

  const handleApprove = (type) => {
    switch (type) {
      case "approve":
        setApproveLoading(true);
        setTimeout(() => {
          setApproveLoading(false);
        }, 2000)
        break;
      case "reject":
        setRejectLoading(true);
        setTimeout(() => {
          setRejectLoading(false);
        }, 2000)
        break;
      default:
        break;
    }

    onApproveCandidate(candidate);
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="candidate-detail">
            <div className="candidate-detail__above">
              <div className="candidate-detail__above__img">
                <img src={
                  candidate.avatar_link === (null || "" || undefined)
                  ? Images.defaultAvatar
                  : candidate.avatar_link
                } alt="candidate-avatar" />
              </div>
              <span className="candidate-detail__above__candidate-name">
                {candidate.first_name} {candidate.last_name}
              </span>
              <span className="candidate-detail__above__candidate-job-title">
                {candidate.job_title}
              </span>
              {
                isClosed
                  ? <div className="candidate-detail__above__btn-group">
                    <button
                      type="button"
                      className="btn btn-success btn-sm mr-4"
                      disabled={approveLoading}
                      style={approveLoading ? { cursor: "default" } : { cursor: "pointer" }}
                      onClick={() => handleApprove("approve")}
                    >
                      {approveLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={rejectLoading}
                      style={rejectLoading ? { cursor: "default" } : { cursor: "pointer" }}
                      onClick={() => handleApprove("reject")}
                    >
                      {rejectLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Reject
                    </button>
                  </div>
                  : <div className="candidate-detail__above__btn-group">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      // disabled={approveLoading}
                      // style={approveLoading ? { cursor: "default" } : { cursor: "pointer" }}
                      // onClick={() => handleApprove("approve")}
                    >
                      {/* {approveLoading && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                      Invite
                    </button>
                  </div>
              }
              <div className="candidate-detail__above__overview">
                <div className="candidate-detail__above__overview__title">
                  <span>Overview</span>
                  <GoIcons.GoPrimitiveDot className="candidate-detail__above__overview__title__dot" />
                </div>
                <div className="candidate-detail__above__overview__description">
                  {ReactHtmlParser(candidate.over_view)}
                </div>
              </div>
            </div>
            <div className="candidate-detail__below">
              <div className="candidate-detail__below__left">
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
              <div className="candidate-detail__below__right">
                <ExperiencesCard experiences={candidate.experiences} />
                <EducationsCard educations={candidate.educations} />
                <CertificatesCard certificates={candidate.certificates} />
              </div>
            </div>
            <div className="candidate-detail__minions">
              <img src={Images.threeMinions} alt="minions" />
            </div>
          </div>
      }
    </>

  );
}

export default CandidateDetailPage;