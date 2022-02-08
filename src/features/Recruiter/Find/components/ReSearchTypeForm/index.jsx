import React from 'react';
import PropTypes from 'prop-types';
import './ReSearchTypeForm.scss';
import CreatableSelect from 'react-select/creatable';
import { CAREER_OPTIONS, GENDER, LANGUAGE_OPTIONS, LOCATION_OPTIONS, SCHOOL_OPTIONS } from 'constants/global';

ReSearchTypeForm.propTypes = {
  handleChangeSelectValue: PropTypes.func,
  selectValue: PropTypes.object
};

ReSearchTypeForm.defaultProps = {
  handleChangeSelectValue: null,
  selectValue: {
    name: '',
    career: null,
    location: null,
    locales: null,
    gender: null,
    school: null,
  }
}

const colourStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: '.5rem',
    borderColor: 'var(--success)',
    boxShadow: state.isFocused && "0 0 0 3px rgba(0, 194, 0, 0.4)",
    "&:hover": {
      cursor: 'text'
    },
    "transition": state.isFocused && "all 0.15s ease-out",
    zIndex: "0"
  }),
}

function ReSearchTypeForm(props) {
  const {handleChangeSelectValue, selectValue} = props;

  const filterItems = [
    { id: 0, name: "career", title: "Career", value: selectValue.career, options: CAREER_OPTIONS, defaultValue: "All of Career" },
    { id: 1, name: "location", title: "Location", value: selectValue.location, options: LOCATION_OPTIONS, defaultValue: "All of Location" },
    { id: 2, name: "locales", title: "Language", value: selectValue.locales, options: LANGUAGE_OPTIONS, defaultValue: "All of Language" },
    { id: 3, name: "gender", title: "Gender", value: selectValue.gender, options: GENDER, defaultValue: "All of Gender" },
    { id: 3, name: "school", title: "Education", value: selectValue.school, options: SCHOOL_OPTIONS, defaultValue: "All of Education" },
  ]

  return (
    <div className="re-search-candidates">
      {
        filterItems.map((item, index) => {
          return <div
            className="re-search-candidates__select"
            key={index}
          >
            <span className="re-search-candidates__select__title">{item.title}</span>
            <CreatableSelect
              name={item.name}
              value={item.value}
              onChange={(e) => handleChangeSelectValue(e, item.name)}
              options={item.options}
              className="re-search-candidates__select__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={item.defaultValue}
              // isDisabled={selectValue.name.length <= 0}
            />
          </div>
        })
      }

    </div>
  );
}

export default ReSearchTypeForm;