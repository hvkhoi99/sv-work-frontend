import Images from 'constants/images';
import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as TiIcons from 'react-icons/ti';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import './CandidatesCard.scss';


CandidatesCard.propTypes = {
  activeClass: PropTypes.string,
  handleActiveCard: PropTypes.func,
  index: PropTypes.number,
  recruitmentId: PropTypes.string,
  candidate: PropTypes.object,
  page: PropTypes.number,
};

CandidatesCard.defaultProps = {
  activeClass: '',
  handleActiveCard: null,
  index: 0,
  recruitmentId: '',
  candidate: {},
  page: 0
}

function CandidatesCard(props) {
  const { activeClass, handleActiveCard, index, recruitmentId, candidate, page } = props;

  return (
    <Link
      to={
        page > 0 
        ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${page}&candidateId=${candidate.id}`
        : `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?candidateId=${candidate.id}`
      }
      className="candidates-card"
      onClick={() => handleActiveCard(index, candidate)}
    >
      <div className="candidates-card__left">
        <div className="candidates-card__left__img">
          <img src={Images.tw} alt="student-avatar" />
        </div>
        <div className="candidates-card__left__info">
          <LinesEllipsis
            text={`${candidate.first_name !== null ? candidate.first_name : ""} ${candidate.last_name}`}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__name"
          />
          {/* <span className="candidates-card__left__info__name">{candidate.first_name} {candidate.last_name}</span> */}
          <LinesEllipsis
            text={candidate.job_title}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__job-title"
          />
          {/* <span className="candidates-card__left__info__job-title">{candidate.job_title}</span> */}
          <div className="candidates-card__left__info__location">
            <GrIcons.GrLocation className="candidates-card__left__info__location__icon" />
            <LinesEllipsis
              text={candidate.address}
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
              className="candidates-card__left__info__location__name"
            />
            {/* <span className="candidates-card__left__info__location__name">{candidate.address}</span> */}
          </div>
        </div>
      </div>
      <div className={`candidates-card__right ${activeClass}`}>
        <TiIcons.TiWarning className="candidates-card__right__icon" />
      </div>
    </Link>
  );
}

export default CandidatesCard;