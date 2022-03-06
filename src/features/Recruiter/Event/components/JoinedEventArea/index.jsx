import React, { useEffect, useState } from 'react';
import Paths from 'constants/paths';
import LoadingChildUI from 'components/LoadingChild';
import * as MdIcons from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import EventCard from '../EventCard';
// import PropTypes from 'prop-types';
import './JoinedEventArea.scss';

JoinedEventArea.propTypes = {

};

function JoinedEventArea(props) {
  const items = [1, 2, 3, 4, 5, 6];
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const onViewDetailEvent = () => {
    history.push(`${Paths.clientEvent}/dashboard/posted-event/1`)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      const total = items.length;
      setPageCount(Math.ceil(total / 4));
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [items.length]);

  const handlePageClick = () => {
    console.log("prev/next page");
  }

  return (
    <div className="joined-event-area">
      {isLoading
        ? <div className="loading-child-ui">
          <LoadingChildUI />
        </div>
        : <div className="joined-event-area__container">
          <div className="joined-event-area__container__main">
            {
              items.map((item, index) => {
                return <div
                  key={index}
                  className="joined-event-area__container__main__item"
                >
                  <EventCard onViewDetailEvent={onViewDetailEvent} />
                </div>
              })
            }
          </div>
          <div className="joined-event-area__container__paginator">
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
      }
    </div>
  );
}

export default JoinedEventArea;