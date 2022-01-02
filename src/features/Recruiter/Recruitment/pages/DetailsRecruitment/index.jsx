import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import helper from 'utils/common';
import RecruitmentDetail from '../RecruitmentDetail';
import './DetailsRecruitment.scss';

DetailsRecruitmentPage.propTypes = {
};

function DetailsRecruitmentPage(props) {
  const user = useSelector((state) => state.user.current);
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { recruitmentId } = useParams();
  const [recruitmentDetail, setRecruitmentDetail] = useState({});
  const history = useHistory();

  const handleChangeOptionMenu = (index) => {
    return setIsActiveIndex(index);
  };

  useEffect(() => {
    const fetchRecruitmentDetail = async () => {
      try {
        const data = await studentApi.getRecruimentDetail(recruitmentId);
        setRecruitmentDetail(data.data.data)
        setIsLoading(false);
        // console.log("recruitment", data.data.data.hashtags);
        return data.data;
      } catch (error) {
        console.log("Cannot fetch recruitment detail. Error: " + error)
      }
    };

    fetchRecruitmentDetail();
  }, [recruitmentId]);

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  const handleToEditRecruitment = () => {

    history.push({
      pathname: `/recruiter/me/dashboard/available-jobs/${recruitmentId}/update`,
      state: {...recruitmentDetail}
    })
  };

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
                    <h4>{recruitmentDetail.title}</h4>
                    <span className="details-recruitment__container__top__left__info__company-name">
                      {user.r_profile.company_name}
                    </span>
                    <span>{recruitmentDetail.location}</span>
                    <span>${recruitmentDetail.min_salary} - ${recruitmentDetail.max_salary}</span>
                  </div>
                </div>
                <div className="details-recruitment__container__top__right">
                  {recruitmentDetail.is_closed
                    ? <button className="btn btn-sm btn-danger btn-close">Delete</button>
                    : <>
                      <button
                        className="btn btn-sm btn-success btn-edit"
                        onClick={handleToEditRecruitment}
                      >Edit</button>
                      <button className="btn btn-sm btn-success btn-close">Close</button>
                    </>
                  }
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
                    ? <RecruitmentDetail recruitmentDetail={recruitmentDetail} />
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