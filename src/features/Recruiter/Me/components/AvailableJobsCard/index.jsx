import React from 'react';
import * as BiIcons from 'react-icons/bi';
import * as GrIcons from 'react-icons/gr';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago'
import HashTagCard from '../HashTagCard';

AvailableJobsCard.propTypes = {
  item: PropTypes.object
};

AvailableJobsCard.defaultProps = {
  item: {}
}

function AvailableJobsCard(props) {
  const { item } = props;
  console.log({ item })

  return (
    <div className="available-jobs__container">
      <div className="available-jobs__container__top">
        <span className="available-jobs__container__top__title">{item.title}</span>
        <span className="available-jobs__container__top__date">
          <ReactTimeAgo date={Date.parse(item.created_at)} locale="en-US" />
        </span>
      </div>
      <div className="available-jobs__container__bottom">
        <div className="available-jobs__container__bottom__item-first">
          <div className="available-jobs__container__bottom__item-first__location">
            <GrIcons.GrLocation />
            &nbsp;<span>{item.location}</span>
          </div>
          <div className="available-jobs__container__bottom__item-first__salary">
            <BiIcons.BiDollar />
            &nbsp;<span>{item.min_salary}$ - {item.max_salary}$</span>
          </div>
        </div>
        <div className="available-jobs__container__bottom__item-second">
          <span className="available-jobs__container__bottom__item-second__applicants">Applicants: &nbsp;<b>{item.applicants}</b></span>
          <div className="available-jobs__container__bottom__item-second__hashtags">
            {item.hashtags.map((hashtag, index) => {
              return <HashTagCard
                key={index}
                hashtag={hashtag}
              />
            })}
          </div>
        </div>
        <div className="available-jobs__container__bottom__item-third">
          <button className="btn btn-success btn-sm">View</button>
        </div>
      </div>
    </div>
  );
}

export default AvailableJobsCard;