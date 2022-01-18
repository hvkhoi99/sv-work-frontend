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

  useEffect(() => {
    helper.scrollToTop();

    const fetchRecruitmentDetail = async () => {
      try {
        const data = await studentApi.getJobDetail(id);
        setRecruitment(data.data.data);
        setApplyText(data.data.data.application.is_applied ? "Applied" : "Apply");
        setSaveText(data.data.data.application.is_saved ? "Saved" : "Save");
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
                  </div>
                </div>
                <div className="job-detail-page__container__top__right">
                  <>
                    {!recruitment.application.state && <button
                      type="button"
                      className="btn btn-sm btn-success btn-apply"
                      onClick={handleToApplyJob}
                      disabled={isApplying}
                      style={isApplying ? { cursor: "default" } : { cursor: "pointer" }}
                    >
                      {isApplying && <span className="spinner-border spinner-border-sm mr-2" />}
                      {applyText}
                    </button>}
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