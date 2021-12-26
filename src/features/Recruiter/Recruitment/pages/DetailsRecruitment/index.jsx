import LoadingUI from 'components/Loading';
// import PropTypes from 'prop-types';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import scroll from 'utils/common';
import RecruitmentDetail from '../RecruitmentDetail';
import './DetailsRecruitment.scss';

DetailsRecruitmentPage.propTypes = {

};

function DetailsRecruitmentPage(props) {
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeOptionMenu = (index) => {
    return setIsActiveIndex(index)
  }

  useEffect(() => {
    scroll.scrollToTop();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearTimeout(timer);
    }
  }, [])

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            < LoadingUI />
          </div >
          : <div className="details-recruitment">
            <div className="details-recruitment__container">
              <div className="details-recruitment__container__top">
                <div className="details-recruitment__container__top__left">
                  <div className="details-recruitment__container__top__left__img">
                    <img src={Images.tw} alt="avatar" />
                  </div>
                  <div className="details-recruitment__container__top__left__info">
                    <h5>Twitter Twitter Twitter</h5>
                    <span>The company entertainment</span>
                    <span>Danang, VN</span>
                    <span>$1500 - $2000</span>
                  </div>
                </div>
                <div className="details-recruitment__container__top__right">
                  <button className="btn btn-sm btn-success btn-edit">Edit</button>
                  <button className="btn btn-sm btn-success btn-close">Close</button>
                </div>
              </div>
              <div className="details-recruitment__container__bottom">
                <div className="details-recruitment__container__bottom__menu">
                  <Link
                    to="#"
                    className={isActiveIndex === 0
                      ? "details-recruitment__container__bottom__menu__item recruitment-detail-link isActive"
                      : "details-recruitment__container__bottom__menu__item recruitment-detail-link"
                    }
                    onClick={() => handleChangeOptionMenu(0)}
                  >Recruitment Detail</Link>
                  <Link
                    to="#"
                    className={isActiveIndex === 1
                      ? "details-recruitment__container__bottom__menu__item list-candidates-link isActive"
                      : "details-recruitment__container__bottom__menu__item list-candidates-link"
                    }
                    onClick={() => handleChangeOptionMenu(1)}
                  >List Candidates</Link>
                </div>
                <div className="details-recruitment__container__bottom__description">
                  {isActiveIndex === 0
                    ? <RecruitmentDetail />
                    : <></>}
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
}

export default DetailsRecruitmentPage;