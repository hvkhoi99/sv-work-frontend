import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as TiIcons from 'react-icons/ti';
import { Link } from 'react-router-dom';
import './CandidatesCard.scss';


CandidatesCard.propTypes = {
  activeClass: PropTypes.string,
  handleActiveCard: PropTypes.func,
  index: PropTypes.number,
  recruitmentId: PropTypes.string,
  candidate: PropTypes.object,
  page: PropTypes.number,
  isClosed: PropTypes.bool,
};

CandidatesCard.defaultProps = {
  activeClass: '',
  handleActiveCard: null,
  index: 0,
  recruitmentId: '',
  candidate: {},
  page: 0,
  isClosed: false,
}

function CandidatesCard(props) {
  const { activeClass, handleActiveCard, index, recruitmentId, candidate, page, isClosed } = props;

  return (
    <Link
      to={
        page > 0 
        ? (
          !isClosed
          ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?page=${page}&candidateId=${candidate.id}`
          : `${Paths.recruiterDashboard}/closed-recruitments/${recruitmentId}/list-candidates?page=${page}&candidateId=${candidate.id}`
        )
        : (
          !isClosed
          ? `${Paths.recruiterDashboard}/available-jobs/${recruitmentId}/list-candidates?candidateId=${candidate.id}`
          : `${Paths.recruiterDashboard}/closed-recruitments/${recruitmentId}/list-candidates?candidateId=${candidate.id}`
        ) 
      }
      className="candidates-card"
      onClick={() => handleActiveCard(index, candidate)}
    >
      <div className="candidates-card__left">
        <div className="candidates-card__left__img">
          <img src={candidate.avatar_link} alt="student-avatar" />
        </div>
        <div className="candidates-card__left__info">
          {/* <LinesEllipsis
            text={`${candidate.first_name !== null ? candidate.first_name : ""} ${candidate.last_name}`}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__name"
          /> */}
          <span className="candidates-card__left__info__name">{candidate.first_name ?? ""} {candidate.last_name}</span>
          {/* <LinesEllipsis
            text={candidate.job_title}
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__job-title"
          /> */}
          <span className="candidates-card__left__info__job-title">{candidate.job_title ?? "N/A"}</span>
          <div className="candidates-card__left__info__location">
            <GrIcons.GrLocation className="candidates-card__left__info__location__icon" />
            {/* <LinesEllipsis
              text={candidate.address}
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
              className="candidates-card__left__info__location__name"
            /> */}
            <span className="candidates-card__left__info__location__name">{candidate.address ?? "N/A"}</span>
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