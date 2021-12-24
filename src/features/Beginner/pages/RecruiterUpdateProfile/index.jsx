import recruiterApi from 'api/recruiterApi';
import Footer from 'components/Footer';
import UpdateCompanyInfoForm from 'components/UpdateCompanyInfoForm';
import Images from 'constants/images';
import { updateUser } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as GoIcons from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RecruiterUpdateProfile.scss';

RecruiterUpdateProfilePage.propTypes = {

};


function RecruiterUpdateProfilePage(props) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

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

      const data = await recruiterApi.createRecruiterProfile(params);
      localStorage.setItem('user', JSON.stringify(data.data.data));
      const result = dispatch(updateUser(data.data.data));
      enqueueSnackbar("Your profile has been created.", { variant: "success" });

      if (result.payload.r_profile !== null) {
        localStorage.setItem('role_id', 2);
        history.push("/recruiter");
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  }

  return (
    <>
      <div className="first-update-profile">
        <div className="first-update-profile__container">
          <div className="first-update-profile__container__information">
            <div className="first-update-profile__container__information__img">
              <img src={Images.create} alt="create" />
            </div>
          </div>
          <div className="first-update-profile__container__form">
            <div className="first-update-profile__container__form__wrap">
              <div className="first-update-profile__container__form__wrap__dot">
                <GoIcons.GoPrimitiveDot className="first-update-profile__container__form__wrap__dot__icon" />
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
  );
}

export default RecruiterUpdateProfilePage;