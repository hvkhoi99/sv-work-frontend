import Paths from 'constants/paths';
import PropTypes from 'prop-types';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as TiIcons from 'react-icons/ti';
import { Link } from 'react-router-dom';
import './CandidatesCard.scss';
import * as RiIcons from 'react-icons/ri';


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
  const { handleActiveCard, index, recruitmentId, candidate, page, isClosed } = props;

  console.log({ candidate })

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
          <span className="candidates-card__left__info__name">{candidate.first_name ?? ""} {candidate.last_name}</span>
          <span className="candidates-card__left__info__job-title">{candidate.job_title ?? "N/A"}</span>
          <div className="candidates-card__left__info__location">
            <GrIcons.GrLocation className="candidates-card__left__info__location__icon" />
            <span className="candidates-card__left__info__location__name">{candidate.address ?? "N/A"}</span>
          </div>
        </div>
      </div>
      <div
        className={
          `candidates-card__right ${candidate.application.state === null ? ""
            : (
              candidate.application.state
                ? "approved-candidate" : "rejected-candidate"
            )
          }`
        }
      >
        {
          candidate.application.state === null
            ? <TiIcons.TiWarning
              className={`candidates-card__right__icon`}
            />
            : (
              candidate.application.state
                ? <RiIcons.RiCheckboxCircleFill
                  className={`candidates-card__right__icon approved-candidate__icon`}
                />
                : <RiIcons.RiCloseCircleFill
                  className={`candidates-card__right__icon rejected-candidate__icon`}
                />
            )
        }

      </div>
    </Link>
  );
}

export default CandidatesCard;