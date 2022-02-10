import LoadingChildUI from 'components/LoadingChild';
import { CAREER_OPTIONS, CLOSED_OPTIONS, EXTRA_OPTIONS, JOB_TYPE_OPTIONS, SALARY_OPTIONS, SORT_JOBS_OPTIONS } from 'constants/global';
import Paths from 'constants/paths';
import SortByItem from 'features/Recruiter/Find/components/SortByItem';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import helper from 'utils/common';
import JobTagsMainCard from '../../components/JobTagsMainCard';
import MainEmployersArea from '../../components/MainEmployersArea';
import MainJobsArea from '../../components/MainJobsArea';
import SliderSelect from '../../components/SliderSelect';
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
  // const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const { search } = useLocation();
  const { keyword, location, career, type, salary, closed, extra } = queryString.parse(search);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [initValue, setInitValue] = useState({
    keyword: keyword !== undefined ? keyword : "",
    location: location !== undefined ? location : "",
    career: career !== undefined && career !== ""
      ? { value: career, label: career }
      : null,
    type: type !== undefined && type !== ""
      ? type.toUpperCase() === "FULLTIME"
        ? { value: true, label: "Full Time" }
        : (
          type.toUpperCase() === "PARTTIME"
            ? { value: false, label: "Part Time" }
            : ""
        )
      : null,
    closed: closed !== undefined && closed !== ""
      ? closed.toUpperCase() === "CLOSED"
        ? { value: true, label: "Closed" }
        : (
          closed.toUpperCase() === "RECRUITING"
            ? { value: false, label: "Recruiting" }
            : ""
        )
      : null,
    salary: salary !== undefined ? salary : "",
    extra: extra !== undefined && extra !== ""
      ? { value: extra, label: extra }
      : null,
  })

  const filterItems = [
    { id: 0, name: "career", value: initValue.career, options: CAREER_OPTIONS, defaultValue: "All of Career" },
    { id: 1, name: "type", value: initValue.type, options: JOB_TYPE_OPTIONS, defaultValue: "All of Type of Job" },
    { id: 2, name: "salary", value: initValue.salary, options: SALARY_OPTIONS, defaultValue: "All of Salary" },
    { id: 3, name: "closed", value: initValue.closed, options: CLOSED_OPTIONS, defaultValue: "All of Status" },
    { id: 4, name: "extra", value: initValue.extra, options: EXTRA_OPTIONS, defaultValue: "Extra" }
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
    setIsLoading(true);
    helper.scrollToTop();

    const timer = setTimeout(() => {
      // setCurrentPage(1);
      // const total = items.length;
      // setPageCount(Math.ceil(total / 2));
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  // const handlePageClick = () => {
  //   console.log("prev/next page");
  // }

  const onSubmit = (values) => {
    console.log({ values })
    setInitValue(state => ({
      ...state,
      keyword: values.keyword,
      location: values.location
    }));
    findKeyword(
      values.keyword,
      values.location,
      initValue.career,
      initValue.type,
      initValue.salary,
      initValue.closed,
      initValue.extra
    );
  }

  const onActiveClass = (index) => {
    return setActiveIndex(index);
  }

  const findKeyword = (keyword, location, career, type, salary, closed, extra) => {
    const params = {
      keyword,
      location,
      career: career === null ? "" : career.value,
      type: type === null ? "" : type.label,
      salary,
      closed: closed === null ? "" : closed.label,
      extra: extra === null ? "" : extra.value
    }

    history.push(
      `${Paths.clientFindJobs}?keyword=${params.keyword}&location=${params.location}&career=${params.career}&type=${params.type}&salary=${params.salary}&closed=${params.closed}&extra=${params.extra}`
    );
  }

  const handleChangeSelectValue = (selectedOption, type) => {
    setInitValue(state => ({
      ...state,
      [type]: selectedOption
    }))
    switch (type) {
      case "career":
        findKeyword(
          initValue.keyword,
          initValue.location,
          selectedOption,
          initValue.type,
          initValue.salary,
          initValue.closed,
          initValue.extra
        );
        break;
      case "type":
        findKeyword(
          initValue.keyword,
          initValue.location,
          initValue.career,
          selectedOption,
          initValue.salary,
          initValue.closed,
          initValue.extra
        );
        break;
      case "salary":
        findKeyword(
          initValue.keyword,
          initValue.location,
          initValue.career,
          initValue.type,
          selectedOption,
          initValue.closed,
          initValue.extra
        );
        break;
      case "closed":
        findKeyword(
          initValue.keyword,
          initValue.location,
          initValue.career,
          initValue.type,
          initValue.salary,
          selectedOption,
          initValue.extra
        );
        break;
      case "extra":
        findKeyword(
          initValue.keyword,
          initValue.location,
          initValue.career,
          initValue.type,
          initValue.salary,
          initValue.closed,
          selectedOption
        );
        break;
      default:
        break;
    }
  }

  const onSortCandidates = async (option) => {
    console.log({ option });
  }

  return (
    <>
      <div className="find-jobs">
        <div className="find-jobs__container">
          <div className="find-jobs__container__search-bar">
            <StudentSearchBar
              initialValues={initValue}
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
            <SortByItem
              // candidatesLength={candidates.length}
              // name={nameOfSearch}
              // isSearching={isSearching}
              // isLoadingChild={isLoading}
              options={SORT_JOBS_OPTIONS}
              onSortCandidates={onSortCandidates}
            />
          </div>
          <div className="find-jobs__container__filter-area">
            {/* {
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
                } */}
            <CreatableSelect
              value={filterItems[0].value}
              onChange={(data) => handleChangeSelectValue(data, filterItems[0].name)}
              options={filterItems[0].options}
              className="find-jobs__container__filter-area__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={filterItems[0].defaultValue}
            />
            <CreatableSelect
              value={filterItems[1].value}
              onChange={(data) => handleChangeSelectValue(data, filterItems[1].name)}
              options={filterItems[1].options}
              className="find-jobs__container__filter-area__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={filterItems[1].defaultValue}
            />
            <SliderSelect
              title={filterItems[2].value}
              placeholder="All of Salary"
              onChangeSalary={handleChangeSelectValue}
            />
            <Select
              value={filterItems[3].value}
              onChange={(data) => handleChangeSelectValue(data, filterItems[3].name)}
              options={filterItems[3].options}
              className="find-jobs__container__filter-area__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={filterItems[3].defaultValue}
            />
            <CreatableSelect
              value={filterItems[4].value}
              onChange={(data) => handleChangeSelectValue(data, filterItems[4].name)}
              options={filterItems[4].options}
              className="find-jobs__container__filter-area__select"
              styles={colourStyles}
              isClearable={true}
              placeholder={filterItems[4].defaultValue}
            />
          </div>
          <span className="find-jobs__container__title">
            All "keyword" Results
          </span>
          {
            isLoading
              ? <div className="loading-child-ui">
                <LoadingChildUI />
              </div>
              : <>
                <div className="find-jobs__container__main-jobs">
                  <MainJobsArea />
                </div>
                <div className="find-jobs__container__main-employers">
                  <MainEmployersArea />
                </div>
              </>
          }

          {/* <div className="find-jobs__container__pagination">
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
              </div> */}
        </div>
      </div>

    </>
  );
}

export default FindJobsPage;