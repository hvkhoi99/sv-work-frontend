import PropTypes from 'prop-types';
import React from 'react';
// import { Button } from 'reactstrap';
import './TopRecruiterCard.scss';

TopRecruiterCard.propTypes = {
  recruiter: PropTypes.object,
  img: PropTypes.object,
  cardSize: PropTypes.object,
};

TopRecruiterCard.defaultProps = {
  recruiter: {},
  img: {},
  cardSize: {},
}

function TopRecruiterCard(props) {
  const { recruiter, img, cardSize } = props;

  return (
    <div className="card-item">
      <img className={cardSize.size} src={img.src} alt={recruiter.name} />
      {/* <div className="card-item__overlay">
        <h3 className="card-item__title">{recruiter.name}</h3>
        <div className="card-item__actions">
          <Button outline size="sm" color="light">
            Visit
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export default TopRecruiterCard;