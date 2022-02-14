import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import PopupTextEditor from 'components/PopupTextEditor';
import PopupUploadAvatar from 'components/PopupUploadAvatar';
import Images from 'constants/images';
import { updateUser } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as TiIcons from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import helper from 'utils/common';
import PopupUpdateProfile from '../../components/PopupUpdateProfile';
import './RecruiterProfile.scss';

RecruiterProfilePage.propTypes = {

};

function RecruiterProfilePage(props) {
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [currentAvatar, setCurrentAvatar] = useState(
    user.r_profile === null
      ? Images.defaultAvatar
      : user.r_profile.logo_image_link
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    helper.scrollToTop();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (values) => {
    try {
      const params = {
        contact_email: values.contact_email,
        company_name: values.company_name,
        phone_number: values.phone_number,
        address: values.address,
        company_size: parseInt(values.company_size),
        company_industry: values.company_industry,
        tax_code: values.tax_code,
      }
      const data = user.role_id === 2
        ? await recruiterApi.updateRecruiterProfile(user.id, params)
        : await studentApi.updateRecruiterProfile(user.id, params);
      if (data.data.status === 1) {
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));
        enqueueSnackbar("Your profile has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onUpdateOverall = async (values) => {
    setIsUpdating(true);
    try {
      const r_profile = user.r_profile;
      const params = {
        contact_email: r_profile.contact_email,
        company_name: r_profile.company_name,
        phone_number: r_profile.phone_number,
        address: r_profile.address,
        company_size: parseInt(r_profile.company_size),
        company_industry: r_profile.company_industry,
        tax_code: r_profile.tax_code,
        description: values
      }

      const data = user.role_id === 2
        ? await recruiterApi.updateRecruiterProfile(user.id, params)
        : await studentApi.updateRecruiterProfile(user.id, params);
      if (data.data.status === 1) {
        setIsUpdating(false);
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));
        enqueueSnackbar("Your profile has been updated.", { variant: "success" });
        return true;
      } else {
        setIsUpdating(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      setIsUpdating(false);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const onUpload = async (url) => {
    try {
      setIsUploading(true);
      const newFile = DataURLtoFile(url, "new-r-avatar.jpg");
      const formData = new FormData();
      formData.append(
        "file",
        newFile,
        newFile.name
      );
      const action = user.role_id === 2
        ? await recruiterApi.changeRecruiterAvatar(formData)
        : await studentApi.changeRecruiterAvatar(formData);

      if (action.data.status === 1) {
        const cpUser = {
          ...user,
          r_profile: {
            ...user.r_profile,
            logo_image_link: action.data.data.logo_image_link
          }
        };
        dispatch(updateUser(cpUser));
        localStorage.setItem('user', JSON.stringify(cpUser));
        setIsUploading(false);
        setCurrentAvatar(url);
        enqueueSnackbar(
          `Your avatar has been updated successfully.`,
          { variant: "success" }
        );
      } else {
        setIsUploading(false);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }

    } catch (error) {
      setIsUploading(false);
      console.log("Cannot change your avatar. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

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
                  <img src={
                    user.r_profile === null
                      ? Images.defaultAvatar
                      : user.r_profile.logo_image_link
                  } alt="recruiter-avatar" />
                  <div className="recruiter-profile__container__info__top__left__avatar">
                    {/* <MdIcons.MdChangeCircle className="recruiter-profile__container__info__top__left__avatar__icon" /> */}
                    <PopupUploadAvatar
                      label="Upload Company Avatar"
                      onUpload={onUpload}
                      isUploading={isUploading}
                      currentAvatar={currentAvatar}
                    />
                  </div>
                </div>
                <div className="recruiter-profile__container__info__top__right">
                  <span className="recruiter-profile__container__info__top__right__recruiter-name">
                    {user.r_profile.company_name}
                    {user.r_profile.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                  </span>
                  <span className="recruiter-profile__container__info__top__right__recruiter-industry">
                    {user.r_profile.company_industry}
                  </span>
                  <div className="recruiter-profile__container__info__top__right__recruiter-address">
                    <MdIcons.MdLocationOn
                      className="recruiter-profile__container__info__top__right__recruiter-address__icon"
                    />
                    <span>
                      {user.r_profile.address}
                    </span>
                  </div>
                  <div className="recruiter-profile__container__info__top__right__btn-edit">
                    <PopupUpdateProfile
                      initialValues={user.r_profile}
                      onSubmit={onSubmit}
                    />
                  </div>
                </div>
              </div>
              <div className="recruiter-profile__container__info__bottom">
                <div className="recruiter-profile__container__info__bottom__industry">
                  <AiIcons.AiFillSetting className="bottom-icon" />
                  <span className="bottom-span">{user.r_profile.company_industry}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__mail-contact">
                  <AiIcons.AiTwotoneMail className="bottom-icon" />
                  <span className="bottom-span">{user.r_profile.contact_email}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__phone-number">
                  <AiIcons.AiTwotonePhone className="bottom-icon" />
                  <span className="bottom-span">{user.r_profile.phone_number}</span>
                </div>
                <div className="recruiter-profile__container__info__bottom__company-size">
                  <TiIcons.TiGroup className="bottom-icon" />
                  <span className="bottom-span">{user.r_profile.company_size}</span>
                </div>
              </div>
            </div>
            <div className="recruiter-profile__container__overall">
              <div className="recruiter-profile__container__overall__title">
                <span>Overall</span>
                <GoIcons.GoPrimitiveDot className="title-dot" />
                <PopupTextEditor
                  label="Update Overall"
                  initData={
                    user.r_profile.description
                  }
                  onTextChange={onUpdateOverall}
                  isUpdating={isUpdating}
                />
              </div>
              <div className="recruiter-profile__container__overall__content">{ReactHtmlParser(user.r_profile.description ?? "No Information Available.")}</div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RecruiterProfilePage;