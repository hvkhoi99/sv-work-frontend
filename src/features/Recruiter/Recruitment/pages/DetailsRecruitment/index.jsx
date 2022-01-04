import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import helper from 'utils/common';
import ListCandidates from '../ListCandidates';
import RecruitmentDetail from '../RecruitmentDetail';
import './DetailsRecruitment.scss';
// import PropTypes from 'prop-types';

DetailsRecruitmentPage.propTypes = {
  // onDeleteRecruitment: PropTypes.func
};

DetailsRecruitmentPage.defaultProps = {
  // onDeleteRecruitment: null
}

function DetailsRecruitmentPage(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.current);
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { recruitmentId } = useParams();
  const [recruitmentDetail, setRecruitmentDetail] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangeOptionMenu = (index) => {
    return setIsActiveIndex(index);
  };

  useEffect(() => {
    const fetchRecruitmentDetail = async () => {
      try {
        const data = await studentApi.getRecruimentDetail(recruitmentId);
        setRecruitmentDetail(data.data.data)
        setIsLoading(false);
        return data.data;
      } catch (error) {
        console.log("Cannot fetch recruitment detail. Error: " + error)
      }
    };

    fetchRecruitmentDetail();
  }, [recruitmentId]);

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  const handleToEditRecruitment = () => {
    history.push({
      pathname: `/recruiter/me/dashboard/available-jobs/${recruitmentId}/update`,
      state: { ...recruitmentDetail }
    })
  };

  const handleCloseRecruitment = async (e) => {
    e.preventDefault();
    setIsClosing(true);

    try {
      const params = {
        ...recruitmentDetail,
        is_closed: true
      }
      user.role_id === 2
        ? await recruiterApi.updateRecruitment(recruitmentId, params)
        : await studentApi.updateRecruitment(recruitmentId, params);
      setIsClosing(false);
      enqueueSnackbar("Your recruitment has been closed.", { variant: "success" });
      history.push(`${Paths.recruiterDashboard}/available-jobs`);
    } catch (error) {
      setIsClosing(false);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  const handleDelete = async (e, recruitment) => {
    setIsDeleting(true);
    try {
      user.role_id === 2
        ? await recruiterApi.deleteRecruitment(recruitment.id)
        : await studentApi.deleteRecruitment(recruitment.id);
      enqueueSnackbar("Your recruitment has been deleted.", { variant: "success" });
      setIsDeleting(false);
      history.push(`${Paths.recruiterDashboard}/closed-recruitments`);
    } catch (error) {
      setIsDeleting(false);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            < LoadingUI />
          </div >
          : <div className="details-recruitment">
            <div className="details-recruitment__container">
              <div className="details-recruitment__container__top">
                <div className="details-recruitment__container__top__left">
                  <div className="details-recruitment__container__top__left__img">
                    <img src={Images.tw} alt="avatar" />
                  </div>
                  <div className="details-recruitment__container__top__left__info">
                    <h4>{recruitmentDetail.title}</h4>
                    <span className="details-recruitment__container__top__left__info__company-name">
                      {user.r_profile.company_name}
                    </span>
                    <span>{recruitmentDetail.location}</span>
                    <span>${recruitmentDetail.min_salary} - ${recruitmentDetail.max_salary}</span>
                  </div>
                </div>
                <div className="details-recruitment__container__top__right">
                  {recruitmentDetail.is_closed
                    ? <button
                      type="button"
                      className="btn btn-sm btn-danger btn-close"
                      onClick={(e) => handleDelete(e, recruitmentDetail)}
                      disabled={isDeleting}
                    >
                      {isDeleting && <span className="spinner-border spinner-border-sm mr-2" />}
                      {isDeleting ? "Deleting" : "Delete"}
                    </button>
                    : <>
                      <button
                        type="button"
                        className="btn btn-sm btn-success btn-edit"
                        onClick={handleToEditRecruitment}
                      >Edit</button>
                      <button
                        type="button"
                        className="btn btn-sm btn-success btn-close"
                        onClick={(e) => handleCloseRecruitment(e)}
                        disabled={recruitmentDetail.is_closed || isClosing}
                      >
                        {isClosing && <span className="spinner-border spinner-border-sm mr-2" />}
                        {!recruitmentDetail.is_closed ? (isClosing ? "Closing" : "Close") : "Closed"}
                      </button>
                    </>
                  }
                </div>
              </div>
              <div className="details-recruitment__container__bottom">
                <div className="details-recruitment__container__bottom__menu">
                  <Link
                    to="#"
                    className={isActiveIndex === 0
                      ? "details-recruitment__container__bottom__menu__item recruitment-detail-link isActive"
                      : "details-recruitment__container__bottom__menu__item recruitment-detail-link"
                    }
                    onClick={() => handleChangeOptionMenu(0)}
                  >Recruitment Detail</Link>
                  <Link
                    to="#"
                    className={isActiveIndex === 1
                      ? "details-recruitment__container__bottom__menu__item list-candidates-link isActive"
                      : "details-recruitment__container__bottom__menu__item list-candidates-link"
                    }
                    onClick={() => handleChangeOptionMenu(1)}
                  >List Candidates</Link>
                </div>
                <div className="details-recruitment__container__bottom__description">
                  {
                    isActiveIndex === 0
                      ? <RecruitmentDetail recruitmentDetail={recruitmentDetail} />
                      : <ListCandidates />
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default DetailsRecruitmentPage;