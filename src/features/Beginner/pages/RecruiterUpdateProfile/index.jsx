import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import Footer from 'components/Footer';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import { updateUser } from 'features/Auth/userSlice';
import UpdateCompanyInfoForm from 'features/Beginner/components/UpdateCompanyInfoForm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as GoIcons from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import helper from 'utils/common';
import './RecruiterUpdateProfile.scss';
// import PropTypes from 'prop-types';

RecruiterUpdateProfilePage.propTypes = {
  // isEditMode: PropTypes.bool,
  // recruiter: PropTypes.object
};

RecruiterUpdateProfilePage.defaultProps = {
  // isEditMode: false,
  // recruiter: {}
}

function RecruiterUpdateProfilePage(props) {
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { update } = useParams();
  const isUpdate = update === "update";
  // console.log({ update }, { isUpdate })

  const initialValues = !isUpdate
    ? {
      company_name: 'New Company',
      phone_number: '0702666777',
      contact_email: 'new.company@gmail.com',
      address: 'Da Nang, Viet Nam',
      company_industry: 'Software Company',
      company_size: '1000',
      tax_code: '1100L',
    } : user.r_profile;

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (values) => {
    console.log({values});
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

      if (!isUpdate) {
        const data = user.role_id === 2
          ? await recruiterApi.createRecruiterProfile(params)
          : await studentApi.createRecruiterProfile(params);
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));

        if (data.data.status === 1) {
          localStorage.setItem('role_id', 2);
          enqueueSnackbar("Your profile has been updated.", { variant: "success" });
          history.push(`${Paths.recruiterProfile}`);
        } else {
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        }
      } else {
        const data = user.role_id === 2
          ? await recruiterApi.updateRecruiterProfile(values.user_id, params)
          : await studentApi.updateRecruiterProfile(values.user_id, params);
        if (data.data.status === 1) {
          localStorage.setItem('user', JSON.stringify(data.data.data));
          dispatch(updateUser(data.data.data));
          enqueueSnackbar("Your profile has been updated.", { variant: "success" });
          history.push(`${Paths.recruiterProfile}`);
          return true;
        } else {
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }
      }

    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <>
            <div className="first-update-profile">
              <div className="first-update-profile__container">
                <div className="first-update-profile__container__information">
                  <div className="first-update-profile__container__information__img">
                    <img src={Images.create} alt="create" />
                  </div>
                </div>
                <div className="first-update-profile__container__form">
                  <div className="first-update-profile__container__form__wrap">
                    <div className="first-update-profile__container__form__wrap__container">
                      <div className="first-update-profile__container__form__wrap__container__dot">
                      </div>
                      <div className="first-update-profile__container__form__wrap__container__dot">
                      </div>
                    </div>
                    <div className="first-update-profile__container__form__wrap__form-title">
                      <label>Update Company Info</label>
                      <GoIcons.GoPrimitiveDot className="first-update-profile__container__form__wrap__form-title__icon" />
                    </div>
                    <UpdateCompanyInfoForm
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                      isUpdate={isUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
      }
    </>
  );
}

export default RecruiterUpdateProfilePage;