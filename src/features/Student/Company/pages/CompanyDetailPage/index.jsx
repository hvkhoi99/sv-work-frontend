import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as TiIcons from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import helper from 'utils/common';
// import PropTypes from 'prop-types';
import './CompanyDetailPage.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

CompanyDetailPage.propTypes = {

};

function CompanyDetailPage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [followState, setFollowState] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    helper.scrollToTop();

    const fetchCompanyInfo = async () => {
      try {
        const data = await studentApi.getCompanyInfo(id);
        console.log(data);

        if (data.data.status === 1) {
          setCompany(data.data.data);
          setFollowState(data.data.data.is_followed);
          setIsLoading(false);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        // setIsLoading(false);
        console.log("Cannot fetch company info. Error:", error.message);
        return false;
      }
    }

    fetchCompanyInfo();
  }, [id]);

  const onShow = (value) => {
    setShow(value);
  }

  const onUpdateStudentProfile = () => {
    if ((user && Object.keys(user).length === 0)) {
      history.push("/auth/sign-in");
    } else {
      history.push("/first-update/student");
    }
  }

  const onFollowCompany = async (values) => {
    if ((user && Object.keys(user).length === 0) || user.s_profile === null) {
      onShow(true);
    } else {
      setIsFollowing(true);
      try {
        const data = await studentApi.followCompany(id);
        if (data.data.status === 1) {
          setIsFollowing(false);
          setFollowState(data.data.data.is_followed);
          enqueueSnackbar(`Successfully ${data.data.data.is_followed ? "Followed" : "Unfollowed"} this company.`, { variant: "success" });
          return true;
        } else {
          setIsFollowing(false);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }
      } catch (error) {
        setIsFollowing(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    }
  }

  return (
    <>
      {isLoading
        ?
        <div className="loading-ui">
          <LoadingUI />
        </div>
        : <div className="company-detail">
          <div className="company-detail__container">
            <div className="company-detail__container__info">
              <div className="company-detail__container__info__top">
                <div className="company-detail__container__info__top__left">
                  <img src={
                    company.logo_image_link === (null || "" || undefined)
                      ? Images.defaultAvatar
                      : company.logo_image_link
                  } alt="company-avatar" />
                </div>
                <div className="company-detail__container__info__top__right">
                  <span className="company-detail__container__info__top__right__recruiter-name">
                    {company.company_name}
                    {company.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                  </span>
                  <span className="company-detail__container__info__top__right__recruiter-industry">
                    {company.company_industry}
                  </span>
                  <span className="company-detail__container__info__top__right__recruiter-address">
                    {company.address}
                  </span>
                  <div className="company-detail__container__info__top__right__follow">
                    <Button
                      type="button"
                      color="success"
                      className="company-detail__container__info__top__right__follow__button"
                      disabled={isFollowing}
                      style={isFollowing ? { cursor: "default" } : { cursor: "pointer" }}
                      onClick={onFollowCompany}
                    >
                      {isFollowing && <span className="spinner-border spinner-border-sm mr-1" />}
                      <RiIcons.RiChatFollowUpFill
                        className="company-detail__container__info__top__right__follow__button__icon"
                      />
                      {followState ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="company-detail__container__info__bottom">
                <div className="company-detail__container__info__bottom__industry">
                  <AiIcons.AiFillSetting className="bottom-icon" />
                  <span className="bottom-span">{company.company_industry}</span>
                </div>
                <div className="company-detail__container__info__bottom__mail-contact">
                  <AiIcons.AiTwotoneMail className="bottom-icon" />
                  <span className="bottom-span">{company.contact_email}</span>
                </div>
                <div className="company-detail__container__info__bottom__phone-number">
                  <AiIcons.AiTwotonePhone className="bottom-icon" />
                  <span className="bottom-span">{company.phone_number}</span>
                </div>
                <div className="company-detail__container__info__bottom__company-size">
                  <TiIcons.TiGroup className="bottom-icon" />
                  <span className="bottom-span">{company.company_size}</span>
                </div>
              </div>
            </div>
            <div className="company-detail__container__overall">
              <div className="company-detail__container__overall__title">
                <span>Overall</span>
                <GoIcons.GoPrimitiveDot className="title-dot" />
                {/* <PopupTextEditor
                  label="Update Overall"
                  initData={company.description}
                  onTextChange={onUpdateOverall}
                  isUpdating={isUpdating}
                /> */}
              </div>
              <div className="company-detail__container__overall__content">{ReactHtmlParser(company.description ?? "No Information Available.")}</div>
            </div>
          </div>
        </div>
      }
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={onUpdateStudentProfile}
        // titleConfirm="Update Profile"
        contentConfirm={
          (user && Object.keys(user).length === 0)
            ? "You need to LOGIN first and then you need to update your STUDENT PROFILE. Continue?"
            : "You need to update your STUDENT PROFILE. Continue?"
        }
      />
    </>
  );
}

export default CompanyDetailPage;