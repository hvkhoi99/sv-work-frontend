import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import './Dashboard.scss';
import { Chart, registerables } from 'chart.js';
import TotalAccountChart from 'features/Admin/components/TotalAccountChart';
import TotalJobChart from 'features/Admin/components/TotalJobChart';
import TotalEventChart from 'features/Admin/components/TotalEventChart';
import helper from 'utils/common';
Chart.register(...registerables);

AdminDashboardPage.propTypes = {
  data: PropTypes.object,
  chartData: PropTypes.object
};

AdminDashboardPage.defaultProps = {
  data: {},
  chartData: {}
}

function AdminDashboardPage(props) {
  const { data, chartData } = props;
  const student = data.student ?? '';
  const recruiter = data.recruiter ?? '';
  const application = data.application ?? '';
  const event = data.event ?? '';

  // console.log({ chartData })
  // const initialDataChart = {
  //   labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //   datasets: [
  //     {
  //       label: "Last week",
  //       data: chartData.students_data.last_week,
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)",
  //     },
  //     {
  //       label: "Current week",
  //       data: chartData.students_data.current_week,
  //       fill: true,
  //       backgroundColor: "orange",
  //       borderColor: "#742774",
  //     }
  //   ]
  // };

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__top">
              <div className="dashboard__header__item__top__left">
                <span className="dashboard__header__item__top__left__title red">Total Student</span>
                <span className="dashboard__header__item__top__left__count">{student.total_student}</span>
              </div>
              <div className="dashboard__header__item__top__right">
                <IoIcons.IoMdSchool className="dashboard__header__item__top__right__icon" />
              </div>
            </div>
            <div className="dashboard__header__item__bottom">
              {student.isUp === 1 ?
                <BsIcons.BsGraphUp className="graph-arrow" />
                : <BsIcons.BsGraphDown className="graph-arrow" />
              }
              <span className="span-percent">{student.percent}%</span>
              <span className="span-text">{student.isUp === 1 ? "Up from past month" : "Down from past month"}</span>
            </div>
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__top">
              <div className="dashboard__header__item__top__left">
                <span className="dashboard__header__item__top__left__title orange">Total Recruiter</span>
                <span className="dashboard__header__item__top__left__count">{recruiter.total_recruiter}</span>
              </div>
              <div className="dashboard__header__item__top__right">
                <RiIcons.RiBuilding2Fill className="dashboard__header__item__top__right__icon" />
              </div>
            </div>
            <div className="dashboard__header__item__bottom">
              {recruiter.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow" />}
              <span className="span-percent">{recruiter.percent}%</span>
              <span className="span-text">{recruiter.isUp === 1 ? "Up from past month" : "Down from past month"}</span>
            </div>
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__top">
              <div className="dashboard__header__item__top__left">
                <span className="dashboard__header__item__top__left__title yellow">Total Applicant</span>
                <span className="dashboard__header__item__top__left__count">{application.total_application}</span>
              </div>
              <div className="dashboard__header__item__top__right">
                <FaIcons.FaConnectdevelop className="dashboard__header__item__top__right__icon" />
              </div>
            </div>
            <div className="dashboard__header__item__bottom">
              {application.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow" />}
              <span className="span-percent">{application.percent}%</span>
              <span className="span-text">{application.isUp === 1 ? "Up from past month" : "Down from past month"}</span>
            </div>
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__top">
              <div className="dashboard__header__item__top__left">
                <span className="dashboard__header__item__top__left__title violet">Total Event</span>
                <span className="dashboard__header__item__top__left__count">{event.total_event}</span>
              </div>
              <div className="dashboard__header__item__top__right">
                <MdIcons.MdEvent className="dashboard__header__item__top__right__icon" />
              </div>
            </div>
            <div className="dashboard__header__item__bottom">
              {event.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow" />}
              <span className="span-percent">{event.percent}%</span>
              <span className="span-text">{event.isUp === 1 ? "Up from past month" : "Down from past month"}</span>
            </div>
          </div>
        </div>

        <div className="dashboard__chart">
          <div className="dashboard__chart__top">
            <div className="dashboard__chart__top__left">
              <span>Account</span>
              <div className="dashboard__chart__top__left__chart">
                <TotalAccountChart
                  chartData={chartData.accounts}
                />
              </div>
            </div>
            <div className="dashboard__chart__top__right">
              <img src={Images.admin} alt="admin dashboard" />
            </div>
          </div>

          <div className="dashboard__chart__bottom">
            <div className="dashboard__chart__bottom__left">
              <span>Event</span>
              <div className="dashboard__chart__bottom__left__chart">
                <TotalEventChart
                  chartData={chartData}
                />
              </div>
            </div>
            <div className="dashboard__chart__bottom__right">
              <span>Job</span>
              <div className="dashboard__chart__bottom__right__chart">
                <TotalJobChart
                  chartData={chartData.jobs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboardPage;