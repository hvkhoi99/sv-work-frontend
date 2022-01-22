import React from 'react';
import * as IoIcons from 'react-icons/io';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';

StudentEducationsItemCard.propTypes = {

};

function StudentEducationsItemCard(props) {
  return (
    <div className="student-educations-item-card">
      <div className="student-educations-item-card__main">
        <div className="student-educations-item-card__main__school">
          <IoIcons.IoMdSchool className="student-educations-item-card__main__school__icon" />
        </div>
        <div className="student-educations-item-card__main__info">
          <span className="student-educations-item-card__main__info__title">
            Bach Khoa University
          </span>
          <span className="student-educations-item-card__main__info__date">
            8/2017 - 03/2022
          </span>
          <span className="student-educations-item-card__main__info__major">
            Major: Information Technology
          </span>
          <div className="student-educations-item-card__main__info__achievement">
            Achievement: Good - GPA 8.0
          </div>
        </div>
      </div>
      <div className="student-educations-item-card__more">
        <StudentProfileMoreOptions />
      </div>
    </div>
  );
}

export default StudentEducationsItemCard;