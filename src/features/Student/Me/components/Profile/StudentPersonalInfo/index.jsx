import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import PopupUpdateStudentProfile from '../../PopupUpdateStudentProfile/PopupUpdatePersonalInfo';
import StudentProfileMoreOptions from '../StudentProfileMoreOptions';
// import PropTypes from 'prop-types';
import './StudentPersonalInfo.scss';

StudentPersonalInfoCard.propTypes = {

};

function StudentPersonalInfoCard(props) {
  const initialValues = {
    first_name: '',
    last_name: '',
    job_title: '',
    email: '',
    date_of_birth: '',
    phone_number: '',
    address: '',
    nationality: '',
    gender: '',
  };


  const handleSubmit = async (values) => {

    console.log({ values });
    // try {
    //   const params = {
    //     email: values.email,
    //     first_name: values.first_name,
    //     last_name: values.last_name,
    //     date_of_birth: moment(new Date(values.date_of_birth)).format("MM/DD/YYYY"),
    //     phone_number: values.phone_number,
    //     address: values.address,
    //     nationality: values.nationality,
    //     gender: values.gender === "Male" ? true : false,
    //     job_title: values.job_title,
    //   }

    //   if (!isUpdate) {
    //     const data = await studentApi.createStudentProfile(params);
    //     localStorage.setItem('user', JSON.stringify(data.data.data));
    //     dispatch(updateUser(data.data.data));

    //     if (data.data.status === 1) {
    //       localStorage.setItem('role_id', 3);
    //       enqueueSnackbar("Your profile has been updated.", { variant: "success" });
    //       history.push(`${Paths.clientProfile}`);
    //     } else {
    //       enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    //     }
    //   } else {
    //     const data = await studentApi.updateStudentProfile(values.user_id, params);
    //     if (data.data.status === 1) {
    //       localStorage.setItem('user', JSON.stringify(data.data.data));
    //       dispatch(updateUser(data.data.data));
    //       enqueueSnackbar("Your profile has been updated.", { variant: "success" });
    //       return true;
    //     } else {
    //       enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    //       return false;
    //     }
    //   }
    // } catch (error) {
    //   enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    //   return false;
    // }
  }

  return (
    <div className="student-personal-info-card">
      <div className="student-personal-info-card__header">
        <span className="student-personal-info-card__header__title">
          Personal Information
        </span>
        {/* <AiIcons.AiOutlineEdit className="student-personal-info-card__header__icon" /> */}
        <PopupUpdateStudentProfile
        initialValues={initialValues}
        onSubmit={handleSubmit}
        />
      </div>
      <div className="student-personal-info-card__main">
        <div className="student-personal-info-card__main__left">
          <div className="student-personal-info-card__main__left__dob">
            <BsIcons.BsCalendarDate
              className="student-personal-info-card__icon"
            />
            <span>10/03/1999</span>
          </div>
          <div className="student-personal-info-card__main__left__gender">
            <FaIcons.FaUser
              className="student-personal-info-card__icon"
            />
            <span>{true ? "Male" : "Female"}</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__center">
          <div className="student-personal-info-card__main__center__phone">
            <FaIcons.FaPhoneAlt
              className="student-personal-info-card__icon"
            />
            <span>0702655787</span>
          </div>
          <div className="student-personal-info-card__main__center__email">
            <MdIcons.MdEmail
              className="student-personal-info-card__icon"
            />
            <span>hvkhoi.99@gmail.com</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__right">
          <div className="student-personal-info-card__main__right__address">
            <ImIcons.ImLocation
              className="student-personal-info-card__icon"
            />
            <span>Danang, VietNam</span>
          </div>
          <div className="student-personal-info-card__main__right__nationality">
            <FaIcons.FaPassport
              className="student-personal-info-card__icon"
            />
            <span>Viet Nam</span>
          </div>
        </div>
        <div className="student-personal-info-card__main__more">
          <StudentProfileMoreOptions />
        </div>
      </div>
    </div >
  );
}

export default StudentPersonalInfoCard;