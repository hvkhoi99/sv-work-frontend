import { GENDER } from 'constants/global';
import SortByItem from 'features/Recruiter/Find/components/SortByItem';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select';
import JobTagsMainCard from '../../components/JobTagsMainCard';
import StudentSearchBar from '../../components/StudentSearchBar';
import './FindJobs.scss';


FindJobsPage.propTypes = {

};

const colourStyles = {
  // placeholder: (defaultStyles) => {
  //   return {
  //     ...defaultStyles,
  //     color: 'lightgrey',
  //   }
  // },
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

function FindJobsPage(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [careerValue, setCareerValue] = useState(null);
  const [typeOfJobValue, setTypeOfJobValue] = useState(null);
  const [salaryValue, setSalaryValue] = useState(null);
  const [extraValue, setExtraValue] = useState(null);

  const filterItems = [
    { id: 0, name: "career", value: careerValue, options: GENDER , defaultValue: "All of Career"},
    { id: 1, name: "typeOfJob", value: typeOfJobValue, options: GENDER, defaultValue: "All of Type of Job"},
    { id: 2, name: "salary", value: salaryValue, options: GENDER, defaultValue: "All of Salary"},
    { id: 3, name: "extra", value: extraValue, options: GENDER, defaultValue: "Extra" }
  ]

  const jobTags = [
    { id: 0, name: '#Java' },
    { id: 1, name: '#Tester' },
    { id: 2, name: '#BigData' },
    { id: 3, name: '#UX/UI' },
    { id: 4, name: '#HTML/CSS' },
    { id: 5, name: '#PHP' },
  ];

  const onSubmit = (values) => {
    console.log({ values })
  }

  const onActiveClass = (index) => {
    return setActiveIndex(index);
  }

  const handleChangeSelectValue = (selectedOption, type) => {
    switch (type) {
      case "career":
        setCareerValue(selectedOption);
        break;
      case "typeOfJob":
        setTypeOfJobValue(selectedOption);
        break;
      case "salary":
        setSalaryValue(selectedOption);
        break;
      case "extra":
        setExtraValue(selectedOption);
        break;
      default:
        break;
    }
  }


  return (
    <div className="find-jobs">
      <div className="find-jobs__container">
        <div className="find-jobs__container__search-bar">
          <StudentSearchBar
            onSubmit={onSubmit}
          />
        </div>
        <div className="find-jobs__container__job-tags">
          <JobTagsMainCard
            jobTags={jobTags}
            onActiveClass={onActiveClass}
            activeIndex={activeIndex}
          />
        </div>
        <div className="find-jobs__container__sort-bar">
          <SortByItem />
        </div>
        <div className="find-jobs__container__filter-area">
          {
            filterItems.map((item, index) => {
              return <CreatableSelect
                key={index}
                value={item.value}
                onChange={(data) => handleChangeSelectValue(data, item.name)}
                options={item.options}
                className="find-jobs__container__filter-area__select"
                styles={colourStyles}
                isClearable={true}
                placeholder={item.defaultValue}
              />
            })
          }

        </div>
      </div>
    </div>
  );
}

export default FindJobsPage;