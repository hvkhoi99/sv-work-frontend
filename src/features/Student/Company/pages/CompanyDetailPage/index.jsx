import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as TiIcons from 'react-icons/ti';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import helper from 'utils/common';
// import PropTypes from 'prop-types';
import './CompanyDetailPage.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as MdIcons from 'react-icons/md';
import RecruitmentCard from 'features/Recruiter/Recruitment/components/RecruitmentCard';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import LoadingChildUI from 'components/LoadingChild';

CompanyDetailPage.propTypes = {

};

function CompanyDetailPage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [followState, setFollowState] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const _limit = 3;
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    helper.scrollToTop();

    const fetchCompanyInfo = async () => {
      try {
        const data = await studentApi.getCompanyInfo(id);

        if (data.data.status === 1) {
          setCompany(data.data.data);
          setFollowState(data.data.data.is_followed);
          setIsLoading(false);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        // setIsLoading(false);
        console.log("Cannot fetch company info. Error:", error.message);
        return false;
      }
    }

    fetchCompanyInfo();
  }, [id]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = {
          page: currentPage,
          _limit
        }
        const data = await studentApi.getJobsByRecruiterId(params, id);

        if (data.data.status === 1) {
          setJobs(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        } else {
          setJobs([]);
        }
        setIsJobsLoading(false);
        return;
      } catch (error) {
        setIsJobsLoading(false);
        console.log("Cannot fetch jobs. Error:", error.message);
        return;
      }
    }

    fetchJobs();
  }, [id, currentPage])


  const onShow = (value) => {
    setShow(value);
  }

  const onUpdateStudentProfile = () => {
    if ((user && Object.keys(user).length === 0)) {
      history.push("/auth/sign-in");
    } else {
      history.push("/first-update/student");
    }
  }

  const onFollowCompany = async (values) => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null) {
      onShow(true);
    } else {
      setIsFollowing(true);
      try {
        const data = await studentApi.followCompany(id);
        if (data.data.status === 1) {
          setIsFollowing(false);
          setFollowState(data.data.data.is_followed);
          enqueueSnackbar(`Successfully ${data.data.data.is_followed ? "Followed" : "Unfollowed"} this company.`, { variant: "success" });
          return true;
        } else {
          setIsFollowing(false);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }
      } catch (error) {
        setIsFollowing(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    }
  }

  const onViewJob = (id) => {
    history.push(`/recruitment/${id}`);
  }

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(`/company/${id}/info?page=${newPage}`);
    helper.scrollToTop(350);
  };

  return (
    <>
      {isLoading
        ?
        <div className="loading-ui">
          <LoadingUI />
        </div>
        : <div className="company-detail">
          <div className="company-detail__container">
            <div className="company-detail__container__info">
              <div className="company-detail__container__info__top">
                <div className="company-detail__container__info__top__left">
                  <img src={
                    company.logo_image_link === (null || "" || undefined)
                      ? Images.defaultAvatar
                      : company.logo_image_link
                  } alt="company-avatar" />
                </div>
                <div className="company-detail__container__info__top__right">
                  <span className="company-detail__container__info__top__right__recruiter-name">
                    {company.company_name ?? "N/A"}
                    {company.verify ? <HiIcons.HiCheckCircle className="inforCard-icon" /> : ""}
                  </span>
                  <span className="company-detail__container__info__top__right__recruiter-industry">
                    {company.company_industry ?? ""}
                  </span>
                  <div className="company-detail__container__info__top__right__recruiter-address">
                    <MdIcons.MdLocationOn
                      className="company-detail__container__info__top__right__recruiter-address__icon"
                    />
                    <span>
                      {company.address ?? "N/A"}
                    </span>
                  </div>
                  <div className="company-detail__container__info__top__right__follow">
                    <Button
                      type="button"
                      color="success"
                      className="company-detail__container__info__top__right__follow__button"
                      disabled={isFollowing}
                      style={isFollowing ? { cursor: "default" } : { cursor: "pointer" }}
                      onClick={onFollowCompany}
                    >
                      <RiIcons.RiChatFollowUpFill
                        className="company-detail__container__info__top__right__follow__button__icon"
                      />
                      {isFollowing && <span className="spinner-border spinner-border-sm mr-1" />}
                      {followState ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="company-detail__container__info__bottom">
                <div className="company-detail__container__info__bottom__industry">
                  <AiIcons.AiFillSetting className="bottom-icon" />
                  <span className="bottom-span">{company.company_industry ?? "N/A"}</span>
                </div>
                <div className="company-detail__container__info__bottom__mail-contact">
                  <AiIcons.AiTwotoneMail className="bottom-icon" />
                  <span className="bottom-span">{company.contact_email ?? "N/A"}</span>
                </div>
                <div className="company-detail__container__info__bottom__phone-number">
                  <AiIcons.AiTwotonePhone className="bottom-icon" />
                  <span className="bottom-span">{company.phone_number ?? "N/A"}</span>
                </div>
                <div className="company-detail__container__info__bottom__company-size">
                  <TiIcons.TiGroup className="bottom-icon" />
                  <span className="bottom-span">{company.company_size ?? "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="company-detail__container__overall">
              <div className="company-detail__container__overall__title">
                <span>Overall</span>
                <GoIcons.GoPrimitiveDot className="title-dot" />
                {/* <PopupTextEditor
                  label="Update Overall"
                  initData={company.description}
                  onTextChange={onUpdateOverall}
                  isUpdating={isUpdating}
                /> */}
              </div>
              <div className="company-detail__container__overall__content">{ReactHtmlParser(company.description ?? "No Information Available.")}</div>
            </div>
            <div className="company-detail__container__available-jobs">
              <div className="company-detail__container__available-jobs__title">
                <span>Available Jobs</span>
                <GoIcons.GoPrimitiveDot className="title-dot" />
              </div>
              {
                isJobsLoading
                  ? <div className="loading-child-ui">
                    <LoadingChildUI />
                  </div>
                  : <>
                    {jobs.length > 0 && <div className="company-detail__container__available-jobs__content">
                      {
                        jobs.map((job, index) => {
                          return <div
                            key={index}
                            className="company-detail__container__available-jobs__content__item"
                          >
                            <RecruitmentCard
                              recruitment={job}
                              onViewJob={onViewJob}
                            />
                          </div>
                        })
                      }
                    </div>
                    }
                    <div className="find-jobs__container__pagination">
                      {
                        jobs.length <= 0
                          ? <span className="find-jobs__container__pagination__no-data">
                            There are currently no jobs.
                          </span>
                          : <ReactPaginate
                            previousLabel={
                              <MdIcons.MdArrowBackIosNew />
                            }
                            nextLabel={
                              <MdIcons.MdArrowForwardIos />
                            }

                            // initialPage={1}
                            // initialPage={currentPage}
                            forcePage={currentPage - 1}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                          />
                      }
                    </div>
                  </>
              }
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
            : "You need to update your Student Profile. Continue?"
        }
      />
    </>
  );
}

export default CompanyDetailPage;