import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './ConfirmFirstUpdate.scss';


ConfirmFirstUpdatePage.propTypes = {

};

function ConfirmFirstUpdatePage(props) {
  const history = useHistory();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);

  // window.addEventListener('popstate', function (event) {
  //   localStorage.setItem("role_id", 3);
  //   window.location.replace(
  //     "/"
  //   );
  // }, false);

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBack);
    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleBack = () => {
    localStorage.setItem("role_id", 3);
    window.location.replace(
      "/"
    );
  }

  const handleToUpdateProfilePage = (rolePath) => {
    localStorage.setItem("role_id", 3);
    return history.push(`/first-update/${rolePath}`);
  }

  return (
    <>
      {isLoading
        ? <LoadingUI />
        : <div className="confirm-first-update">
          <div className="confirm-first-update__container">
            <div className="confirm-first-update__container__confirm-form">
              <span className="confirm-first-update__container__confirm-form__title">
                <RiIcons.RiErrorWarningLine className="confirm-first-update__container__confirm-form__title__icon" />
                You need to update your profile to get started.
              </span>
              <span className="confirm-first-update__container__confirm-form__intro">
                Select the type of profile you want to update
              </span>
              <div className="confirm-first-update__container__confirm-form__pin">
                <div className="div-circle-green"></div>
                <div className="div-circle-green"></div>
              </div>
              <div className="confirm-first-update__container__confirm-form__select-role">
                <div className="confirm-first-update__container__confirm-form__select-role__select-group">
                  {user.r_profile === null &&
                    <div className="confirm-first-update__container__confirm-form__select-role__select-group__recruiter">
                      <Link
                        to="/first-update/recruiter"
                        className="confirm-first-update__container__confirm-form__select-role__select-group__recruiter__link"
                      >
                        Recruiter
                      </Link>
                      <img
                        src={Images.recruiter}
                        alt="recruiter"
                        onClick={() => handleToUpdateProfilePage("recruiter")}
                      />
                    </div>
                  }
                  {user.s_profile === null &&
                    <div className="confirm-first-update__container__confirm-form__select-role__select-group__student">
                      <Link
                        to="/first-update/student"
                        className="confirm-first-update__container__confirm-form__select-role__select-group__student__link"
                      >
                        Student
                      </Link>
                      <img
                        src={Images.student}
                        alt="student"
                        onClick={() => handleToUpdateProfilePage("student")}
                      />
                    </div>
                  }
                </div>
                <div className="confirm-first-update__container__confirm-form__select-role__button">
                  <button className="btn btn-secondary btn-sm" type="button" onClick={handleBack}>
                    <IoIcons.IoIosArrowBack className="back-icon" />
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ConfirmFirstUpdatePage;