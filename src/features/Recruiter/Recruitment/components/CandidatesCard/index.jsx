import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as TiIcons from 'react-icons/ti';
import LinesEllipsis from 'react-lines-ellipsis';
import './CandidatesCard.scss';

CandidatesCard.propTypes = {
  activeClass: PropTypes.string,
  handleActiveCard: PropTypes.func,
  index: PropTypes.number,
};

CandidatesCard.defaultProps = {
  activeClass: '',
  handleActiveCard: null,
  index: 0,
}

function CandidatesCard(props) {
  const {activeClass, handleActiveCard, index} = props;

  return (
    <div className="candidates-card" onClick={() => handleActiveCard(index)}>
      <div className="candidates-card__left">
        <div className="candidates-card__left__img">
          <img src={Images.tw} alt="student-avatar" />
        </div>
        <div className="candidates-card__left__info">
          <LinesEllipsis
            text={
              "Ho Van Khoi"
            }
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__name"
          />
          <LinesEllipsis
            text={
              "UX/UI Designer"
            }
            maxLine='1'
            ellipsis='...'
            trimRight
            basedOn='letters'
            className="candidates-card__left__info__job-title"
          />
          <div className="candidates-card__left__info__location">
            <GrIcons.GrLocation className="candidates-card__left__info__location__icon" />
            <LinesEllipsis
              text={
                "Danang, Vietnam"
              }
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
              className="candidates-card__left__info__location__name"
            />
          </div>
        </div>
      </div>
      <div className={`candidates-card__right ${activeClass}`}>
        <TiIcons.TiWarning className="candidates-card__right__icon" />
      </div>
    </div>
  );
}

export default CandidatesCard;