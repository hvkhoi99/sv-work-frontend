import PropTypes from 'prop-types';
import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as GrIcons from 'react-icons/gr';
import ReactTimeAgo from 'react-time-ago';
import HashTagCard from '../HashTagCard';

ClosedRecruitmentsCard.propTypes = {
  reruitment: PropTypes.object
};

ClosedRecruitmentsCard.defaultProps = {
  recruitment: ''
}

function ClosedRecruitmentsCard(props) {
  const { recruitment } = props;

  return (
    <div className="closed-recruitments__container">
      <div className="closed-recruitments__container__top">
        <span className="closed-recruitments__container__top__title">{recruitment.title}</span>
        <span className="closed-recruitments__container__top__date">
          <ReactTimeAgo date={Date.parse(recruitment.created_at)} locale="en-US" />
        </span>
      </div>
      <div className="closed-recruitments__container__bottom">
        <div className="closed-recruitments__container__bottom__left">
          <div className="closed-recruitments__container__bottom__left__item">
            <GrIcons.GrLocation />
            &nbsp; <span className="closed-recruitments__container__bottom__left__item__location">{recruitment.location}</span>
          </div>
          <div className="closed-recruitments__container__bottom__left__item">
            <BiIcons.BiDollar />
            &nbsp; <span>{recruitment.min_salary}$ - {recruitment.max_salary}$</span>
          </div>
        </div>
        <div className="closed-recruitments__container__bottom__center">
          <div className="closed-recruitments__container__bottom__center__applicants">
            Applicants: <span>{recruitment.applicants}</span>
          </div>
          <div className="closed-recruitments__container__bottom__center__hashtags">
            {recruitment.hashtags.map((hashtag, index) => {
              return <HashTagCard
                key={index}
                hashtag={hashtag}
              />
            })}
          </div>
        </div>
        <div className="closed-recruitments__container__bottom__right">
          <button className="btn btn-success btn-sm view">View</button>
          <button className="btn btn-danger btn-sm delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ClosedRecruitmentsCard;