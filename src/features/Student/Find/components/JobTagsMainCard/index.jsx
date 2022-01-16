import React from 'react';
import PropTypes from 'prop-types';
import JobTagCard from '../JobTagCard';

JobTagsMainCard.propTypes = {
  jobTags: PropTypes.array,
  activeIndex: PropTypes.number,
  onActiveClass: PropTypes.func
};

JobTagsMainCard.defaultProps = {
  jobTags: [],
  activeIndex: 0,
  onActiveClass: PropTypes.func
}

function JobTagsMainCard(props) {
  const {jobTags, activeIndex, onActiveClass} = props

  return (
    <>
      {
        jobTags.map((tag, index) => {
          const activeClass = activeIndex === tag.id
            ? "find-jobs__container__job-tags__item job-tag-active"
            : "find-jobs__container__job-tags__item";
          return <JobTagCard
            key={index}
            tag={tag}
            activeClass={activeClass}
            onActiveClass={onActiveClass}
          />
        })
      }
    </>
  );
}

export default JobTagsMainCard;