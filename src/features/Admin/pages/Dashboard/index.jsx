import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import * as BsIcons from 'react-icons/bs';
import './Dashboard.scss';

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

  console.log({ student, recruiter, application, event });
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
              <img src={Images.tw} alt="total student" />
            </div>
            <div className="dashboard__header__item__bottom">
              {student.isUp === 1 ?
                <BsIcons.BsGraphUp className="graph-arrow" />
                : <BsIcons.BsGraphDown className="graph-arrow"/>
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
              <img src={Images.tw} alt="total student" />
            </div>
            <div className="dashboard__header__item__bottom">
              {recruiter.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow"/>}
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
              <img src={Images.tw} alt="total student" />
            </div>
            <div className="dashboard__header__item__bottom">
              {application.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow"/>}
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
              <img src={Images.tw} alt="total student" />
            </div>
            <div className="dashboard__header__item__bottom">
              {event.isUp === 1 ? <BsIcons.BsGraphUp className="graph-arrow" /> : <BsIcons.BsGraphDown className="graph-arrow"/>}
              <span className="span-percent">{event.percent}%</span>
              <span className="span-text">{event.isUp === 1 ? "Up from past month" : "Down from past month"}</span>
            </div>
          </div>
        </div>

        <div className="dashboard__chart">

        </div>
      </div>

    </div>
  );
}

export default AdminDashboardPage;