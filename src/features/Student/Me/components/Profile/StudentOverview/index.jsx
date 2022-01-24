import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PopupUpdateStudentOverview from '../../PopupUpdateStudentProfile/PopupUpdateStudentOverview';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import './StudentOverview.scss';

StudentOverviewCard.propTypes = {
  overView: PropTypes.string
};

StudentOverviewCard.defaultProps = {
  overView: ''
}

function StudentOverviewCard(props) {
  const { overView } = props;
  // const [overview, setOverview] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const onTextChange = (values) => {
    console.log(values);
    setIsUpdating(false);
  }

  return (
    <div className="student-overview-card">
      <div className="student-overview-card__header">
        <span className="student-overview-card__header__title">
          Overview
        </span>
        {/* <AiIcons.AiOutlineEdit className="student-overview-card__header__icon" /> */}
        {
          overView === (null) &&
          <PopupUpdateStudentOverview
            label="Update Student Overview"
            initData={overView}
            onTextChange={onTextChange}
            isUpdating={isUpdating}
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
          <StudentProfileMoreOptions />
        </div>}
      </div>
    </div>
  );
}

export default StudentOverviewCard;