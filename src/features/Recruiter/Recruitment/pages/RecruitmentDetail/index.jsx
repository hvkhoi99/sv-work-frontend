import LoadingChildUI from 'components/LoadingChild';
import Images from 'constants/images';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
import RecruitmentCard from '../../components/RecruitmentCard';
import homeApi from 'api/homeApi';
import './RecruitmentDetail.scss';
import helper from 'utils/common';
import { useHistory } from 'react-router-dom';

RecruitmentDetail.propTypes = {
  recruitment: PropTypes.object,
  isViewByStudent: PropTypes.bool,
};

RecruitmentDetail.defaultProps = {
  recruitment: {},
  isViewByStudent: false
}

function RecruitmentDetail(props) {
  const history = useHistory();
  const { recruitment, isViewByStudent } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  // const exampleRecruitment = {
  //   title: 'Example Recruitment',
  //   min_salary: 0,
  //   max_salary: 0,
  //   location: 'Viet Nam',
  //   hashtags: [],
  //   application: {
  //     id: 0,
  //     is_applied: 0,
  //     is_invited: 0,
  //     is_saved: 0,
  //     recruitment_id: 0,
  //     state: null,
  //     user_id: 0,
  //   },
  //   company_info: {
  //     company_name: 'Company',
  //     id: 0,
  //     logo_image_link: Images.defaultAvatar,
  //     verify: false
  //   },
  //   count_applications: 0,
  //   expiry_date: "01/10/2022",
  //   created_at: "01/10/2022",
  // }

  useEffect(() => {
    if (isViewByStudent) {
      helper.scrollToTop();
      const fetchTopRecruitments = async () => {
        try {
          const topJobs = await homeApi.getTopRecruitments();
          if (topJobs.data.status === 1) {
            setJobs(topJobs.data.data);
          }
          setIsLoading(false);
          return;
        } catch (error) {
          console.log("Cannot get top Jobs. Error: ", error.message);
          setIsLoading(false);
          return;
        }
      }

      fetchTopRecruitments();
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000)

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isViewByStudent]);

  const onViewJob = (id) => {
    history.push(`/recruitment/${id}`);
  }

  return (
    <>
      {isLoading
        ? <div className="loading-child-ui">
          <LoadingChildUI />
        </div>
        : <>
          <div className="recruitment-detail-item benefits">
            <h3>Benefits</h3>

            <div className="benefits__content">
              <div className="benefits__content__left">
                <div className="benefits__content__left__attach">
                  <div className="benefits__content__left__attach__icon" />
                </div>
                {ReactHtmlParser(recruitment.benefits)}
              </div>
              <div className="benefits__content__right">
                <div className="benefits__content__right__date">
                  <BsIcons.BsCalendarCheck className="benefits__content__right__date__icon" />
                  <div className="benefits__content__right__date__info">
                    <span className="benefits__content__right__date__info__title">
                      Posted Date - Expiry Date
                    </span>
                    <span className="benefits__content__right__date__info__description">
                      {/* 28/04/2021 - 30/08/2021 */}
                      {moment(recruitment.created_at).format('MM/DD/YYYY')} - {recruitment.expiry_date}
                    </span>
                  </div>
                </div>
                <div className="benefits__content__right__job-category">
                  <MdIcons.MdWork className="benefits__content__right__job-category__icon" />
                  <div className="benefits__content__right__job-category__info">
                    <span className="benefits__content__right__job-category__info__title">
                      Job Category
                    </span>
                    <span className="benefits__content__right__job-category__info__description">
                      {recruitment.job_category}
                    </span>
                  </div>
                </div>
                <div className="benefits__content__right__type">
                  <BsIcons.BsFillClockFill className="benefits__content__right__type__icon" />
                  <div className="benefits__content__right__type__info">
                    <span className="benefits__content__right__type__info__title">
                      Type of Job
                    </span>
                    <span className="benefits__content__right__type__info__description">
                      {recruitment.is_full_time ? "Full Time" : "Part Time"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="recruitment-detail-item job-description">
            <h3>Job Description</h3>
            <div className="job-description__attach">
              <div className="job-description__attach__icon" />
            </div>
            <div className="job-description__content">
              {ReactHtmlParser(recruitment.description)}
            </div>
          </div>
          <div className="recruitment-detail-item requirements">
            <h3>Requirements</h3>
            <div className="requirements__attach">
              <div className="requirements__attach__icon" />
            </div>
            <div className="requirements__content">
              {ReactHtmlParser(recruitment.requirement)}
            </div>
          </div>
          <div className="work-location">
            <div className="work-location__left">
              <h3>Work Location</h3>
              <div className="work-location__attach">
                <div className="work-location__attach__icon" />
              </div>
              <div className="work-location__left__content">
                <TiIcons.TiLocation className="work-location__left__content__icon" />
                <span className="work-location__left__content__description">
                  {recruitment.location}
                </span>
              </div>
            </div>
            <div className="work-location__right">
              <img src={Images.ship} alt="ship" />
            </div>
          </div>
          {isViewByStudent && <div className="similar-job">
            {
              jobs.length > 0 &&
              <>
                <h3>Top Jobs</h3>
                <div className="similar-job__content">
                  {
                    jobs.map((job, index) => {
                      return <RecruitmentCard
                        key={index}
                        onViewJob={onViewJob}
                        recruitment={job}
                      />
                    })
                  }
                </div>
              </>
            }
          </div>}
        </>
      }
    </>
  );
}

export default RecruitmentDetail;