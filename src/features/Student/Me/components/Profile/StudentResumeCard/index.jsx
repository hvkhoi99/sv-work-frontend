import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './StudentResumeCard.scss';
import * as FiIcons from 'react-icons/fi';
import * as BsIcons from 'react-icons/bs';
import StudentResumeItemCard from '../StudentResumeItem';
import LoadingChildUI from 'components/LoadingChild';

StudentResumeCard.propTypes = {

};

function StudentResumeCard(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <div className="student-resume-card">
      <div className="student-resume-card__header">
        <span>Manage Resume</span>
        <FiIcons.FiPlusCircle className="student-resume-card__header__icon" />
      </div>
      <div className="student-resume-card__main">
        {
          isLoading
            ? <div className="loading-child-ui">
              <LoadingChildUI />
            </div>
            : <>
              <div className="student-resume-card__main__items">
                <div className="student-resume-card__main__items__item">
                  <StudentResumeItemCard />
                </div>
                <div className="student-resume-card__main__items__item">
                  <StudentResumeItemCard />
                </div>
              </div>
              <div className="student-resume-card__main__upload">
                <BsIcons.BsCloudUploadFill
                  className="student-resume-card__main__upload__icon"
                />
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default StudentResumeCard;