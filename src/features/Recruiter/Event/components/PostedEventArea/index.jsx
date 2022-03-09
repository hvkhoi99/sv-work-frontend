import Paths from 'constants/paths';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import EventCard from '../EventCard';
// import PropTypes from 'prop-types';
import * as MdIcons from 'react-icons/md';
import queryString from 'query-string';
import EventCardSkeleton from '../EventCardSkeleton';
import userApi from 'api/userApi';
import * as RiIcons from 'react-icons/ri';
import './PostedEventArea.scss';

PostedEventArea.propTypes = {

};

function PostedEventArea(props) {
  const history = useHistory();
  // const user = useSelector((state) => state.user.current);
  const roleId = parseInt(localStorage.getItem('role_id'), 10);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { search } = useLocation();
  const page = parseInt(queryString.parse(search).page);
  const [currentPage, setCurrentPage] = useState(page > 1 ? page : 1);
  const [pageCount, setPageCount] = useState(0);
  const _limit = 6;

  const onViewDetailEvent = (event) => {
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/${event.id}`
        : `${Paths.clientEvent}/${event.id}`
    );
  }

  useEffect(() => {
    const fetchAvailableEvents = async () => {
      try {
        const params = {
          page: currentPage,
          _limit
        }

        const data = await userApi.getAvailableEvents(params);
        // console.log({ data })
        if (data.data.status === 1) {
          setEvents(data.data.data.data);
          const total = data.data.data.total;
          setPageCount(Math.ceil(total / _limit));
        }
        setIsLoading(false);
        return;
      } catch (error) {
        console.log("Cannot fetch events. Error: " + error.message);
        setIsLoading(false);
        return;
      }
    }

    fetchAvailableEvents();
  }, [currentPage]);

  const handlePageClick = async (data) => {
    const newPage = data.selected + 1;
    setCurrentPage(newPage);
    history.push(
      roleId === 2
        ? `${Paths.recruiterEvent}/available-event?page=${newPage}`
        : `${Paths.clientEvent}/available-event?page=${newPage}`
    )
    // helper.scrollToTop(350);
  };

  return (
    <div className="posted-event-area">
      {isLoading
        ? <div className="posted-event-area__skeleton-area">
          {
            [1, 2, 3].map((item, index) => {
              return <EventCardSkeleton key={index} />
            })
          }
        </div>
        : <div className="posted-event-area__container">
          {
            events.length > 0
              ? <>
                <div className="posted-event-area__container__main">
                  {
                    events.map((event, index) => {
                      return <div
                        key={index}
                        className="posted-event-area__container__main__item"
                      >
                        <EventCard
                          event={event}
                          onViewDetailEvent={onViewDetailEvent}
                        />
                      </div>
                    })
                  }
                </div>
                <div className="posted-event-area__container__paginator">
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
              </>
              : <div className="find-candidates__container__pagination__not-found__info">
              <RiIcons.RiErrorWarningFill
                className="find-candidates__container__pagination__not-found__info__icon"
              />
              <span>You have not created any events yet.</span>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default PostedEventArea;