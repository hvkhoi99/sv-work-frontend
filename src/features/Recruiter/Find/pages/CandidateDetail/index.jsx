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
import moment from 'moment';
// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as GoIcons from 'react-icons/go';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import helper from 'utils/common';
import PopupInviteCandidate from '../../components/PopupInviteCandidate';
import './CandidateDetail.scss';
import { useSnackbar } from 'notistack';

CandidateDetailPage.propTypes = {
};

CandidateDetailPage.defaultProps = {
}

function CandidateDetailPage(props) {
  const { id } = useParams();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const [candidate, setCandidate] = useState({
    applied_jobs: [],
    invited_jobs: []
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    helper.scrollToTop();
    const fetchCandidateProfile = async () => {
      try {
        const data = user.role_id === 2
          ? await recruiterApi.getCandidateProfile(id)
          : await studentApi.getCandidateProfile(id);
        if (data.data.status === 1) {
          setCandidate(data.data.data);
          setIsLoading(false);
        } else {
          console.log("Cannot fetch candidate's profile.");
        }
      } catch (error) {
        console.log("Cannot fetch candidate's profile. " + error.message)
      }
    }

    fetchCandidateProfile();
  }, [user, id])

  // const handleApprove = (type) => {
  //   switch (type) {
  //     case "approve":
  //       setApproveLoading(true);
  //       setTimeout(() => {
  //         setApproveLoading(false);
  //       }, 2000)
  //       break;
  //     case "reject":
  //       setRejectLoading(true);
  //       setTimeout(() => {
  //         setRejectLoading(false);
  //       }, 2000)
  //       break;
  //     default:
  //       break;
  //   }

  //   onApproveCandidate(candidate);
  // }

  const onInvite = async (values) => {
    console.log(values);
    try {
      const action = user.role_id === 2
        ? await recruiterApi.inviteCandidate(id, values.id)
        : await studentApi.inviteCandidate(id, values.id);
      console.log({ action });
      const newInvitedJobs = candidate.invited_jobs;
      const index = newInvitedJobs.findIndex(x => x.id === values.id);
      if (action.data.status === 1) {
        if (index > -1) {
          newInvitedJobs.splice(index, 1);
          setCandidate(state => ({
            ...state,
            invited_jobs: newInvitedJobs
          }));
        } else {
          newInvitedJobs.splice(0, 0, action.data.data);
          setCandidate(state => ({
            ...state,
            invited_jobs: newInvitedJobs
          }));
        }
        enqueueSnackbar(action.data.message, { variant: "success" });
        return true;
      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
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

              <div className="candidate-detail__above__btn-group">
                <PopupInviteCandidate
                  onInvite={onInvite}
                />
              </div>
              {
                candidate.applied_jobs.length > 0 &&
                <>
                  <span style={{
                    margin: '1.5rem 0 .5rem 0',
                    textAlign: 'right',
                    width: '100%',
                    color: 'var(--success)',
                    fontWeight: '500'
                  }}>This student has applied in your job postings:</span>
                  {
                    candidate.applied_jobs.map((job, index) => {
                      return <div
                        className="candidate-detail__above__applied-recruitment"
                        key={index}
                      >
                        {
                          // (job.is_closed || (job.application.state !== null)) &&
                          <div className="candidate-detail__above__applied-recruitment__status">
                            <span
                              className={
                                (job.is_closed || (job.application.state !== null))
                                  ? "candidate-detail__above__applied-recruitment__status__title recruitment-was-closed"
                                  : "candidate-detail__above__applied-recruitment__status__title"
                              }
                            >
                              {index + 1}. {job.title}
                            </span>
                            <span
                              className="candidate-detail__above__applied-recruitment__status__is-closed"
                              style={job.is_closed ? { color: "red" } : { color: "var(--success)" }}
                            >
                              {job.is_closed ? "Closed" : "Recruiting"}
                            </span>
                            <div className="candidate-detail__above__applied-recruitment__status__dot" />
                            <span
                              className="candidate-detail__above__applied-recruitment__status__is-accepted"
                              style={
                                job.application.state
                                  ? { color: 'var(--success)' }
                                  : (
                                    job.application.state === null
                                      ? { color: 'gold' } : { color: 'var(--secondary)' }
                                  )
                              }
                            >
                              {
                                job.application.state
                                  ? "Accepted"
                                  : (
                                    job.application.state === null
                                      ? "Waiting" : "Rejected"
                                  )
                              }
                            </span>
                          </div>
                        }
                        {/* {
                          (!job.is_closed && (job.application.state === null)) &&
                          <div className="candidate-detail__above__applied-recruitment__status">
                            <span
                              className="candidate-detail__above__applied-recruitment__status__name">
                              {index + 1}. {job.title}
                            </span>
                            <div className="candidate-detail__above__applied-recruitment__status__group-button" >
                              <button
                                type="button"
                                className="btn btn-success btn-sm mr-2"
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
                          </div>
                        } */}
                      </div>
                    })
                  }
                </>
              }
              {/* <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                margin: '1.5rem 0 0 0'
              }} >
                <div style={{
                  width: '20%',
                  border: '1px dashed darkgray',
                }} />
              </div> */}
              {
                candidate.invited_jobs.length > 0 &&
                <>
                  <span style={{
                    margin: '1.5rem 0 .5rem 0',
                    textAlign: 'right',
                    width: '100%',
                    color: 'cornflowerblue',
                    fontWeight: '500',
                  }}>The jobs you have invited this candidate:</span>
                  {
                    candidate.invited_jobs.map((job, index) => {
                      return <div
                        className="candidate-detail__above__applied-recruitment"
                        key={index}
                      >
                        {
                          // (job.is_closed || (job.application.state !== null)) &&
                          <div className="candidate-detail__above__applied-recruitment__status">
                            <span
                              className={
                                (job.is_closed || (job.application.state !== null))
                                  ? "candidate-detail__above__applied-recruitment__status__title recruitment-was-closed"
                                  : "candidate-detail__above__applied-recruitment__status__title"
                              }
                            >
                              {index + 1}. {job.title}
                            </span>
                            <span
                              className="candidate-detail__above__applied-recruitment__status__is-closed"
                              style={job.is_closed ? { color: "red" } : { color: "var(--success)" }}
                            >
                              {job.is_closed ? "Closed" : "Recruiting"}
                            </span>
                            <div className="candidate-detail__above__applied-recruitment__status__dot" />
                            <span
                              className="candidate-detail__above__applied-recruitment__status__is-accepted"
                              style={
                                job.application.state
                                  ? { color: 'var(--success)' }
                                  : (
                                    job.application.state === null
                                      ? { color: 'gold' } : { color: 'var(--secondary)' }
                                  )
                              }
                            >
                              {
                                job.application.state
                                  ? "Accepted"
                                  : (
                                    job.application.state === null
                                      ? "Waiting" : "Denied"
                                  )
                              }
                            </span>
                          </div>
                        }
                      </div>
                    })
                  }
                </>
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
                    date_of_birth: moment(new Date(candidate.date_of_birth)).format("YYYY-MM-DD"),
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