import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './ReSearchTypeForm.scss';
import CreatableSelect from 'react-select/creatable';
import { CAREER_OPTIONS, GENDER, LANGUAGE_OPTIONS, LOCATION_OPTIONS, SCHOOL_OPTIONS } from 'constants/global';

ReSearchTypeForm.propTypes = {

};

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
  const [selectValue, setSelectValue] = useState({
    career: null,
    location: null,
    locales: null,
    gender: null,
    school: null,
  })

  const filterItems = [
    { id: 0, name: "career", title: "Career", value: selectValue.career, options: CAREER_OPTIONS, defaultValue: "All of Career" },
    { id: 1, name: "location", title: "Location", value: selectValue.location, options: LOCATION_OPTIONS, defaultValue: "All of Location" },
    { id: 2, name: "locales", title: "Language", value: selectValue.locales, options: LANGUAGE_OPTIONS, defaultValue: "All of Language" },
    { id: 3, name: "gender", title: "Gender", value: selectValue.gender, options: GENDER, defaultValue: "All of Gender" },
    { id: 3, name: "school", title: "Education", value: selectValue.school, options: SCHOOL_OPTIONS, defaultValue: "All of Education" },
  ]

  const handleChangeSelectValue = (selectedOption, type) => {
    switch (type) {
      case "career":
        setSelectValue(state => ({
          ...state,
          career: selectedOption
        }));
        break;
      case "location":
        setSelectValue(state => ({
          ...state,
          location: selectedOption
        }));
        break;
      case "locales":
        setSelectValue(state => ({
          ...state,
          locales: selectedOption
        }));
        break;
      case "gender":
        setSelectValue(state => ({
          ...state,
          gender: selectedOption
        }));
        break;
      case "school":
        setSelectValue(state => ({
          ...state,
          school: selectedOption
        }));
        break;
      default:
        break;
    }
  }

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
              onChange={(data) => handleChangeSelectValue(data, item.name)}
              options={item.options}
              className="re-search-candidates__select__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={item.defaultValue}
            />
          </div>
        })
      }

    </div>
  );
}

export default ReSearchTypeForm;