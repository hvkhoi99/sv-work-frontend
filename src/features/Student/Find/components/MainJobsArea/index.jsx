import studentApi from 'api/studentApi';
// import LoadingChildUI from 'components/LoadingChild';
import Images from 'constants/images';
import RecruitmentCard from 'features/Recruiter/Recruitment/components/RecruitmentCard';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import './MainJobsArea.scss';
import SkeletonRecruitmentCard from 'components/SkeletonCards/SkeletonRecruitmentCard';
// import SkeletonRecruitmentCard from 'components/SkeletonCards/SkeletonRecruitment';

MainJobsArea.propTypes = {
  initialValues: PropTypes.object,
  jobs: PropTypes.array,
  setJobs: PropTypes.func
};

MainJobsArea.defaultProps = {
  initialValues: {},
  jobs: [],
  setJobs: null
}

function MainJobsArea(props) {
  const { initialValues, jobs, setJobs } = props;
  const history = useHistory();
  const [mainLoading, setMainLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(true);

  const _limit = 4;

  useEffect(() => {
    setMainLoading(true);
    setCurrentPage(1);
    const fetchJobs = async () => {
      try {
        const params = {
          page: 1,
          _limit,

          keyword: initialValues.keyword,
          location: initialValues.location,
          career: initialValues.career !== null ? initialValues.career.value : null,
          type: initialValues.type !== null ? initialValues.type.value : null,
          salary: initialValues.salary,
          closed: initialValues.closed !== null ? initialValues.closed.value : null,
          extra: initialValues.extra !== null ? initialValues.extra.value : null,
        };

        const data = await studentApi.findJobs(params);
        if (data.data.status === 1) {
          setJobs(data.data.data.data);
          setTotal(data.data.data.total);
        }
        setMainLoading(false);
      } catch (error) {
        setMainLoading(false);
        console.log("Cannot fetch jobs. Error: " + error.message)
      }
    };

    fetchJobs();
  }, [initialValues.career, initialValues.closed, initialValues.extra, initialValues.keyword, initialValues.location, initialValues.salary, initialValues.type, setJobs]);

  const onViewJob = (id) => {
    history.push(`/recruitment/${id}`);
  }

  const handleSeeMore = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newPage = ++currentPage;
    setCurrentPage(newPage);
    // console.log({ newPage })
    try {
      const params = {
        page: newPage,
        _limit,

        keyword: initialValues.keyword,
        location: initialValues.location,
        career: initialValues.career !== null ? initialValues.career.value : null,
        type: initialValues.type !== null ? initialValues.type.value : null,
        salary: initialValues.salary,
        closed: initialValues.closed !== null ? initialValues.closed.value : null,
        extra: initialValues.extra !== null ? initialValues.extra.value : null,
      };

      const data = await studentApi.findJobs(params);
      if (data.data.status === 1) {
        const newJobs = jobs.concat(...data.data.data.data);
        setJobs(newJobs);
        setTotal(data.data.data.total);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Cannot fetch jobs. Error: " + error.message)
    }
  }

  const renderStatusForApplyButton = (application) => {
    if (application.state === null) {
      if (application.is_invited) {
        return "Accept";
      } else {
        if (application.is_applied) {
          return "Applied";
        } else {
          return "Apply";
        }
      }
    } else {
      if (application.state === true) {
        if (application.is_invited) {
          return "Accepted";
        } else {
          if (application.is_applied) {
            return "Accepted";
          } else {
            return "Apply";
          }
        }
      } else {
        if (application.is_invited) {
          return "Rejected";
        } else {
          if (application.is_applied) {
            return "Rejected";
          } else {
            return "Apply";
          }
        }
      }
    }
  }

  const onApplyJob = (jobId) => {
    // setIsApplying(!isApplying);
    console.log({ jobId })
  }

  // console.log({jobs})

  return (
    <>
      {
        mainLoading
          // ? <div className="loading-child-ui">
          //   <LoadingChildUI />
          // </div>
          ? <div className="main-jobs-area-skeleton-area">
            <SkeletonRecruitmentCard />
            <SkeletonRecruitmentCard />
            <SkeletonRecruitmentCard />
            <SkeletonRecruitmentCard />
          </div>
          : <div className="main-jobs-area">
            <div className="main-jobs-area__title">
              <span>"{initialValues.keyword}" Job Results {`(${jobs.length})`}</span>
              <div className="main-jobs-area__title__show">
                {
                  !show
                    ? <FaIcons.FaEyeSlash
                      className="main-jobs-area__title__show__icon"
                      onClick={() => setShow(!show)}
                    />
                    : <FaIcons.FaEye
                      className="main-jobs-area__title__show__icon"
                      onClick={() => setShow(!show)}
                    />
                }
              </div>
            </div>
            {
              show &&
              <>
                {
                  jobs.length > 0
                    ? <>
                      <div className="main-jobs-area__content">
                        {
                          jobs.map((item, index) => {
                            return <div
                              key={index}
                              className="main-jobs-area__content__item"
                            >
                              <RecruitmentCard
                                recruitment={item}
                                applyText={renderStatusForApplyButton(item.application)}
                                // isApplying={isApplying}
                                onApplyJob={onApplyJob}
                                onViewJob={onViewJob}
                              />
                            </div>
                          })
                        }
                        {
                          // isLoading && <div className="main-jobs-area__content__item-loading">
                          //   <LoadingChildUI />
                          // </div>
                          isLoading && <div className="main-jobs-area-skeleton-area-child">
                            <SkeletonRecruitmentCard />
                            <SkeletonRecruitmentCard />
                            {/* <SkeletonRecruitmentCard />
                            <SkeletonRecruitmentCard /> */}
                          </div>
                        }
                      </div>
                      {
                        (!isLoading && (jobs.length < total)) && <div className="main-jobs-area__more">
                          <Link to="#" className="main-jobs-area__more__link" onClick={handleSeeMore}>
                            <BsIcons.BsChevronDoubleDown className="main-jobs-area__more__link__icon" />
                            <span>See more</span>
                          </Link>
                        </div>
                      }
                    </>
                    : <div className="find-candidates__container__pagination__not-found">
                      <img src={Images.notfoundcandidate} alt="not-found-candidate" />
                      <div className="find-candidates__container__pagination__not-found__info">
                        <RiIcons.RiErrorWarningFill
                          className="find-candidates__container__pagination__not-found__info__icon"
                        />
                        <span>No matching results were found.</span>
                      </div>
                    </div>
                }
              </>
            }
          </div>
      }
    </>
  );
}

export default MainJobsArea;