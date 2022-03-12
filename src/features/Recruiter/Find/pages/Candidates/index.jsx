
import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import SkeletonCandidateCard from 'components/SkeletonCards/SkeletonCandidate';
import { SORT_OPTIONS_CANDIDATE } from 'constants/global';
import Images from 'constants/images';
import Paths from 'constants/paths';
// import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import * as CgIcons from 'react-icons/cg';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import helper from 'utils/common';
import CandidateFindCard from '../../components/CandidateFindCard';
import ReSearchTypeForm from '../../components/ReSearchTypeForm';
import SortByItem from '../../components/SortByItem';
import './FindCandidates.scss';

FindCadidatesPage.propTypes = {

};

function FindCadidatesPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const { name, career, location, language, gender, education } = queryString.parse(search);
  // const [isLoadingChild, setIsLoadingChild] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [inputValue, setInputValue] = useState(name !== undefined ? name : "");
  const [selectValue, setSelectValue] = useState({
    name: name !== undefined ? name : "",
    career: career !== undefined && career !== ""
      ? { value: career, label: career }
      : null,
    location: location !== undefined && location !== ""
      ? { value: location, label: location }
      : null,
    locales: language !== undefined && language !== ""
      ? { value: language, label: language }
      : null,
    gender: gender !== undefined && gender !== ""
      ? gender.toUpperCase() === "MALE"
        ? { value: 1, label: "Male" }
        : (
          gender.toUpperCase() === "FEMALE"
            ? { value: 0, label: "Female" }
            : ""
        )
      : null,
    school: education !== undefined && education !== ""
      ? { value: education, label: education }
      : null,
  })
  const [nameOfSearch, setNameOfSearch] = useState(selectValue.name);
  // const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0)
  const _limit = 10;

  useEffect(() => {
    setIsLoading(true);
    setIsSearching(true);
    helper.scrollToTop();
    const fetchCandidatesList = async () => {
      try {
        const params = {
          page: currentPage,
          _limit: _limit,

          name: selectValue.name,
          career: selectValue.career !== null ? selectValue.career.value : null,
          location: selectValue.location !== null ? selectValue.location.value : null,
          locales: selectValue.locales !== null ? selectValue.locales.value : null,
          gender: selectValue.gender !== null ? selectValue.gender.value : null,
          school: selectValue.school !== null ? selectValue.school.value : null,
        }

        const data = user.role_id === 2
          ? await recruiterApi.findCandidates(params)
          : await studentApi.findCandidates(params);
        if (data.data.status === 1) {
          setCandidates(data.data.data.data)
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
          setIsLoading(false);
          setIsSearching(false);
          return true;
        } else {
          setIsLoading(false);
          return false;
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Cannot fetch candidates. Error: " + error.message);
        return false;
      }
    };

    fetchCandidatesList();
  }, [user.role_id, currentPage, selectValue]);

  const handlePageClick = (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(`${Paths.recruiterFindCandidates}?page=${newPage}`);
    helper.scrollToTop(350);
  }

  const onViewCandidate = (candidateId) => {
    history.push(`${Paths.recruiterCandidate}/${candidateId}`);
  };

  const handleChangeInputName = (e) => {
    isSearched && setIsSearched(false);
    setInputValue(e.target.value);
  }

  const handleSearchCandidateName = (e) => {
    e.preventDefault();
    setNameOfSearch(inputValue);
    setIsSearched(true);
    setSelectValue(state => ({
      ...state,
      name: inputValue
    }));
    findCandidates(
      inputValue,
      selectValue.career,
      selectValue.location,
      selectValue.locales,
      selectValue.gender,
      selectValue.school
    );
  }

  const findCandidates = (name, career, location, locales, gender, school) => {
    // helper.scrollToTop();
    // setIsLoadingChild(true);
    // try {
    const params = {
      // page: 1, _limit: _limit,
      name,
      career: career === null ? "" : career.value,
      location: location === null ? "" : location.value,
      locales: locales === null ? "" : locales.value,
      gender: gender === null ? "" : gender.label,
      school: school === null ? "" : school.value
    }

    history.push(
      `${Paths.recruiterFindCandidates}?name=${params.name}&career=${params.career}&location=${params.location}&language=${params.locales}&gender=${params.gender}&education=${params.school}`
    );
    //   const data = user.role_id === 2
    //     ? await recruiterApi.findCandidates(params)
    //     : await studentApi.findCandidates(params);
    //   if (data.data.status === 1) {
    //     setCandidates(data.data.data.data)
    //     const total = data.data.data.total;
    //     setPageCount(Math.ceil(total / _limit));
    //     setIsLoadingChild(false);
    //     return true;
    //   } else {
    //     setIsLoadingChild(false);
    //     return false;
    //   }
    // } catch (error) {
    //   setIsLoadingChild(false);
    //   console.log("Cannot find candidate. Error: " + error.message);
    //   enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    //   return false;
    // }
  }

  const handleChangeSelectValue = async (selectedOption, type) => {
    setSelectValue(state => ({
      ...state,
      [type]: selectedOption
    }));
    // if ((selectValue.name.length > 0) && isSearched) {
    switch (type) {
      case "career":
        await findCandidates(
          selectValue.name,
          selectedOption,
          selectValue.location,
          selectValue.locales,
          selectValue.gender,
          selectValue.school
        );
        break;
      case "location":
        await findCandidates(
          selectValue.name,
          selectValue.career,
          selectedOption,
          selectValue.locales,
          selectValue.gender,
          selectValue.school
        );
        break;
      case "locales":
        await findCandidates(
          selectValue.name,
          selectValue.career,
          selectValue.location,
          selectedOption,
          selectValue.gender,
          selectValue.school
        );
        break;
      case "gender":
        await findCandidates(
          selectValue.name,
          selectValue.career,
          selectValue.location,
          selectValue.locales,
          selectedOption,
          selectValue.school
        );
        break;
      case "school":
        await findCandidates(
          selectValue.name,
          selectValue.career,
          selectValue.location,
          selectValue.locales,
          selectValue.gender,
          selectedOption
        );
        break;
      default:
        break;
    }
    // }
  }

  // users.sort((a, b) => a.name.localeCompare(b.name))
  const onSortCandidates = async (option) => {
    switch (option.value) {
      case "":
        const newDefaultCandidates = [...candidates];
        newDefaultCandidates.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
        setCandidates(newDefaultCandidates);
        // console.log(option.label, {newDefaultCandidates});
        break;
      case "date":
        const newNewestCandidates = [...candidates];
        newNewestCandidates.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
        setCandidates(newNewestCandidates);
        // console.log(option.label, {newNewestCandidates});
        break;
      case "-date":
        const newLastestCandidates = [...candidates];
        newLastestCandidates.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
        setCandidates(newLastestCandidates);
        // console.log(option.label, {newLastestCandidates});
        break;
      case "name":
        const newNameAZCandidates = [...candidates];
        newNameAZCandidates.sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase()) ? 1 : -1);
        setCandidates(newNameAZCandidates);
        // console.log(option.label, {newNameAZCandidates});
        break;
      case "-name":
        const newNameZACandidates = [...candidates];
        newNameZACandidates.sort((a, b) => (a.last_name.toUpperCase() < b.last_name.toUpperCase()) ? 1 : -1);
        setCandidates(newNameZACandidates);
        // console.log(option.label, {newNameZACandidates});
        break;
      default:
        break;
    }
  }

  return (
    <>
      {
        // isLoading
        //   ? <div className="loading-ui">
        //     <LoadingUI />
        //   </div>
        //   : 
        <div className="find-candidates">
          <div className="find-candidates__container">
            <div className="find-candidates__container__above">
              <div className="find-candidates__container__above__search">
                <input
                  type="text"
                  placeholder="Name..."
                  value={inputValue}
                  onChange={(e) => handleChangeInputName(e)}
                />
                <Link
                  to="#"
                  className="find-candidates__container__above__search__button"
                  onClick={handleSearchCandidateName}
                >
                  {
                    // isSearching
                    //   ? <span className="spinner-border spinner-border-lg" />
                    //   : 
                    (isSearched
                      ? <CgIcons.CgSearchFound className="search-icon" />
                      : <RiIcons.RiSearchLine className="search-icon" />)
                  }
                </Link>
              </div>
              <div className="find-candidates__container__above__search-type">
                <ReSearchTypeForm
                  selectValue={selectValue}
                  handleChangeSelectValue={handleChangeSelectValue}
                />
              </div>
              <div className="find-candidates__container__above__sort">
                <SortByItem
                  candidatesLength={`${candidates.length}`}
                  options={SORT_OPTIONS_CANDIDATE}
                  name={nameOfSearch}
                  isSearching={isSearching}
                  isLoadingChild={isLoading}
                  onSortCandidates={onSortCandidates}
                />
              </div>
            </div>
            {
              isLoading
                ? <div className="find-candidates-skeleton-area" style={{ margin: '5rem 0' }}>
                  {/* <LoadingChildUI /> */}
                  <SkeletonCandidateCard />
                  <SkeletonCandidateCard />
                  <SkeletonCandidateCard />
                  <SkeletonCandidateCard />
                </div>
                : <>
                  <div className="find-candidates__container__below">
                    {
                      candidates.map((candidate, index) => {
                        return <CandidateFindCard
                          key={index}
                          candidate={candidate}
                          onViewCandidate={onViewCandidate}
                        />
                      })
                    }
                  </div>
                  <div className="find-candidates__container__pagination">
                    {
                      candidates.length > 0
                        ? <ReactPaginate
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
                          marginPagesDisplayed={3}
                          pageRangeDisplayed={3}
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
                        : <div className="find-candidates__container__pagination__not-found">
                          <img src={Images.notfoundcandidate} alt="not-found-candidate" />
                          <div className="find-candidates__container__pagination__not-found__info">
                            <RiIcons.RiErrorWarningFill
                              className="find-candidates__container__pagination__not-found__info__icon"
                            />
                            <span>No matching results were found.</span>
                          </div>
                        </div>
                    }
                  </div>
                </>
            }
          </div>
        </div>
      }
    </>
  );
}

export default FindCadidatesPage;