import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './DetailEvent.scss';
import EventDetailActionCard from '../../components/EventDetailActionCard';
import * as BsIcons from 'react-icons/bs';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import EventCard from '../../components/EventCard';
import helper from 'utils/common';
import LoadingUI from 'components/Loading';
// import * as SiIcons from 'react-icons/si';

DetailEventPage.propTypes = {

};

function DetailEventPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const onViewDetailEvent = () => {
    console.log("View event!");
  }

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {
        isLoading
          ? <LoadingUI />
          : <div className="detail-event">
            <div className="detail-event__container">
              <div className="detail-event__container__top">
                <img src={Images.event1} alt="event-img" />
              </div>
              <div className="detail-event__container__center">
                <div className="detail-event__container__center__left">
                  <span className="detail-event__container__center__left__title">
                    {`${"student achievement awards".toUpperCase()}`}
                  </span>
                  <span className="detail-event__container__center__left__by">
                    By {"HVKHOI99"}
                  </span>
                  <span className="detail-event__container__center__left__address">
                    Truong Dai hoc Bach Khoa, Da Nang
                  </span>
                  <div className="detail-event__container__center__left__description">
                    <span className="detail-event__container__center__left__description__title">
                      Description
                    </span>
                    <p className="detail-event__container__center__left__description__main">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia enim iure sequi. Placeat vero soluta rem sint obcaecati in cum. Tempore doloribus exercitationem neque iure voluptas corrupti accusamus dicta?
                    </p>
                  </div>
                </div>
                <div className="detail-event__container__center__right">
                  <div className="detail-event__container__center__right__more-info">
                    <EventDetailActionCard />
                  </div>
                  <div className="detail-event__container__center__right__share-with">
                    <span className="detail-event__container__center__right__share-with__title">
                      Share with friends
                    </span>
                    <div className="detail-event__container__center__right__share-with__apps">
                      <FiIcons.FiInstagram
                        className="detail-event__container__center__right__share-with__apps__instagram app-icon"
                      />
                      <BsIcons.BsFacebook
                        className="detail-event__container__center__right__share-with__apps__facebook app-icon"
                      />
                      <AiIcons.AiFillTwitterCircle
                        className="detail-event__container__center__right__share-with__apps__twitter"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-event__container__top-event">
                <span className="detail-event__container__top-event__title">Top Events</span>
                <div className="detail-event__container__top-event__event">
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                  <div className="detail-event__container__top-event__event__item">
                    <EventCard onViewDetailEvent={onViewDetailEvent} />
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default DetailEventPage;