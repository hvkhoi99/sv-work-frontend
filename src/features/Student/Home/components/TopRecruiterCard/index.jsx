import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const { recruiter, cardSize } = props;
  const history = useHistory();
  const handleToViewCompany = () => {
    history.push(`/company/${recruiter.id}`);
  }

  return (
    <div className="card-item">
      <img
        className={cardSize.size}
        src={recruiter.logo_image_link} alt={recruiter.name}
        onClick={handleToViewCompany}
      />
    </div>
  );
}

export default TopRecruiterCard;