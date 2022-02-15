import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import './Dashboard.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

AdminDashboardPage.propTypes = {
  data: PropTypes.object
};

AdminDashboardPage.defaultProps = {
  data: {}
}

function AdminDashboardPage(props) {
  const { data } = props;
  const student = data.student ?? '';
  const recruiter = data.recruiter ?? '';
  const application = data.application ?? '';
  const event = data.event ?? '';

  // const chartData = {
  //   labels: [
  //     'Red',
  //     'Blue',
  //     'Yellow'
  //   ],
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       'rgb(255, 205, 86)'
  //     ],
  //     hoverOffset: 4
  //   }]
  // };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

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
              <span>Student Details</span>
              <div className="dashboard__chart__top__left__chart">
                {/* <Line data={chartData} /> */}
                <Bar
                  data={chartData}
                  width={100}
                  height={50}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="dashboard__chart__top__right">
              <img src={Images.admin} alt="admin dashboard" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboardPage;