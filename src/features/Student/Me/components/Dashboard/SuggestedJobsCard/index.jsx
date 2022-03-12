// import Images from 'constants/images';
import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
// import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import PropTypes from 'prop-types';
import './SuggestedJobsCard.scss';
import ReactTimeAgo from 'react-time-ago';
import helper from 'utils/common';
import { useHistory } from 'react-router-dom';

SuggestedJobsCard.propTypes = {
  job: PropTypes.object
};

SuggestedJobsCard.defaultProps = {
  job: {}
}

function SuggestedJobsCard(props) {
  const { job } = props;
  const history = useHistory();

  const onViewJobDetail = () => {
    history.push(`/recruitment/${job.id}`);
  }

  return (
    <div className="suggested-jobs-card" onClick={onViewJobDetail}>
      <div className="suggested-jobs-card__date">
        <span><ReactTimeAgo date={Date.parse(job.created_at)} locale="en-US" /></span>
        {
          job.application.is_saved
            ? <AiIcons.AiFillHeart className="suggested-jobs-card__date__icon-heart" />
            : <AiIcons.AiOutlineHeart className="suggested-jobs-card__date__icon-heart" />
        }
      </div>
      <div className="suggested-jobs-card__company-info">
        <div className="suggested-jobs-card__company-info__avatar">
          <img src={job.company_info.logo_image_link} alt="company-avatar" />
          {job.company_info.verify && <div className="suggested-jobs-card__company-info__avatar__verify">
            <FaIcons.FaCheckCircle
              className="suggested-jobs-card__company-info__avatar__verify__icon"
            />
          </div>}
        </div>
        <div className="suggested-jobs-card__company-info__info">
          <span className="suggested-jobs-card__company-info__info__job-name">
            {helper.capitalize(job.title)}
          </span>
          <div className="suggested-jobs-card__company-info__info__company-name-size">
            <span className="suggested-jobs-card__company-info__info__company-name-size__name">
              {job.company_info.company_name}
            </span>
            <div className="suggested-jobs-card__company-info__info__company-name-size__size">
              <FaIcons.FaUserFriends
                className="suggested-jobs-card__company-info__info__company-name-size__size__icon"
              />
              <span>{job.count_applications}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="suggested-jobs-card__salary-location">
        <div className="suggested-jobs-card__salary-location__salary">
          <BiIcons.BiDollarCircle
            className="suggested-jobs-card__salary-location__salary__icon"
          />
          <span>{job.min_salary} - {job.max_salary}/month</span>
        </div>
        <div className="suggested-jobs-card__salary-location__location">
          <MdIcons.MdLocationOn
            className="suggested-jobs-card__salary-location__location__icon"
          />
          <span>{job.location}</span>
        </div>
        <div className="suggested-jobs-card__btn-apply">
          <button className="btn btn-success btn-sm">View</button>
        </div>
      </div>
    </div>
  );
}

export default SuggestedJobsCard;