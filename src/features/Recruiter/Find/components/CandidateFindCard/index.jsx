import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as TiIcons from 'react-icons/ti';
import './CandidateFindCard.scss';

CandidateFindCard.propTypes = {
  candidate: PropTypes.object,
  onViewCandidate: PropTypes.func,
};

CandidateFindCard.defaultProps = {
  candidate: {},
  onViewCandidate: null
}

function CandidateFindCard(props) {
  const { candidate, onViewCandidate } = props;

  const handleViewCandidate = (candidate) => {
    onViewCandidate(candidate.id);
  }

  return (
    <div
      className="candidate-find-card"
      onClick={() => handleViewCandidate(candidate)}
    >
      <div className="candidate-find-card__img">
        <img src={
          candidate.avatar_link === (null || "" || undefined)
            ? Images.defaultAvatar
            : candidate.avatar_link
        } alt="candidate-avatar" />
      </div>
      <span className="candidate-find-card__name">
        {candidate.first_name} {candidate.last_name}
      </span>
      <span className="candidate-find-card__career">
        {candidate.job_title}
      </span>
      <div className="candidate-find-card__address">
        <TiIcons.TiLocation className="candidate-find-card__address__icon" />
        <span>{candidate.address}</span>
      </div>
      <div className="candidate-find-card__skills">
        {
          candidate.skills.map((skill, index) => {
            return <span
              key={index}
              className="candidate-find-card__skills__name"
            >
              {skill.value}
            </span>
          })
        }
      </div>
      <div className="candidate-find-card__btn-group">
        <button className="btn btn-success btn-sm">View</button>
      </div>
    </div>
  );
}

export default CandidateFindCard;