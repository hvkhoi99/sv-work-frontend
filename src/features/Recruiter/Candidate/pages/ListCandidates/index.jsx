import PaginationSimple from 'components/PaginationSimple';
import React, { useState } from 'react';
import CandidatesCard from '../../components/CandidatesCard';
import CandidatePage from '../Candidate';
// import PropTypes from 'prop-types';
import './ListCandidates.scss';

ListCandidates.propTypes = {

};

function ListCandidates(props) {
  const items = [1, 2, 3];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveCard = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="list-candidates">
      <div className="list-candidates__container">
        <div className="list-candidates__container__left">
          {items.map((item, index) => {
            const activeClass = index === activeIndex ? "" : "candidate-card-invisible";
            return <CandidatesCard
              index={index}
              activeClass={activeClass}
              key={index}
              handleActiveCard={handleActiveCard}
            />
          })}
          <PaginationSimple />
        </div>

        <div className="list-candidates__container__right">
          <CandidatePage />
        </div>
      </div>
    </div>
  );
}

export default ListCandidates;