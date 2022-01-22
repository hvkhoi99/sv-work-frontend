import React from 'react';
import * as GiIcons from 'react-icons/gi';
import { Link } from 'react-router-dom';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
// import PropTypes from 'prop-types';

StudentCertificatesItemCard.propTypes = {

};

function StudentCertificatesItemCard(props) {
  return (
    <div className="student-certificates-item-card">
      <div className="student-certificates-item-card__main">
        <div className="student-certificates-item-card__main__icon">
          <GiIcons.GiDiploma className="student-certificates-item-card__main__icon__item" />
        </div>
        <div className="student-certificates-item-card__main__info">
          <div className="student-certificates-item-card__main__info__title">
            <Link
              to="#"
              className="student-certificates-item-card__main__info__title__link"
            >
              TOEIC Certificate with score 800 issued (2014)
            </Link>
          </div>
          <span>California University</span>
          <div className="student-certificates-item-card__main__info__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Qui magnam accusantium esse harum. Eaque, consectetur et dolore adipisci aliquid pariatur? Incidunt,
            iusto blanditiis deserunt ipsam aspernatur animi temporibus voluptatibus repudiandae.
          </div>
        </div>
      </div>
      <div className="student-certificates-item-card__more">
        <StudentProfileMoreOptions />
      </div>
    </div>
  );
}

export default StudentCertificatesItemCard;