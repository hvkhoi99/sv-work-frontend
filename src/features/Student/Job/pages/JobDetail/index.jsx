import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import RecruitmentDetail from 'features/Recruiter/Recruitment/pages/RecruitmentDetail';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import helper from 'utils/common';
import './JobDetailPage.scss';

JobDetailPage.propTypes = {

};

function JobDetailPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // const { id } = useParams();
  // const [recruitmentDetail, setRecruitmentDetail] = useState({});

  // useEffect(() => {
  //   helper.scrollToTop();

  //   const fetchRecruitmentDetail = async () => {
  //     try {
  //       const data = await studentApi.getRecruimentDetail(id);
  //       setRecruitmentDetail(data.data.data)
  //       setIsLoading(false);
  //       return data.data;
  //     } catch (error) {
  //       console.log("Cannot fetch recruitment detail. Error: " + error)
  //     }
  //   };

  //   fetchRecruitmentDetail();
  // }, [id]);

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const handleToApplyJob = () => {
    console.log("apply");
  }

  const handleToSaveJob = () => {
    console.log("save");
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
                  </div>
                  <div className="job-detail-page__container__top__left__info">
                    <h4>Java Back-end Senior</h4>
                    <span className="job-detail-page__container__top__left__info__company-name">
                      Twitter Tower
                    </span>
                    <span>Da Nang, Viet Nam</span>
                    <span>$1000 - $2000</span>
                  </div>
                </div>
                <div className="job-detail-page__container__top__right">
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-success btn-apply"
                      onClick={handleToApplyJob}
                    >Apply</button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success btn-save"
                      // onClick={(e) => handleCloseRecruitment(e)}
                      // onClick={() => onShow(true)}
                      // disabled={recruitmentDetail.is_closed || isClosing}
                      onClick={handleToSaveJob}
                    >
                      {/* {isClosing && <span className="spinner-border spinner-border-sm mr-2" />} */}
                      Save
                    </button>
                  </>
                </div>
              </div>
              <div className="job-detail-page__container__bottom">
                <div className="job-detail-page__container__bottom__description">
                  <RecruitmentDetail />
                </div>
              </div>
            </div>
          </div>
      }
    </>

  );
}

export default JobDetailPage;