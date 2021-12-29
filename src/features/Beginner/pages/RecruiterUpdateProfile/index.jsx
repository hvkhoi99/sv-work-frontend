import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import Footer from 'components/Footer';
import LoadingUI from 'components/Loading';
import { updateUser } from 'features/Auth/userSlice';
import UpdateCompanyInfoForm from 'features/Beginner/components/UpdateCompanyInfoForm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as GoIcons from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './RecruiterUpdateProfile.scss';

RecruiterUpdateProfilePage.propTypes = {

};


function RecruiterUpdateProfilePage(props) {
  const user = useSelector((state) => state.user.current);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const initialValues = {
    companyName: '',
    phoneNumber: '',
    contactEmail: '',
    location: '',
    companyIndustry: '',
    companySize: '',
    taxCode: '',
  }

  const handleSubmit = async (values) => {
    try {
      const params = {
        contact_email: values.contactEmail,
        company_name: values.companyName,
        phone_number: values.phoneNumber,
        address: values.location,
        company_size: parseInt(values.companySize),
        company_industry: values.companyIndustry,
        tax_code: values.taxCode,
      }

      const data = user.role_id === 2 
      ? await recruiterApi.createRecruiterProfile(params)
      : await studentApi.createRecruiterProfile(params);
      localStorage.setItem('user', JSON.stringify(data.data.data));
      const result = dispatch(updateUser(data.data.data));
      enqueueSnackbar("Your profile has been updated.", { variant: "success" });

      if (result.payload.r_profile !== null) {
        localStorage.setItem('role_id', 2);
        history.push("/recruiter");
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {user.r_profile !== null
        ? <Redirect to="/" />
        : isLoading
          ? <div className="loading-ui">
            <LoadingUI />
          </div>
          : <>
            <div className="first-update-profile">
              <div className="first-update-profile__container">
                {/* <div className="first-update-profile__container__information">
                  <div className="first-update-profile__container__information__img">
                    <img src={Images.create} alt="create" />
                  </div>
                </div> */}
                <div className="first-update-profile__container__form">
                  <div className="first-update-profile__container__form__wrap">
                    <div className="first-update-profile__container__form__wrap__dot">
                    </div>
                    <div className="first-update-profile__container__form__wrap__form-title">
                      <label>Update Company Info</label>
                      <GoIcons.GoPrimitiveDot className="first-update-profile__container__form__wrap__form-title__icon" />
                    </div>
                    <UpdateCompanyInfoForm
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
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