import React from 'react';
import StudentSearchBar from '../../components/StudentSearchBar';
import './FindJobs.scss';

FindJobsPage.propTypes = {

};

function FindJobsPage(props) {
  return (
    <div className="find-jobs">
      <div className="find-jobs__container">
        <div className="find-jobs__container__search-bar">
          <StudentSearchBar />
        </div>
      </div>
    </div>
  );
}

export default FindJobsPage;