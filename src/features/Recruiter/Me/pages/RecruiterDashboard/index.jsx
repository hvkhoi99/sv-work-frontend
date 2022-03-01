import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import Paths from 'constants/paths';
import { updateUser } from 'features/Auth/userSlice';
import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import helper from 'utils/common';
import AvailableJobs from '../../components/AvailableJobs';
import ClosedRecruitments from '../../components/ClosedRecruitments';
import DashboardSelectOption from '../../components/DashboardSelectOption';
import './RecruiterDashboard.scss';

RecruiterDashboardPage.propTypes = {

};

function RecruiterDashboardPage(props) {
  const availableJobsPath = `${Paths.recruiterDashboard}/available-jobs`;
  const closedRecruitmentsPath = `${Paths.recruiterDashboard}/closed-recruitments`;
  const user = useSelector((state) => state.user.current);
  const [dashboardIndexData, setDashboardIndexData] = useState({});
  const history = useHistory();
  const location = history.location.pathname;
  const [currentPath, setCurrentPath] = useState(location);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const dispatch = useDispatch();

  const options = [
    { id: 0, name: "Available Jobs", path: availableJobsPath },
    { id: 1, name: "Closed Recruitments", path: closedRecruitmentsPath }
  ]

  useEffect(() => {
    const fetchDashboardIndex = async () => {
      try {
        const data = user.role_id === 2
          ? await recruiterApi.getDashboardIndex()
          : await studentApi.getDashboardIndex();
        setDashboardIndexData(data.data.data);
        setIsLoading(false);
        return data.data;
      } catch (error) {
        console.log("Cannot fetch dashboard index. Error: " + error);
      }
    };

    fetchDashboardIndex();
  }, [user])

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  const onViewRecruitment = (recruitment) => {
    currentPath === availableJobsPath
      ? history.push(`${Paths.recruiterDashboard}/available-jobs/${recruitment.id}`)
      : history.push({
        pathname: `${Paths.recruiterDashboard}/closed-recruitments/${recruitment.id}`,
        state: { isClosedRecruitmentsPath: true }
      })
  }

  const handleCreateRecruitment = async () => {
    setIsChecking(true);
    try {
      const data = user.role_id === 2
        ? await recruiterApi.checkVerified()
        : await studentApi.checkVerified();
      if (data.data.status === 1) {
        const newUser = {
          ...user,
          r_profile: {
            ...user.r_profile,
            verify: data.data.data
          }
        }
        dispatch(updateUser(newUser));
        console.log({data, newUser})
        if ((data.data.data === true) || (data.data.data === 1)) {
          history.push({
            pathname: `${Paths.recruiterDashboard}/available-jobs/create`,
            state: { isCreateMode: true }
          });
        } else {
          onShow(true);
        }
      }
      setIsChecking(false);
      return;
    } catch (error) {
      setIsChecking(false);
      console.log("Cannot check verification account");
      return;
    }
  }

  const onDeleteRecruitment = () => {
    dashboardIndexData.closedJobs > 0 && setDashboardIndexData({ ...dashboardIndexData, closedJobs: dashboardIndexData.closedJobs - 1 });
  }

  const onShow = (value) => {
    setShow(value);
  }

  const handleToUpdateProfile = () => {
    history.push(`${Paths.recruiterProfile}/update`);
  }

  return (
    <>
      {isLoading
        ?
        <div className="loading-ui">
          <LoadingUI />
        </div>
        : <div className="recruiter-dashboard">
          <div className="recruiter-dashboard__container">
            <div className="recruiter-dashboard__container__top">
              <div className="recruiter-dashboard__container__top__left">
                <div className="recruiter-dashboard__container__top__left__inforCard">
                  <img src={
                    user.r_profile === null
                      ? Images.defaultAvatar
                      : user.r_profile.logo_image_link
                  } alt="recruiter-avatar" />
                  <div className="recruiter-dashboard__container__top__left__inforCard__description">
                    <div className="recruiter-dashboard__container__top__left__inforCard__description__title">
                      <span>{user.r_profile.company_name}</span>
                      {dashboardIndexData.profile.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                    </div>
                    <span
                      className="recruiter-dashboard__container__top__left__inforCard__description__company-industry"
                    >{user.r_profile.company_industry}</span>
                  </div>
                </div>
              </div>
              <div className="recruiter-dashboard__container__top__right">
                <div className="recruiter-dashboard__container__top__right__card">
                  <span className="recruiter-dashboard__container__top__right__card__count">{dashboardIndexData.availableJobs}</span>
                  <span className="recruiter-dashboard__container__top__right__card__type">Jobs Available</span>
                </div>
                <div className="recruiter-dashboard__container__top__right__card">
                  <span className="recruiter-dashboard__container__top__right__card__count">{dashboardIndexData.total_applicants}</span>
                  <span className="recruiter-dashboard__container__top__right__card__type">Applicants</span>
                </div>
                <div className="recruiter-dashboard__container__top__right__card">
                  <span className="recruiter-dashboard__container__top__right__card__count">{dashboardIndexData.closedJobs}</span>
                  <span className="recruiter-dashboard__container__top__right__card__type">Closed</span>
                </div>
                <div
                  className="recruiter-dashboard__container__top__right__card"
                  onClick={isChecking ? null : handleCreateRecruitment}
                >
                  {
                    isChecking
                      ? <Spinner children="" size="lg" color="success" />
                      : <>
                        <div className="recruiter-dashboard__container__top__right__card__plus-icon">
                          <BsIcons.BsFillPlusCircleFill className="plus-icon" />
                        </div>
                        <div className="recruiter-dashboard__container__top__right__card__create-span">
                          <span>Create recruitment</span>
                        </div>
                      </>
                  }
                </div>
              </div>
            </div>

            <div className="recruiter-dashboard__container__bottom">
              <div className="recruiter-dashboard__container__bottom__left">
                {options.map((option, index) => {
                  const className = currentPath === option.path ? "recruiter-dashboard__container__bottom__left__item visited-card" : "recruiter-dashboard__container__bottom__left__item";
                  return <DashboardSelectOption
                    option={option}
                    key={index}
                    className={className}
                    onChangeIndex={onChangeIndex}
                  />
                })}
                <div className="recruiter-dashboard__container__bottom__left__img">
                  <img src={Images.create} alt="recruitment dashboard" />
                </div>
              </div>
              <div className="recruiter-dashboard__container__bottom__right">
                {currentPath === availableJobsPath
                  ? <AvailableJobs
                    onViewRecruitment={onViewRecruitment}
                  />
                  : currentPath === closedRecruitmentsPath
                    ? <ClosedRecruitments
                      onViewRecruitment={onViewRecruitment}
                      onDeleteRecruitment={onDeleteRecruitment}
                    /> : <></>}
              </div>
            </div>
          </div>
        </div>
      }
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={handleToUpdateProfile}
        contentConfirm={
          user.r_profile.tax_code !== ""
            ? "Your profile is waiting to be Verified by the Administrator. Do you want to update again?"
            : "You need to have your profile Verified to continue."
        }
      />
    </>
  );
}

export default RecruiterDashboardPage;