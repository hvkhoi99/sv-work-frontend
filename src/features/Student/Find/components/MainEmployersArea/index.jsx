import React from 'react';
// import PropTypes from 'prop-types';
import * as BsIcons from 'react-icons/bs';
import { Link } from 'react-router-dom';
import EmployerCard from '../EmployerCard';
import './MainEmployersArea.scss';

MainEmployersArea.propTypes = {

};

function MainEmployersArea(props) {
  const items = [1, 2, 3, 4, 5, 6];

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
      <div className="main-employers-area__more">
        <Link to="#" className="main-employers-area__more__link">
          <BsIcons.BsChevronDoubleDown className="main-employers-area__more__link__icon" />
          <span>See more</span>
        </Link>
      </div>
    </div>
  );
}

export default MainEmployersArea;