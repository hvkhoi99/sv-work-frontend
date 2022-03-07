import studentApi from 'api/studentApi';
import Footer from 'components/Footer';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import { updateUser } from 'features/Auth/userSlice';
import UpdateStudentInfoForm from 'features/Beginner/components/UpdateStudentInfoForm';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as GoIcons from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import helper from 'utils/common';
import '../RecruiterUpdateProfile/RecruiterUpdateProfile.scss';

StudentUpdateProfilePage.propTypes = {

};

function StudentUpdateProfilePage(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { update } = useParams();
  const isUpdate = update === "update";

  const initialValues = !isUpdate
    ? {
      email: user.email,
      first_name: '',
      last_name: 'Your Name',
      date_of_birth: moment(new Date("02/14/2022")).format("YYYY-MM-DD"),
      phone_number: '0000000000',
      address: 'Da Nang, Viet Nam',
      nationality: 'Viet Nam',
      gender: 'Male',
      job_title: 'Developer',
    } : user.s_profile;


  const handleSubmit = async (values) => {
    try {
      const params = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        date_of_birth: values.date_of_birth,
        phone_number: values.phone_number,
        address: values.address,
        nationality: values.nationality,
        gender: values.gender === "Male" ? true : false,
        job_title: values.job_title,
      }

      if (!isUpdate) {
        const data = await studentApi.createStudentProfile(params);
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));

        if (data.data.status === 1) {
          localStorage.setItem('role_id', 3);
          enqueueSnackbar("Your profile has been updated.", { variant: "success" });
          history.push(`${Paths.clientProfile}`);
        } else {
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        }
      } else {
        const data = await studentApi.updateStudentProfile(values.user_id, params);
        if (data.data.status === 1) {
          localStorage.setItem('user', JSON.stringify(data.data.data));
          dispatch(updateUser(data.data.data));
          enqueueSnackbar("Your profile has been updated.", { variant: "success" });
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

  useEffect(() => {
    helper.scrollToTop();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
                <div className="first-update-profile__container__form">
                  <div className="first-update-profile__container__form__wrap">
                    <div className="first-update-profile__container__form__wrap__container">
                      <div className="first-update-profile__container__form__wrap__container__dot">
                      </div>
                      <div className="first-update-profile__container__form__wrap__container__dot">
                      </div>
                    </div>
                    <div className="first-update-profile__container__form__wrap__form-title">
                      <label>Update Student Info</label>
                      <GoIcons.GoPrimitiveDot className="first-update-profile__container__form__wrap__form-title__icon" />
                    </div>
                    <UpdateStudentInfoForm
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                      isUpdate={isUpdate}
                    />
                  </div>
                </div>
                <div className="first-update-profile__container__information">
                  <div className="first-update-profile__container__information__img">
                    <img src={Images.create} alt="create" />
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

export default StudentUpdateProfilePage;