import PropTypes from 'prop-types';
import React from 'react';
import PopupUpdateStudentLanguages from '../../PopupUpdateStudentProfile/PopupUpdateStudentLanguages';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
import './StudentLanguages.scss';

StudentLanguagesCard.propTypes = {
  languages: PropTypes.array,
  onCreateLanguages: PropTypes.func,
  onEditLanguages: PropTypes.func
};

StudentLanguagesCard.defaultProps = {
  languages: [],
  onCreateLanguages: null,
  onEditLanguages: null
}

function StudentLanguagesCard(props) {
  const { languages, onCreateLanguages, onEditLanguages } = props;

  return (
    <div className="student-languages-card">
      <div className="student-languages-card__header">
        <span className="student-languages-card__header__title">
          Languages
        </span>
        {/* <AiIcons.AiOutlineEdit className="student-languages-card__header__icon" /> */}
        {languages.length <= 0 && <PopupUpdateStudentLanguages
          initialValues={{
            locales: ''
          }}
          onSubmit={onCreateLanguages}
          typeIcon="add"
        />}
      </div>
      <div className="student-languages-card__main">
        <div className="student-languages-card__main__info">
          {
            // helper.splitCommaString(
            //   "English, France, China, Japan",
            //   "student-languages-card__main__info__item"
            // )
            languages.length > 0
              ? languages.map((language, index) => {
                return <span
                  key={index}
                  className="student-languages-card__main__info__item"
                >{language.label}</span>
              })
              : <span>No Information Available.</span>
          }
        </div>
        {languages.length > 0 && <div className="student-languages-card__main__more">
          <StudentProfileMoreOptions
            typePopup="languages"
            initialValues={{
              locales: languages
            }}
            onSubmit={onEditLanguages}
          />
        </div>}
      </div>
    </div>
  );
}

export default StudentLanguagesCard;