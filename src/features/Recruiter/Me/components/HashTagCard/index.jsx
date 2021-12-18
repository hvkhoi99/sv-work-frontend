import PropTypes from 'prop-types';
import React from 'react';

HashTagCard.propTypes = {
  hashtag: PropTypes.object
};

HashTagCard.defaultProps = {
  hashtag: {}
}

function HashTagCard(props) {
  const { hashtag } = props;

  return (
    <span className="available-jobs__container__bottom__item-second__hashtags__hashtag">
      {/* <TextTruncate
        line={1}
        element="span"
        truncateText="…"
        text={hashtag.name}
      // textTruncateChild={<Link to="#">Read on</Link>}
      /> */}
      {hashtag.name}
    </span>
  );
}

export default HashTagCard;