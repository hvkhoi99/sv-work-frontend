import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as TiIcons from 'react-icons/ti';
import helper from 'utils/common';
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

  const handleViewCandidate = () => {
    onViewCandidate(candidate.id);
  }

  return (
    <div
      className="candidate-find-card"
      onClick={handleViewCandidate}
    >
      <div className="candidate-find-card__img">
        <img src={
          candidate.avatar_link === (null || "" || undefined || undefined)
            ? Images.defaultAvatar
            : candidate.avatar_link
        } alt="candidate-avatar" />
      </div>
      <span className="candidate-find-card__name">
        Ho van Khoi
      </span>
      <span className="candidate-find-card__career">
        Web Developer
      </span>
      <div className="candidate-find-card__address">
        <TiIcons.TiLocation className="candidate-find-card__address__icon" />
        <span>Da Nang, Viet Nam</span>
      </div>
      <div className="candidate-find-card__skills">
        {
          helper.splitCommaString("Figma, ReactJS, Designer", "candidate-find-card__skills__name")
        }
      </div>
      <div className="candidate-find-card__btn-group">
        <button className="btn btn-success btn-sm">View</button>
      </div>
    </div>
  );
}

export default CandidateFindCard;