import RecruitmentCard from 'features/Recruiter/Recruitment/components/RecruitmentCard';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './MainJobsArea.scss';

MainJobsArea.propTypes = {

};

function MainJobsArea(props) {
  const history = useHistory();
  const items = [1, 2, 3, 4, 5, 6];

  const onViewJob = () => {
    history.push("/recruitment/1");
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
                onViewJob={onViewJob}
              />
            </div>
          })
        }
      </div>
      <div className="main-jobs-area__more">
        <Link to="#" className="main-jobs-area__more__link">
          <BsIcons.BsChevronDoubleDown className="main-jobs-area__more__link__icon" />
          <span>See more</span>
        </Link>
      </div>
    </div>
  );
}

export default MainJobsArea;