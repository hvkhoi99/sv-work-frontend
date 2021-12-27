import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
import { useSelector } from 'react-redux';
import helper from 'utils/common';
import './RecruiterProfile.scss';

RecruiterProfilePage.propTypes = {

};

function RecruiterProfilePage(props) {
  const recruiter = useSelector((state) => state.user.current.r_profile);
  // console.log({r_profile});
  // const [recruiter, setRecruiter] = useState({
  //   company_name: '',
  //   company_industry: '',
  //   company_size: '',
  //   contact_email: '',
  //   phone_number: '',
  //   description: ''
  // });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchRecruiterProfile = async () => {
  //     const data = await recruiterApi.getRecruiterProfile();
  //     setRecruiter(data.data.data);
  //     setIsLoading(false);
  //     return data.data
  //   }

  //   fetchRecruiterProfile();
  // }, [])

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {isLoading
        ?
        <div className="loading-ui">
          <LoadingUI />
        </div>
        : <div className="recruiter-profile">
          <div className="recruiter-profile__container">
            <div className="recruiter-profile__container__info">
              <div className="recruiter-profile__container__info__top">
                <div className="recruiter-profile__container__info__top__left">
                  <img src={Images.fb} alt="recruiter-avatar" />
                </div>
                <div className="recruiter-profile__container__info__top__right">
                  <span className="recruiter-profile__container__info__top__right__recruiter-name">
                    {recruiter.company_name}
                    {recruiter.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                  </span>
                  <span className="recruiter-profile__container__info__top__right__recruiter-industry">{recruiter.company_industry}</span>
                  <span className="recruiter-profile__container__info__top__right__recruiter-address">{recruiter.address}</span>
                  <div className="recruiter-profile__container__info__top__right__btn-edit">
                    <button className="btn btn-success btn-sm btn-edit">
                      <MdIcons.MdModeEditOutline className="edit-icon" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="recruiter-profile__container__info__bottom">
                <div className="recruiter-profile__container__info__bottom__industry">
                  <AiIcons.AiFillSetting className="bottom-icon" />
                  <span className="bottom-span">{recruiter.company_industry}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__mail-contact">
                  <AiIcons.AiTwotoneMail className="bottom-icon" />
                  <span className="bottom-span">{recruiter.contact_email}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__phone-number">
                  <AiIcons.AiTwotonePhone className="bottom-icon" />
                  <span className="bottom-span">{recruiter.phone_number}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__company-size">
                  <TiIcons.TiGroup className="bottom-icon" />
                  <span className="bottom-span">{recruiter.company_size}</span>
                </div>
              </div>
            </div>
            <div className="recruiter-profile__container__overall">
              <div className="recruiter-profile__container__overall__title">
                <h3>Overall</h3>
                <GoIcons.GoPrimitiveDot className="title-dot" />
              </div>
              <p>{recruiter.description}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RecruiterProfilePage;