import Paths from 'constants/paths';
import SortByItem from 'features/Recruiter/Find/components/SortByItem';
import React, { useEffect, useState } from 'react';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import helper from 'utils/common';
import EventCard from '../../components/EventCard';
import EventCardSkeleton from '../../components/EventCardSkeleton';
import SearchFormEvent from '../../components/SearchFormEvent';
// import PropTypes from 'prop-types';
import './SearchEvent.scss';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import userApi from 'api/userApi';
import * as RiIcons from 'react-icons/ri';
import Images from 'constants/images';
import { SORT_OPTIONS_CANDIDATE } from 'constants/global';

SearchEventPage.propTypes = {

};

function SearchEventPage(props) {
  const history = useHistory();
  // const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const _limit = 8;

  const { event, location, when } = queryString.parse(search);

  useEffect(() => {
    helper.scrollToTop();
    setIsLoading(true);

    const fectchSearchingResults = async () => {
      try {
        const params = {
          event: event !== undefined ? event : "",
          location: location !== undefined ? location : "",
          start: when !== 'undefined' ? when : "",
          page: currentPage,
          _limit
        }
        const data = await userApi.findEvent(params);
        console.log({ data })
        if (data.data.status === 1) {
          setEvents(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        }
        setIsLoading(false);
        return;
      } catch (error) {
        setIsLoading(false);
        console.log("Cannot fetch candidates. Error: " + error.message);
        return;
      }
    }

    fectchSearchingResults();
  }, [event, location, when, currentPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    const params = {
      event: event !== undefined ? event : "",
      location: location !== undefined ? location : "",
      when: when !== undefined ? when : "",
    }

    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/search?page=${newPage}&event=${params.event}&location=${params.location}&when=${params.when}`
        : `${Paths.clientEvent}/search?page=${newPage}&event=${params.event}&location=${params.location}&when=${params.when}`
    );
    // helper.scrollToTop(500);
  };

  const onViewDetailEvent = (event) => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/${event.id}`
        : `${Paths.clientEvent}/${event.id}`
    );
  }

  const handleSearchCandidateName = (data) => {
    const params = {
      event: data.event,
      location: data.location,
      when: data.when !== undefined ? data.when : ""
    }

    setCurrentPage(1);

    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/search?page=${1}&event=${params.event}&location=${params.location}&when=${params.when}`
        : `${Paths.clientEvent}/search?page=${1}&event=${params.event}&location=${params.location}&when=${params.when}`
    );

  }
  
  const onSortCandidates = async (option) => {
    switch (option.value) {
      case "":
        const newDefaultCandidates = [...events];
        newDefaultCandidates.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
        setEvents(newDefaultCandidates);
        // console.log(option.label, {newDefaultCandidates});
        break;
      case "date":
        const newNewestCandidates = [...events];
        newNewestCandidates.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
        setEvents(newNewestCandidates);
        // console.log(option.label, {newNewestCandidates});
        break;
      case "-date":
        const newLastestCandidates = [...events];
        newLastestCandidates.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1);
        setEvents(newLastestCandidates);
        // console.log(option.label, {newLastestCandidates});
        break;
      case "name":
        const newNameAZCandidates = [...events];
        newNameAZCandidates.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1);
        setEvents(newNameAZCandidates);
        // console.log(option.label, {newNameAZCandidates});
        break;
      case "-name":
        const newNameZACandidates = [...events];
        newNameZACandidates.sort((a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1);
        setEvents(newNameZACandidates);
        // console.log(option.label, {newNameZACandidates});
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="search-event">
        <div className="search-event__container">
          <div className="search-event__container__search-bar">
            <SearchFormEvent
              event={event}
              location={location}
              when={when}
              onSubmit={handleSearchCandidateName}
            />
          </div>
          <div className="search-event__container__sort-bar">
            <SortByItem
              candidatesLength={`${events.length}`}
              options={SORT_OPTIONS_CANDIDATE}
              name={event}
              isSearching={isLoading}
              isLoadingChild={isLoading}
              onSortCandidates={onSortCandidates}
            />
          </div>
          <div className="search-event__container__events">
            <div className="search-event__container__events__title">
              <span>
                Results
              </span>
            </div>
            {
              isLoading
                ? <div className="search-event__container__events__main-skeleton">
                  {
                    [1, 2, 3, 4].map((item, index) => {
                      return <EventCardSkeleton key={index} />
                    })
                  }
                </div>
                : (
                  events.length > 0
                    ? <div className="search-event__container__events__main">
                      {
                        events.map((event, index) => {
                          return <div
                            key={index}
                            className="search-event__container__events__main__item"
                          >
                            <EventCard
                              event={event}
                              onViewDetailEvent={onViewDetailEvent}
                            />
                          </div>
                        })
                      }
                    </div>
                    // : <div className="search-event__container__events__main">
                    //   {
                    //     [1, 2, 3, 4].map((item, index) => {
                    //       return <EventCardSkeleton key={index} />
                    //     })
                    //   }
                    // </div>
                    : <div className="find-candidates__container__pagination__not-found">
                      <img src={Images.notfoundcandidate} alt="not-found-candidate" />
                      <div className="find-candidates__container__pagination__not-found__info">
                        <RiIcons.RiErrorWarningFill
                          className="find-candidates__container__pagination__not-found__info__icon"
                        />
                        <span>No matching results were found.</span>
                      </div>
                    </div>
                )
            }
          </div>
          {!isLoading && events.length > 0 && <div className="search-event__container__paginator">
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
            // renderOnZeroPageCount={null}
            />
          </div>}
        </div>
      </div>

    </>
  );
}

export default SearchEventPage;