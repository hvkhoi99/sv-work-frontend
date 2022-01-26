import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PopupUpdateStudentOverview from '../../PopupUpdateStudentProfile/PopupUpdateStudentOverview';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import './StudentOverview.scss';

StudentOverviewCard.propTypes = {
  overView: PropTypes.string,
  updateStudentOverview: PropTypes.func,
  isOverviewUpdating: PropTypes.bool,
};

StudentOverviewCard.defaultProps = {
  overView: '',
  updateStudentOverview: null,
  isOverviewUpdating: false
}

function StudentOverviewCard(props) {
  const { overView, updateStudentOverview, isOverviewUpdating } = props;

  const onTextChange = (values) => {
    updateStudentOverview(values);
  }

  console.log({isOverviewUpdating});

  return (
    <div className="student-overview-card">
      <div className="student-overview-card__header">
        <span className="student-overview-card__header__title">
          Overview
        </span>
        {
          overView === (null) &&
          <PopupUpdateStudentOverview
            label="Update Student Overview"
            initData={''}
            onTextChange={onTextChange}
            isUpdating={isOverviewUpdating}
            typeIcon={"add"}
          />
        }
      </div>
      <div className="student-overview-card__main">
        <div className="student-overview-card__main__description">
          {
            overView === (null && "")
              ? <span>No Information Available.</span>
              : ReactHtmlParser(overView)
          }
        </div>
        {overView !== (null && "") && <div className="student-overview-card__main__more">
          <StudentProfileMoreOptions 
            typePopup="overview"
            label="Update Student Overview"
            initData={overView === null ? "" : overView}
            onTextChange={onTextChange}
            isUpdating={isOverviewUpdating}
          />
        </div>}
      </div>
    </div>
  );
}

export default StudentOverviewCard;