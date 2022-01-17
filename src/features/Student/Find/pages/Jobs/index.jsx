import LoadingUI from 'components/Loading';
import { GENDER } from 'constants/global';
import SortByItem from 'features/Recruiter/Find/components/SortByItem';
import RecruitmentCard from 'features/Recruiter/Me/components/RecruitmentCard';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import helper from 'utils/common';
// import Select from 'react-select';
import JobTagsMainCard from '../../components/JobTagsMainCard';
import StudentSearchBar from '../../components/StudentSearchBar';
import './FindJobs.scss';


FindJobsPage.propTypes = {

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

function FindJobsPage(props) {
  // const history = useHistory();
  // const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const [careerValue, setCareerValue] = useState(null);
  const [typeOfJobValue, setTypeOfJobValue] = useState(null);
  const [salaryValue, setSalaryValue] = useState(null);
  const [extraValue, setExtraValue] = useState(null);

  const filterItems = [
    { id: 0, name: "career", value: careerValue, options: GENDER, defaultValue: "All of Career" },
    { id: 1, name: "typeOfJob", value: typeOfJobValue, options: GENDER, defaultValue: "All of Type of Job" },
    { id: 2, name: "salary", value: salaryValue, options: GENDER, defaultValue: "All of Salary" },
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

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setCurrentPage(1);
      const total = items.length;
      setPageCount(Math.ceil(total / 2));
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [items.length]);

  const handlePageClick = () => {
    console.log("prev/next page");
  }

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
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <div className="find-jobs">
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
              <div className="find-jobs__container__main-jobs">
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
                <div className="find-jobs__container__main-jobs__item">
                  <RecruitmentCard />
                </div>
              </div>
              <div className="find-jobs__container__pagination">
                <ReactPaginate
                  previousLabel={
                    <MdIcons.MdArrowBackIosNew />
                  }
                  nextLabel={
                    <MdIcons.MdArrowForwardIos />
                  }

                  // initialPage={1}
                  // initialPage={currentPage}
                  forcePage={currentPage - 1}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={pageCount === 0 ? "page-item disabled" : "page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default FindJobsPage;