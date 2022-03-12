import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Paths from 'constants/paths';
import RecruitmentDetail from 'features/Recruiter/Recruitment/pages/RecruitmentDetail';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import helper from 'utils/common';
import './JobDetailPage.scss';

JobDetailPage.propTypes = {

};

function JobDetailPage(props) {
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recruitment, setRecruitment] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [stateData, setStateData] = useState({
    applicationState: null,
    isInvited: false,
    isApplied: false,
    isSaved: false
  });
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    helper.scrollToTop();

    const fetchRecruitmentDetail = async () => {
      try {
        const data = await studentApi.getJobDetail(id);
        // console.log(data.data.data);
        setRecruitment(data.data.data);
        if (data.data.data.application !== null) {
          setStateData(state => ({
            ...state,
            applicationState: data.data.data.application.state,
            isInvited: data.data.data.application.is_invited,
            isApplied: data.data.data.application.is_applied,
            isSaved: data.data.data.application.is_saved,
          }))
        }
        setIsLoading(false);
        return data.data;
      } catch (error) {
        console.log("Cannot fetch recruitment detail. Error: " + error)
      }
    };

    fetchRecruitmentDetail();
  }, [id]);

  const onShow = (value) => {
    setShow(value);
  }

  const onUpdateStudentProfile = () => {
    if ((user && Object.keys(user).length === 0)) {
      history.push("/auth/sign-in");
    } else {
      if (user.s_profile && !user.s_profile.open_for_job) {
        history.push(`${Paths.clientProfile}`);
      } else {
        history.push("/first-update/student");
      }
    }
  }

  const handleToApplyJob = async () => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null || !user.s_profile.open_for_job) {
      onShow(true);
    } else {

      setIsApplying(true);
      try {
        const action = await studentApi.applyJob(id);
        if (action.data.status === 1) {
          setIsApplying(false);
          setStateData(state => ({
            ...state,
            isApplied: action.data.data.is_applied
          }));
          enqueueSnackbar(
            `Successfully ${action.data.data.is_applied ? "Applied" : "Un-Apply"} job.`,
            { variant: "success" }
          );
        } else {
          setIsApplying(false);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        }
        return;
      } catch (error) {
        setIsApplying(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return;
      }
    }
  }

  const handleToSaveJob = async () => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null) {
      onShow(true);
    } else {
      setIsSaving(true);
      try {
        const action = await studentApi.saveJob(id);
        if (action.data.status === 1) {
          setIsSaving(false);
          setStateData(state => ({
            ...state,
            isSaved: action.data.data.is_saved
          }));
          enqueueSnackbar(action.data.message, { variant: "success" });
          return true;
        } else {
          setIsSaving(false);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }
      } catch (error) {
        setIsSaving(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    }
  }

  const onAcceptInvitedJob = async (id) => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null || !user.s_profile.open_for_job) {
      onShow(true);
    } else {
      setIsAccepting(true);
      try {
        const action = await studentApi.acceptInvitedJob(id);
        if (action.data.status === 1) {
          setIsAccepting(false);
          setStateData(state => ({
            ...state,
            applicationState: true
          }));
          enqueueSnackbar(
            `Successfully accepted the job offer.`,
            { variant: "success" }
          );
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
  }

  const onRejectInvitedJob = async (id) => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null || !user.s_profile.open_for_job) {
      onShow(true);
    } else {
      setIsRejecting(true);
      try {
        const action = await studentApi.rejectInvitedJob(id);
        if (action.data.status === 1) {
          setIsRejecting(false);
          // setApplicationState(false);
          setStateData(state => ({
            ...state,
            applicationState: false
          }));
          enqueueSnackbar(
            `Successfully declined the job offer.`,
            { variant: "success" }
          );
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
  }

  const renderApplicationArea = (state) => {
    switch (state) {
      case true:
        switch (stateData.isApplied) {
          case true:
            return (
              <span style={{ color: 'var(--success)' }}>
                <BsIcons.BsCheckCircle
                  style={{
                    color: 'var(--success)',
                    fontSize: '1.5rem',
                    margin: '0 .2rem'
                  }}
                />
                {"Your application has been accepted by the employer."}
              </span>
            );
          case false:
            switch (stateData.isInvited) {
              case true:
                return (
                  <span style={{ color: 'var(--success)' }}>
                    <BsIcons.BsCheckCircle
                      style={{
                        color: 'var(--success)',
                        fontSize: '1.5rem',
                        margin: '0 .2rem'
                      }}
                    />
                    {"You have accepted the invitation to join this job."}
                  </span>
                );
              case false:
                return (
                  <span style={{ color: 'var(--success)' }}>
                    <BsIcons.BsCheckCircle
                      style={{
                        color: 'var(--success)',
                        fontSize: '1.5rem',
                        margin: '0 .2rem'
                      }}
                    />
                    {"Your application for employment has been accepted by the employer."}
                  </span>
                );
              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      // break;
      case false:
        switch (stateData.isInvited) {
          case true:
            return (
              <span style={{ color: 'red' }}>
                <ImIcons.ImCancelCircle
                  style={{
                    color: 'red',
                    fontSize: '1.5rem',
                    margin: '0 .2rem'
                  }}
                />
                {
                  "You have declined the invitation to join this job."
                }
              </span>
            );
          case false:
            return (
              <span style={{ color: 'red' }}>
                <ImIcons.ImCancelCircle
                  style={{
                    color: 'red',
                    fontSize: '1.5rem',
                    margin: '0 .2rem'
                  }}
                />
                {
                  "Your job application has been rejected by the recruiter."
                }
              </span>
            );
          default:
            break;
        }
        break;
      case null:
        if (stateData.isInvited) {
          return (
            <>
              <span style={{ color: 'gold' }}>
                <RiIcons.RiErrorWarningLine
                  style={{
                    color: 'gold',
                    fontSize: '1.5rem',
                    margin: '0 .2rem'
                  }}
                />
                {
                  "You are invited to this job from the recruiter."
                }
              </span>
              <div className="job-detail-page__container__top__right__more-info__btn-group">
                Press <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => onAcceptInvitedJob(recruitment.id)}
                  disabled={isAccepting}
                  style={isAccepting ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {
                    isAccepting && <span className="spinner-border spinner-border-sm mr-2" />
                  }
                  Accept
                </button> to "Accept" the offer,
                Press <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onRejectInvitedJob(recruitment.id)}
                  disabled={isRejecting}
                  style={isRejecting ? { cursor: "default" } : { cursor: "pointer" }}
                >
                  {
                    isRejecting && <span className="spinner-border spinner-border-sm mr-2" />
                  }
                  Reject
                </button> to "Reject".
              </div>
            </>
          );
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="job-detail-page">
            <div className="job-detail-page__container">
              <div className="job-detail-page__container__top">
                <div className="job-detail-page__container__top__left">
                  <div className="job-detail-page__container__top__left__img">
                    <img src={recruitment.company_info.logo_image_link} alt="company-avatar" />
                    <div className="job-detail-page__container__top__left__img__check">
                      <FaIcons.FaCheckCircle
                        className="job-detail-page__container__top__left__img__check__icon"
                      />
                    </div>
                  </div>
                  <div className="job-detail-page__container__top__left__info">
                    <h4>{recruitment.title}</h4>
                    <span className="job-detail-page__container__top__left__info__company-name">
                      {recruitment.company_info.company_name}
                    </span>
                    <span>{recruitment.location}</span>
                    <span>${recruitment.min_salary} - ${recruitment.max_salary}</span>
                    <div className="job-detail-page__container__top__left__info__status">
                      Status:<span style={
                        recruitment.is_closed ? { color: 'red' } : { color: 'var(--success)' }
                      }>{recruitment.is_closed ? "Closed" : "Recruiting"}</span>
                    </div>
                  </div>
                </div>
                <div className="job-detail-page__container__top__right">
                  <>
                    {
                      (
                        (stateData.applicationState === null && !stateData.isInvited)
                        && !recruitment.is_closed
                      ) && <button
                        type="button"
                        className="btn btn-sm btn-success btn-apply"
                        onClick={handleToApplyJob}
                        disabled={isApplying}
                        style={isApplying ? { cursor: "default" } : { cursor: "pointer" }}
                      >
                        {isApplying && <span className="spinner-border spinner-border-sm mr-2" />}
                        {stateData.isApplied ? "Applied" : "Apply"}
                      </button>
                    }
                    <button
                      type="button"
                      className="btn btn-sm btn-success btn-save"
                      // onClick={() => onShow(true)}
                      disabled={isSaving}
                      onClick={handleToSaveJob}
                      style={isSaving ? { cursor: "default" } : { cursor: "pointer" }}
                    >
                      {isSaving && <span className="spinner-border spinner-border-sm mr-2" />}
                      {stateData.isSaved ? "Saved Job" : "Save Job"}
                    </button>
                    <div className="job-detail-page__container__top__right__more-info">
                      <>
                        {
                          renderApplicationArea(stateData.applicationState)
                        }
                      </>
                    </div>
                  </>
                </div>
              </div>
              <div className="job-detail-page__container__bottom">
                <div className="job-detail-page__container__bottom__description">
                  <RecruitmentDetail
                    recruitment={recruitment}
                    isViewByStudent={true}
                  />
                </div>
              </div>
            </div>
          </div>
      }

      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={onUpdateStudentProfile}
        // titleConfirm="Update Profile"
        contentConfirm={
          (user && Object.keys(user).length === 0)
            ? "To perform this function, you need to Log in as a Student. You will then need to update your Personal Information if it has not been created. Continue?"
            : (
              user.s_profile && !user.s_profile.open_for_job
                ? "You need to enable OPEN JOB in your Profile page for this functionality to work."
                : "You need to update your Student Profile. Continue?"
            )
        }
      />
    </>
  );
}

export default JobDetailPage;