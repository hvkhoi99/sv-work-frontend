import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import LinesEllipsis from 'react-lines-ellipsis';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import scroll from 'utils/common';
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
  const history = useHistory();
  const location = history.location.pathname;
  const [dashboardIndexData, setDashboardIndexData] = useState({});
  const [currentPath, setCurrentPath] = useState(location);
  const [isLoading, setIsLoading] = useState(true);
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
    scroll.scrollToTop();
  }, []);

  const onChangeIndex = (option) => {
    setCurrentPath(option.path);
  }

  const onViewRecruitment = (recruitment) => {
    console.log({ recruitment })
    history.push(`${Paths.recruiterDashboard}/available-jobs/${recruitment.id}`);
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
                  <img src={Images.fb} alt="apple" />
                  <div className="recruiter-dashboard__container__top__left__inforCard__description">
                    <div className="recruiter-dashboard__container__top__left__inforCard__description__title">
                      <LinesEllipsis
                        text={
                          user.r_profile.company_name
                        }
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                        className="recruiter-dashboard__container__top__left__inforCard__description__title__company-name"
                      />
                      {dashboardIndexData.profile.verify && <HiIcons.HiCheckCircle className="inforCard-icon" />}
                    </div>
                    <LinesEllipsis
                      text={
                        user.r_profile.company_industry
                      }
                      maxLine='1'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                      className="recruiter-dashboard__container__top__left__inforCard__description__company-industry"
                    />
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
                <div className="recruiter-dashboard__container__top__right__card">
                  <div className="recruiter-dashboard__container__top__right__card__plus-icon">
                    <BsIcons.BsFillPlusCircleFill className="plus-icon" />
                  </div>
                  <div className="recruiter-dashboard__container__top__right__card__create-span">
                    <span>Create recruitment</span>
                  </div>
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
                {currentPath === availableJobsPath ? <AvailableJobs onViewRecruitment={onViewRecruitment} /> : currentPath === closedRecruitmentsPath ? <ClosedRecruitments /> : <></>}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default RecruiterDashboardPage;