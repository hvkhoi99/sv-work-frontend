import PopupConfirm from 'components/PopupConfirm';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as GrIcons from 'react-icons/gr';
import ReactTimeAgo from 'react-time-ago';
import HashTagCard from '../HashTagCard';

ClosedRecruitmentsCard.propTypes = {
  reruitment: PropTypes.object,
  onViewRecruitment: PropTypes.func,
  onDelete: PropTypes.func,
  isDeleting: PropTypes.bool,
};

ClosedRecruitmentsCard.defaultProps = {
  recruitment: '',
  onViewRecruitment: null,
  onDelete: null,
  isDeleting: false,
}

function ClosedRecruitmentsCard(props) {
  const { recruitment, onViewRecruitment, onDelete} = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [showw, setShoww] = useState(false);

  const handleViewRecruitment = (recruitment) => {
    return onViewRecruitment(recruitment);
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(recruitment);
    setIsDeleting(false);
  }

  const onShoww = (value) => {
    setShoww(value);
  }

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
          <button
            type="button"
            className="btn btn-success btn-sm view"
            onClick={() => handleViewRecruitment(recruitment)}
          >View</button>
          <button
            type="button"
            className="btn btn-danger btn-sm delete"
            onClick={() => onShoww(true)}
            disabled={isDeleting}
          >
            {isDeleting && <span className="spinner-border spinner-border-sm mr-2" />}
            {isDeleting ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
      <PopupConfirm
        show={showw}
        onShow={onShoww}
        btnOKColor={
          "danger"
        }
        titleConfirm={
          "Delete Recruitment"
        }
        contentConfirm={
          "Are you sure you want to delete this recruitment?"
        }
        onOK={handleDelete}
      />
    </div>
  );
}

export default ClosedRecruitmentsCard;