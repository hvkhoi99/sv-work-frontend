import Images from 'constants/images';
import React from 'react';
import './Dashboard.scss';

AdminDashboardPage.propTypes = {

};

function AdminDashboardPage(props) {
  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <div className="dashboard__header">
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Student</span>
              <span className="dashboard__header__item__left__count">12,345</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Student</span>
              <span className="dashboard__header__item__left__count">12,345</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Student</span>
              <span className="dashboard__header__item__left__count">12,345</span>
            </div>
            <img src={Images.fptSoftware} alt="total student" />
          </div>
          <div className="dashboard__header__item">
            <div className="dashboard__header__item__left">
              <span className="dashboard__header__item__left__title">Total Student</span>
              <span className="dashboard__header__item__left__count">12,345</span>
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