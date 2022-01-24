import React from 'react';
import helper from 'utils/common';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
// import PropTypes from 'prop-types';
import './StudentLanguages.scss';
import PopupUpdateStudentLanguages from '../../PopupUpdateStudentProfile/PopupUpdateStudentLanguages';

StudentLanguagesCard.propTypes = {

};

function StudentLanguagesCard(props) {
  return (
    <div className="student-languages-card">
      <div className="student-languages-card__header">
        <span className="student-languages-card__header__title">
          Languages
        </span>
        {/* <AiIcons.AiOutlineEdit className="student-languages-card__header__icon" /> */}
        <PopupUpdateStudentLanguages />
      </div>
      <div className="student-languages-card__main">
        <div className="student-languages-card__main__info">
          {
            helper.splitCommaString(
              "English, France, China, Japan",
              "student-languages-card__main__info__item"
            )
          }
        </div>
        <div className="student-languages-card__main__more">
          <StudentProfileMoreOptions />
        </div>
      </div>
    </div>
  );
}

export default StudentLanguagesCard;