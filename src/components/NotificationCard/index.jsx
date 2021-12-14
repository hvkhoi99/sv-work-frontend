import Images from 'constants/images';
import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './NotificationCard.scss';

NotificationCard.propTypes = {

};

function NotificationCard(props) {
  return (
    <li className="noti-card-container">
      <Link to="#" className="notification-link">
        <div className="notification-content">
          <div className="notification-content__img">
            <img src={Images.emoji} alt="copany" />
          </div>
          <div className="notification-content__content">
            <p className="notification-content__content__text">
              <span>Company</span>&nbsp;Minima sed aperiam impedit pariatur exercitationem, consectetur porro similique dolore placeat autem neque modi maiores odio nihil molestias, aut totam in minus.
            </p>
            <span className="notification-content__content__date">2 phút trước</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default NotificationCard;