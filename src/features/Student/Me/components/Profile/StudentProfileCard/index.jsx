import React, { useEffect, useState } from 'react';
import StudentCertificatesCard from '../StudentCertificates';
import StudentEducationsCard from '../StudentEducations';
import StudentExperiencesCard from '../StudentExperiences';
import StudentLanguagesCard from '../StudentLanguages';
import StudentOverviewCard from '../StudentOverview';
import StudentPersonalInfoCard from '../StudentPersonalInfo';
import StudentSkillsCard from '../StudentSkills';
// import PropTypes from 'prop-types';
import './StudentProfileCard.scss';
import LoadingChildUI from 'components/LoadingChild';
import { useDispatch, useSelector } from 'react-redux';
import studentApi from 'api/studentApi';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { updateUser } from 'features/Auth/userSlice';

StudentProfileCard.propTypes = {

};

function StudentProfileCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [responseData, setResponseData] = useState({
    experiencesResponse: [],
    educationsResponse: [],
    skillsResponse: {
      id: 0,
      skills: []
    },
    certificatesResponse: [],
    languagesResponse: {
      id: 0,
      locales: []
    },
  });
  const [typeUpdating, setTypeUpdating] = useState({
    isOverviewUpdating: false,
  });
  const [typeDeleting, setTypeDeleting] = useState({
    isExperienceDeleting: false,
    isEducationDeleting: false,
    isSkillsDeleting: false,
    isCertificateDeleting: false,
    isLanguagesDeleting: false,
  })
  // const [stateData, setStateData] = useState({
  //   experiencesData: [],
  //   educationsData: [],
  //   skillsData: [],
  //   certificatesData: [],
  //   languagesData: [],
  // });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const params = {
          page: 1,
          _limit: 3
        }

        const experiencesResponse = await studentApi.getStudentExperiences(params);
        const educationsResponse = await studentApi.getStudentEducations(params);
        const skillsResponse = await studentApi.getStudentSkills();
        const certificatesResponse = await studentApi.getStudentCertificates(params);
        const languagesResponse = await studentApi.getStudentLanguages();

        if (
          experiencesResponse.data.status === 1 &&
          educationsResponse.data.status === 1 &&
          skillsResponse.data.status === 1 &&
          certificatesResponse.data.status === 1 &&
          languagesResponse.data.status === 1
        ) {
          setResponseData(state => ({
            experiencesResponse: experiencesResponse.data.data.data,
            educationsResponse: educationsResponse.data.data.data,
            skillsResponse: skillsResponse.data.data,
            certificatesResponse: certificatesResponse.data.data.data,
            languagesResponse: languagesResponse.data.data
          }));
          setIsLoading(false);
        } else {
          console.log("Cannot fetch responseData.");
        }
      } catch (error) {
        console.log("Cannot fetch responseData. Error: " + error.message);
      }
    };

    fetchStudentProfile();
  }, []);

  // Profile
  const onEditStudentProfile = async (values) => {
    try {
      const params = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        date_of_birth: moment(new Date(values.date_of_birth)).format("MM/DD/YYYY"),
        phone_number: values.phone_number,
        address: values.address,
        nationality: values.nationality,
        gender: (values.gender || "Male") ? true : false,
        job_title: values.job_title,
      };
      console.log({ params });

      const data = await studentApi.updateStudentProfile(values.user_id, params);
      if (data.data.status === 1) {
        localStorage.setItem('user', JSON.stringify(data.data.data));
        dispatch(updateUser(data.data.data));
        enqueueSnackbar("Your Personal Information has been updated.", { variant: "success" });
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

  // Overview
  const updateStudentOverview = async (isDelete, values) => {
    setTypeUpdating(state => ({
      ...state,
      isOverviewUpdating: true
    }));
    try {
      const params = {
        over_view: isDelete ? "" : values
      };

      const data = await studentApi.updateStudentOverview(params.user_id, params);
      if (data.data.status === 1) {
        enqueueSnackbar("Your profile has been updated.", { variant: "success" });
        const cpUser = {
          ...user,
          s_profile: {
            ...user.s_profile,
            over_view: isDelete ? null : values
          }
        }
        dispatch(updateUser(cpUser));
        localStorage.setItem('user', JSON.stringify(cpUser));
        setTypeUpdating(state => ({
          ...state,
          isOverviewUpdating: false
        }));
        return true;
      } else {
        setTypeUpdating(state => ({
          ...state,
          isOverviewUpdating: false
        }));
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      setTypeUpdating(state => ({
        ...state,
        isOverviewUpdating: false
      }));
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // Experiences
  const onCreateAnExperience = async (values) => {
    try {
      const params = {
        ...values,
        from_date: moment(new Date(values.from_date)).format("MM/DD/YYYY"),
        to_date: moment(new Date(values.to_date)).format("MM/DD/YYYY"),
      };
      console.log({ params });
      const action = await studentApi.createAnExperience(params);

      if (action.data.status === 1) {
        const newExperiences = responseData.experiencesResponse;
        newExperiences.splice(0, 0, action.data.data);
        setResponseData(state => ({
          ...state,
          experiencesResponse: newExperiences
        }));
        enqueueSnackbar("Your Experiences Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditExperience = async (id, values) => {
    try {
      const params = {
        ...values,
        from_date: moment(new Date(values.from_date)).format("MM/DD/YYYY"),
        to_date: moment(new Date(values.to_date)).format("MM/DD/YYYY"),
      };
      console.log({ params });
      const action = await studentApi.updateAnExperience(id, params);

      if (action.data.status === 1) {
        const newExperiences = responseData.experiencesResponse;
        const index = newExperiences.findIndex(x => x.id === id);

        if (index > -1) {
          newExperiences.splice(index, 1, action.data.data);
          setResponseData(state => ({
            ...state,
            experiencesResponse: newExperiences
          }));
          enqueueSnackbar("Your Experiences Information has been updated.", { variant: "success" });
          return true;
        } else {
          console.log("Cannot found item with id " + id);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }

      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // EDUCATIONS
  const onCreateEducation = async (values) => {
    try {
      const params = {
        ...values,
        from_date: moment(new Date(values.from_date)).format("MM/DD/YYYY"),
        to_date: moment(new Date(values.to_date)).format("MM/DD/YYYY"),
      };
      console.log({ params });
      const action = await studentApi.createAnEducation(params);

      if (action.data.status === 1) {
        const newEducations = responseData.educationsResponse;
        newEducations.splice(0, 0, action.data.data);
        setResponseData(state => ({
          ...state,
          educationsResponse: newEducations
        }));
        enqueueSnackbar("Your Educations Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditEducation = async (id, values) => {
    try {
      const params = {
        ...values,
        from_date: moment(new Date(values.from_date)).format("MM/DD/YYYY"),
        to_date: moment(new Date(values.to_date)).format("MM/DD/YYYY"),
      };
      console.log({ params });
      const action = await studentApi.updateAnEducation(id, params);

      if (action.data.status === 1) {
        const newEducations = responseData.educationsResponse;
        const index = newEducations.findIndex(x => x.id === id);

        if (index > -1) {
          newEducations.splice(index, 1, action.data.data);
          setResponseData(state => ({
            ...state,
            educationsResponse: newEducations
          }));
          enqueueSnackbar("Your Educations Information has been updated.", { variant: "success" });
          return true;
        } else {
          console.log("Cannot found item with id " + id);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }

      } else {
        console.log("Cannot found item with id " + id);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // SKILLS
  const onCreateSkills = async (values) => {
    console.log({ values });
    try {
      const params = { ...values };
      // console.log({ params });
      const action = await studentApi.createStudentSkills(params);

      if (action.data.status === 1) {
        // const newSkills = responseData.skillsResponse.skills;
        // newSkills.splice(0, 0, action.data.data.skills);
        setResponseData(state => ({
          ...state,
          skillsResponse: action.data.data
        }));
        enqueueSnackbar("Your Skills Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditSkills = async (values) => {
    console.log({ values });
    try {
      const params = { ...values };
      const action = await studentApi.updateStudentSkills(responseData.skillsResponse.id, params);

      if (action.data.status === 1) {
        setResponseData(state => ({
          ...state,
          skillsResponse: action.data.data
        }));
        enqueueSnackbar("Your Skills Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // CERTIFICATES
  const onCreateCertificate = async (values) => {
    try {
      const params = {
        ...values
      };
      console.log({ params });
      const action = await studentApi.createStudentCertificate(params);

      if (action.data.status === 1) {
        const newCertificates = responseData.certificatesResponse;
        newCertificates.splice(0, 0, action.data.data);
        setResponseData(state => ({
          ...state,
          certificatesResponse: newCertificates
        }));
        enqueueSnackbar("Your Certificates Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditCertificate = async (id, values) => {
    console.log({ values });
    try {
      const params = {
        ...values
      };
      console.log({ params });
      const action = await studentApi.updateStudentCertificate(id, params);

      if (action.data.status === 1) {
        const newCertificates = responseData.certificatesResponse;
        const index = newCertificates.findIndex(x => x.id === id);

        if (index > -1) {
          newCertificates.splice(index, 1, action.data.data);
          setResponseData(state => ({
            ...state,
            certificatesResponse: newCertificates
          }));
          enqueueSnackbar("Your Certificates Information has been updated.", { variant: "success" });
          return true;
        } else {
          console.log("Cannot found item with id " + id);
          enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
          return false;
        }
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // LANGUAGES
  const onCreateLanguages = async (values) => {
    console.log({ values });
    try {
      const params = { ...values };
      const action = await studentApi.createStudentLanguages(params);

      if (action.data.status === 1) {
        setResponseData(state => ({
          ...state,
          languagesResponse: action.data.data
        }));
        enqueueSnackbar("Your Languages Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  const onEditLanguages = async (values) => {
    console.log({ values });
    try {
      const params = { ...values };
      const action = await studentApi.updateStudentLanguages(responseData.languagesResponse.id, params);

      if (action.data.status === 1) {
        setResponseData(state => ({
          ...state,
          languagesResponse: action.data.data
        }));
        enqueueSnackbar("Your Languages Information has been updated.", { variant: "success" });
        return true;
      } else {
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
        return false;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  // DELETE
  const onDelete = async (type, item) => {

    try {
      switch (type) {
        case "experience":
          setTypeDeleting(state => ({
            ...state,
            isExperienceDeleting: true
          }));
          const action = await studentApi.deleteAnExperience(item.id);

          if (action.data.status === 1) {
            const newExperiences = responseData.experiencesResponse;
            const index = newExperiences.findIndex(x => x.id === item.id);
            if (index > -1) {
              newExperiences.splice(index, 1);
              setResponseData(state => ({
                ...state,
                experiencesResponse: newExperiences
              }))
              setTypeDeleting(state => ({
                ...state,
                isExperienceDeleting: false
              }));
              enqueueSnackbar("Your Experiences Information has been deleted.", { variant: "success" });
              return true;
            } else {
              console.log("Cannot found item with id " + item.id);
              setTypeDeleting(state => ({
                ...state,
                isExperienceDeleting: false
              }));
              enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
              return false;
            }

          } else {
            setTypeDeleting(state => ({
              ...state,
              isExperienceDeleting: false
            }));
            enqueueSnackbar("Something went wrong. Please try again.", { variant: "success" });
            return false;
          }

        case "education":
          setTypeDeleting(state => ({
            ...state,
            isEducationDeleting: true
          }));
          const actionEdu = await studentApi.deleteAnEducation(item.id);

          if (actionEdu.data.status === 1) {
            const newEducations = responseData.educationsResponse;
            const index = newEducations.findIndex(x => x.id === item.id);
            if (index > -1) {
              newEducations.splice(index, 1);
              setResponseData(state => ({
                ...state,
                educationsResponse: newEducations
              }))
              setTypeDeleting(state => ({
                ...state,
                isEducationDeleting: false
              }));
              enqueueSnackbar("Your Experiences Information has been deleted.", { variant: "success" });
              return true;
            } else {
              console.log("Cannot found item with id " + item.id);
              setTypeDeleting(state => ({
                ...state,
                isEducationDeleting: false
              }));
              enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
              return false;
            }

          } else {
            setTypeDeleting(state => ({
              ...state,
              isEducationDeleting: false
            }));
            enqueueSnackbar("Something went wrong. Please try again.", { variant: "success" });
            return false;
          }
        case "skills":
          const actionSkills = await studentApi.deleteStudentSkills(responseData.skillsResponse.id);

          if (actionSkills.data.status === 1) {
            setResponseData(state => ({
              ...state,
              skillsResponse: {
                id: 0,
                skills: []
              },
            }));
            enqueueSnackbar("Your Experiences Information has been deleted.", { variant: "success" });
            return true;
          } else {
            enqueueSnackbar("Something went wrong. Please try again.", { variant: "success" });
            return false;
          }
        case "certificate":
          const actionCeti = await studentApi.deleteStudentCertificate(item.id);

          if (actionCeti.data.status === 1) {
            const newCertificates = responseData.certificatesResponse;
            const index = newCertificates.findIndex(x => x.id === item.id);

            if (index > -1) {
              newCertificates.splice(index, 1);
              setResponseData(state => ({
                ...state,
                certificatesResponse: newCertificates
              }))
              enqueueSnackbar("Your Certificates Information has been deleted.", { variant: "success" });
              return true;
            } else {
              console.log("Cannot found item with id " + item.id);
              enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
              return false;
            }

          } else {
            enqueueSnackbar("Something went wrong. Please try again.", { variant: "success" });
            return false;
          }
        case "languages":
          const actionLanguages = await studentApi.deleteStudentLanguages(responseData.languagesResponse.id);

          if (actionLanguages.data.status === 1) {
            setResponseData(state => ({
              ...state,
              languagesResponse: {
                id: 0,
                locales: []
              },
            }));
            enqueueSnackbar("Your Languages Information has been deleted.", { variant: "success" });
            return true;
          } else {
            enqueueSnackbar("Something went wrong. Please try again.", { variant: "success" });
            return false;
          }
        default:
          break;
      }
    } catch (error) {
      console.log("Something went wrong. Please try again. Error " + error.message);
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  }

  return (
    <>
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <div className="student-profile-card">
            <div className="student-profile-card__personal-info">
              <StudentPersonalInfoCard
                profile={user.s_profile}
                onEditStudentProfile={onEditStudentProfile}
              />
            </div>
            <div className="student-profile-card__overview">
              <StudentOverviewCard
                overView={user.s_profile.over_view}
                updateStudentOverview={updateStudentOverview}
                isOverviewUpdating={typeUpdating.isOverviewUpdating}
              />
            </div>
            <div className="student-profile-card__experiences">
              <StudentExperiencesCard
                experiences={responseData.experiencesResponse}
                onCreateAnExperience={onCreateAnExperience}
                onEditExperience={onEditExperience}
                onDelete={onDelete}
                isExperienceDeleting={typeDeleting.isExperienceDeleting}
              />
            </div>
            <div className="student-profile-card__educations">
              <StudentEducationsCard
                educations={responseData.educationsResponse}
                onCreateEducation={onCreateEducation}
                onEditEducation={onEditEducation}
                onDelete={onDelete}
                isEducationDeleting={typeDeleting.isEducationDeleting}
              />
            </div>
            <div className="student-profile-card__skills">
              <StudentSkillsCard
                skills={responseData.skillsResponse.skills}
                onCreateSkills={onCreateSkills}
                onEditSkills={onEditSkills}
                onDelete={() => onDelete("skills", responseData.skillsResponse)}
              />
            </div>
            <div className="student-profile-card__certificates">
              <StudentCertificatesCard
                certificates={responseData.certificatesResponse}
                onCreateCertificate={onCreateCertificate}
                onEditCertificate={onEditCertificate}
                onDelete={onDelete}
              />
            </div>
            <div className="student-profile-card__languages">
              <StudentLanguagesCard
                languages={responseData.languagesResponse.locales}
                onCreateLanguages={onCreateLanguages}
                onEditLanguages={onEditLanguages}
                onDelete={() => onDelete("languages", responseData.languagesResponse)}
              />
            </div>
          </div>
      }
    </>
  );
}

export default StudentProfileCard;