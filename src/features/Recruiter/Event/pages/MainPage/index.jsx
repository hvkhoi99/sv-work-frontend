import Images from 'constants/images';
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SearchFormEvent from '../../components/SearchFormEvent';
import './MainEventPage.scss';


RecruiterMainEventPage.propTypes = {

};

function RecruiterMainEventPage(props) {
  return (
    <div className="event-main">
      <div className="event-main__container">
        <div className="event-main__container__slider">
          <img src={Images.event1} alt="event1" />
          <div className="event-main__container__slider__btn-group">
            <FaIcons.FaChevronLeft className="event-main__container__slider__btn-group__icon" />
            <FaIcons.FaChevronRight className="event-main__container__slider__btn-group__icon" />
          </div>
        </div>
        <div className="event-main__container__search">
          <SearchFormEvent />
        </div>
        <div className="event-main__container__btn-group">
          <button className="btn">Manage Events</button>
          <button className="btn">Create an Event</button>
        </div>
        <div className="event-main__container__upcomming-events">
          <div className="event-main__container__upcomming-events__title">
            <span>Upcoming Events</span>
            <div className="event-main__container__upcomming-events__title__dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterMainEventPage;