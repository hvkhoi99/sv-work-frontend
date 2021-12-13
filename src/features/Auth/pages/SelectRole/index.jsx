import Footer from 'components/Footer';
import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './SelectRole.scss';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import LoadingUI from 'components/Loading';

SelectRolePage.propTypes = {

};

function SelectRolePage(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <>
        <div className="select-role">
          <div className="select-role__container">
            <div className="select-role__item">
              <Link className="select-role__item__link" to="/auth/sign-up/2">
                <BsIcons.BsBuilding className="select-role__item__link__icon" />
                <h3>Recuriter</h3>
              </Link>
              <img src={Images.recruiter} alt="recruiter" />
            </div>
            <div className="select-role__item">
              <Link className="select-role__item__link" to="/auth/sign-up/3">
                <IoIcons.IoMdSchool className="select-role__item__link__icon" />
                <h3>Student</h3>
              </Link>
              <img src={Images.student} alt="student" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );

  return <>{currentUI}</>
}

export default SelectRolePage;