import LoadingChildUI from 'components/LoadingChild';
import RecruitmentCard from 'features/Recruiter/Recruitment/components/RecruitmentCard';
import React from 'react';
import { useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './MainJobsArea.scss';

MainJobsArea.propTypes = {

};

function MainJobsArea(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([
    { value: 0 },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 }
  ]);

  const onViewJob = () => {
    history.push("/recruitment/1");
  }

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
    <div className="main-jobs-area">
      <div className="main-jobs-area__title">
        <span>"keyword" Job Results</span>
      </div>
      <div className="main-jobs-area__content">
        {
          items.map((item, index) => {
            return <div
              key={index}
              className="main-jobs-area__content__item"
            >
              <RecruitmentCard
                recruitment={item}
                onViewJob={onViewJob}
              />
            </div>
          })
        }
      </div>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="main-jobs-area__more">
            <Link to="#" className="main-jobs-area__more__link" onClick={handleSeeMore}>
              <BsIcons.BsChevronDoubleDown className="main-jobs-area__more__link__icon" />
              <span>See more</span>
            </Link>
          </div>
      }
    </div>
  );
}

export default MainJobsArea;