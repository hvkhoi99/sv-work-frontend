import LoadingChildUI from 'components/LoadingChild';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import EmployerCard from '../EmployerCard';
import './MainEmployersArea.scss';

MainEmployersArea.propTypes = {

};

function MainEmployersArea(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  const handleSeeMore = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const newItems = items.concat(...items);
      setItems(newItems);
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }

  return (
    <div className="main-employers-area">
      <div className="main-employers-area__title">
        <span>"keyword" Company Results</span>
      </div>
      <div className="main-employers-area__content">
        {
          items.map((item, index) => {
            return <div
              key={index}
              className="main-employers-area__content__item"
            >
              <EmployerCard />
            </div>
          })
        }
      </div>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="main-employers-area__more">
            <Link to="#" className="main-employers-area__more__link" onClick={handleSeeMore}>
              <BsIcons.BsChevronDoubleDown className="main-employers-area__more__link__icon" />
              <span>See more</span>
            </Link>
          </div>
      }
    </div>
  );
}

export default MainEmployersArea;