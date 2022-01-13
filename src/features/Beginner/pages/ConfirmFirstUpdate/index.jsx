import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import { logout } from 'features/Auth/userSlice';
import React, { useEffect, useState } from 'react';
import * as RiIcons from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './ConfirmFirstUpdate.scss';

ConfirmFirstUpdatePage.propTypes = {

};

function ConfirmFirstUpdatePage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [isLoading, setIsLoading] = useState(true);

  // window.addEventListener('popstate', function (event) {
  //   localStorage.setItem("role_id", 3);
  //   window.location.replace(
  //     "/"
  //   );
  // }, false);

  // useEffect(() => {
  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener('popstate', handleBack);
  //   return () => {
  //     window.removeEventListener('popstate', handleBack);
  //   };
  // });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleBack = () => {
    switch (user.role_id) {
      case 2:
        dispatch(logout());
        history.push("/auth/sign-in");
        break;
      case 3:
        // localStorage.setItem("role_id", 3);
        history.push("/");
        break;
      default:
        break;
    }
  }

  const handleToUpdateProfilePage = (rolePath) => {
    // user.role_id === 3 && localStorage.setItem("role_id", 3);
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
                    {/* <IoIcons.IoIosArrowBack className="back-icon" /> */}
                    {user.role_id === 3 ? "Go home." : "Will be back next time."}
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