import PropTypes from 'prop-types';
import React from 'react';
import TopRecruiterCard from '../TopRecruiterCard';
import './TopRecruiterGroupCard.scss';

TopRecruiterGroupCard.propTypes = {
  recruiters: PropTypes.array,
  listImg: PropTypes.array,
  cardSize: PropTypes.array,
};

TopRecruiterCard.defaultProps = {
  recruiters: [],
  listImg: [],
  cardSize: [],
}

function TopRecruiterGroupCard(props) {
  const { recruiters, listImg, cardSize } = props;

  return (
    <div className="card-group">
      {recruiters.map((recruiter, index) => {
        return <TopRecruiterCard
          cardSize={cardSize[index]}
          img={listImg[index]}
          recruiter={recruiter}
          key={index}
        />
      })}
    </div>
  );
}

export default TopRecruiterGroupCard;