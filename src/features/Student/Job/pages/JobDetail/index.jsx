import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import RecruitmentDetail from 'features/Recruiter/Recruitment/pages/RecruitmentDetail';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import helper from 'utils/common';
import './JobDetailPage.scss';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/im';
import * as RiIcons from 'react-icons/ri';

JobDetailPage.propTypes = {

};

function JobDetailPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recruitment, setRecruitment] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [applyText, setApplyText] = useState("Apply");
  const [saveText, setSaveText] = useState("Save");
  const [applicationState, setApplicationState] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  // const [stateData, setStateData] = useState({
  //   applyText: "Apply",
  //   saveText: "Save",
  //   applicationState: null
  // });

  useEffect(() => {
    helper.scrollToTop();

    const fetchRecruitmentDetail = async () => {
      try {
        const data = await studentApi.getJobDetail(id);
        setRecruitment(data.data.data);
        setApplicationState(data.data.data.application.state);
        setApplyText(data.data.data.application.is_applied ? "Applied" : "Apply");
        setSaveText(data.data.data.application.is_saved ? "Saved" : "Save");
        // setStateData(state => ({
        //   applicationState: data.data.data.application.state,
        //   applyText: data.data.data.application.is_applied ? "Applied" : "Apply",
        //   saveText: data.data.data.application.is_saved ? "Saved" : "Save"
        // }))
        setIsLoading(false);
        return data.data;
      } catch (error) {
        console.log("Cannot fetch recruitment detail. Error: " + error)
      }
    };

    fetchRecruitmentDetail();
  }, [id]);

  const handleToApplyJob = async () => {
    setIsApplying(true);
    try {
      const action = await studentApi.applyJob(id);
      if (action.data.status === 1) {
        setIsApplying(false);
        setApplyText(action.data.data.is_applied ? "Applied" : "Apply");
        enqueueSnackbar(
          `Successfully ${action.data.data.is_applied ? "Applied" : "Un-Apply"} job.`,
          { variant: "success" }
        );
        return true;
      } else {
        setIsApplying(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      setIsApplying(false);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const handleToSaveJob = async () => {
    setIsSaving(true);
    try {
      const action = await studentApi.saveJob(id);
      if (action.data.status === 1) {
        setIsSaving(false);
        setSaveText(action.data.data.is_saved ? "Saved" : "Save");
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

  const onAcceptInvitedJob = async (id) => {
    setIsAccepting(true);
    try {
      const action = await studentApi.acceptInvitedJob(id);
      if (action.data.status === 1) {
        setIsAccepting(false);
        setApplicationState(true);
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
  const renderApplicationArea = (state) => {
    switch (state) {
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
      // break;
      case false:
        switch (recruitment.application.is_invited) {
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
          case false: {
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
          }
          default:
            break;
        }
        break;
      case null:
        if (recruitment.application.is_invited) {
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
                  style={ isAccepting ? { cursor: "default" } : { cursor: "pointer" }}
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
                </button> to "Decline".
              </div>
            </>
          );
        }
        break;
      default:
        break;
    }
  }

  const onRejectInvitedJob = async (id) => {
    setIsRejecting(true);
    try {
      const action = await studentApi.rejectInvitedJob(id);
      if (action.data.status === 1) {
        setIsRejecting(false);
        setApplicationState(false);
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
                    <img src={Images.tw} alt="avatar" />
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
                      (!recruitment.application.state &&
                        !recruitment.is_closed &&
                        !recruitment.application.is_invited
                      ) && <button
                        type="button"
                        className="btn btn-sm btn-success btn-apply"
                        onClick={handleToApplyJob}
                        disabled={isApplying}
                        style={isApplying ? { cursor: "default" } : { cursor: "pointer" }}
                      >
                        {isApplying && <span className="spinner-border spinner-border-sm mr-2" />}
                        {applyText}
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
                      {saveText}
                    </button>
                    <div className="job-detail-page__container__top__right__more-info">
                      <>
                        {
                          renderApplicationArea(applicationState)
                        }
                      </>
                    </div>
                  </>
                </div>
              </div>
              <div className="job-detail-page__container__bottom">
                <div className="job-detail-page__container__bottom__description">
                  <RecruitmentDetail recruitment={recruitment} />
                </div>
              </div>
            </div>
          </div>
      }
    </>

  );
}

export default JobDetailPage;