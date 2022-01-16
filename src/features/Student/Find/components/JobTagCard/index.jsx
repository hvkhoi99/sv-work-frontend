import React from 'react';
import PropTypes from 'prop-types';

JobTagCard.propTypes = {
  tag: PropTypes.object,
  activeClass: PropTypes.string,
  onActiveClass: PropTypes.func
};

JobTagCard.defaultProps = {
  tag: {},
  activeClass: '',
  onActiveClass: null
}

function JobTagCard(props) {
  const { tag, activeClass, onActiveClass } = props;

  const handleActiveCard = () => {
    onActiveClass(tag.id)
  }

  return (
    <span className={activeClass} onClick={handleActiveCard}>
      {tag.name}
    </span>
  );
}

export default JobTagCard;