import Images from 'constants/images';
import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scss';

AdminDashboardPage.propTypes = {
  data: PropTypes.object
};

AdminDashboardPage.defaultProps = {
  data: {}
}

function AdminDashboardPage(props) {
  const { data } = props;

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Student</span>
              <span className="dashboard__header__item__left__count">{data.total_student}</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Recruiter</span>
              <span className="dashboard__header__item__left__count">{data.total_recruiter}</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Applicant</span>
              <span className="dashboard__header__item__left__count">{data.total_application}</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Event</span>
              <span className="dashboard__header__item__left__count">{data.total_event}</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
        </div>

        <div className="dashboard__chart">

        </div>
      </div>

    </div>
  );
}

export default AdminDashboardPage;