import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';

CertificatesCardItem.propTypes = {

};

function CertificatesCardItem(props) {
  return (
    <div className="certificates-card__content__item">
      <div className="certificates-card__content__item__icon">
        <FaIcons.FaCertificate className="certificates-item-icon" />
      </div>
      <div className="certificates-card__content__item__info">
        <div className="certificates-card__content__item__info__title">
          <Link
            to="#"
            className="certificates-card__content__item__info__title__link"
          >
            TOEIC Certificate with score issued (2019)
            {/* <FaIcons.FaEye className="certificates-card__content__item__info__title__link__icon" /> */}
          </Link>
        </div>
        <span>California University</span>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Ipsum tempore velit obcaecati itaque cum, inventore consequatur,
          sed deserunt voluptatum, non aspernatur dicta.
          Adipisci aliquam consequuntur consectetur quos, maiores libero quia!
        </p>
      </div>
    </div>
  );
}

export default CertificatesCardItem;