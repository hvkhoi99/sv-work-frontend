import LoadingChildUI from 'components/LoadingChild';
import Images from 'constants/images';
import RecruitmentCard from 'features/Recruiter/Me/components/RecruitmentCard';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
import './RecruitmentDetail.scss';

RecruitmentDetail.propTypes = {
  recruitmentDetail: PropTypes.object
};

RecruitmentDetail.defaultProps = {
  recruitmentDetail: {}
}

function RecruitmentDetail(props) {
  const { recruitmentDetail } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [])

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
                {ReactHtmlParser(recruitmentDetail.benefits)}
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
                      {moment(recruitmentDetail.created_at).format('MM/DD/YYYY')} - {recruitmentDetail.expiry_date}
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
                      {recruitmentDetail.job_category}
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
                      {recruitmentDetail.is_full_time ? "Full Time" : "Part Time"}
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
              {ReactHtmlParser(recruitmentDetail.description)}
            </div>
          </div>
          <div className="recruitment-detail-item requirements">
            <h3>Requirements</h3>
            <div className="requirements__attach">
              <div className="requirements__attach__icon" />
            </div>
            <div className="requirements__content">
              {ReactHtmlParser(recruitmentDetail.requirement)}
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
                  {recruitmentDetail.location}
                </span>
              </div>
            </div>
            <div className="work-location__right">
              <img src={Images.ship} alt="ship" />
            </div>
          </div>
          <div className="similar-job hidden">
            <h3>Similar Job for you</h3>
            <div className="similar-job__content">
              <RecruitmentCard />
              <RecruitmentCard />
              <RecruitmentCard />
              <RecruitmentCard />
            </div>
          </div>
        </>
      }
    </>
  );
}

export default RecruitmentDetail;