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
      {/* <div className="card-item__overlay"> */}
        {/* <h3 className="photo__title">ABC</h3> */}

        {/* <div className="photo__actions">
          <div>
            <Button outline size="sm" color="light" onClick={handleEditClick}>
              Edit
            </Button>
          </div>

          <div>
            <Button outline size="sm" color="danger" onClick={handleRemoveClick}>
              Remove
            </Button>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}

export default TopRecruiterCard;