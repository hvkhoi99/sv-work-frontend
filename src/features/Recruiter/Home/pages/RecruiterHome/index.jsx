import AOS from 'aos';
import PopupConfirm from 'components/PopupConfirm';
import Images from 'constants/images';
import Paths from 'constants/paths';
import React, { useEffect, useState } from 'react';
import * as GoIcons from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RecruiterHome.scss';
import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import { updateUser } from 'features/Auth/userSlice';

RecruiterHomePage.propTypes = {

};

function RecruiterHomePage(props) {
  const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const [show, setShow] = useState(false);

  const [isChecking, setIsChecking] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
      // mirror: true
    });
  }, []);

  const onShow = (value) => {
    setShow(value);
  }

  const handleToUpdateProfile = () => {
    history.push(`${Paths.recruiterProfile}/update`);
  }

  const handleCreateRecruitment = async () => {
    setIsChecking(true);
    try {
      const data = user.role_id === 2
        ? await recruiterApi.checkVerified()
        : await studentApi.checkVerified();
      if (data.data.status === 1) {
        const newUser = {
          ...user,
          r_profile: {
            ...user.r_profile,
            verify: data.data.data
          }
        }
        dispatch(updateUser(newUser));
        console.log({ data, newUser })
        if ((data.data.data === true) || (data.data.data === 1)) {
          history.push({
            pathname: `${Paths.recruiterDashboard}/available-jobs/create`,
            state: { isCreateMode: true }
          });
        } else {
          onShow(true);
        }
      }
      setIsChecking(false);
      return;
    } catch (error) {
      setIsChecking(false);
      console.log("Cannot check verification account");
      return;
    }
  }

  const onMoveToSearchPage = () => {
    history.push(`${Paths.recruiterFindCandidates}`);
  }

  const onMoveToManageRecruitment = () => {
    history.push(`${Paths.recruiterDashboard}`);
  }

  return (
    <div className="recruiter-home">
      <div className="recruiter-home__container">
        <div
          data-aos="fade-zoom-in"
          className="recruiter-home__container__recruitment">
          <div className="recruiter-home__container__recruitment__left">
            <img src={Images.create} alt="create" />
          </div>
          <div className="recruiter-home__container__recruitment__right">
            <div className="recruiter-home__container__recruitment__right__title">
              <h3>Create Recruitment</h3>
              {/* <img src={Images.smDot} alt="smDot" /> */}
              <GoIcons.GoPrimitiveDot className="dot-icon" />
            </div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ipsa rem quis, odio numquam ducimus soluta explicabo exercitationem aperiam dolor blanditiis impedit ipsam modi officiis, facere quas reiciendis deserunt doloremque.</p>
            <div className="recruiter-home__container__recruitment__right__button">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleCreateRecruitment}
                disabled={isChecking}
                style={isChecking ? { cursor: "default" } : { cursor: "pointer" }}
              >
                {isChecking && <span className="spinner-border spinner-border-sm mr-1" />}
                Create
              </button>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className="recruiter-home__container__find-candidates">
          <div
            // data-aos="fade-right"
            className="recruiter-home__container__find-candidates__left">
            <div className="recruiter-home__container__find-candidates__left__title">
              <h3>Searching candidates</h3>
              <GoIcons.GoPrimitiveDot
                className="dot-icon" />
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id maxime minus fugiat iste facilis dolorum quae voluptatem? Ipsam, explicabo eum accusamus labore itaque sunt nesciunt inventore voluptatum magnam. Alias, sit!</p>
            <div className="recruiter-home__container__find-candidates__left__button">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={onMoveToSearchPage}
              >Search</button>
            </div>
          </div>
          <div
            className="recruiter-home__container__find-candidates__right">
            <img src={Images.searchCard} alt="search card" />
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="recruiter-home__container__recruitment-management">
          <div className="recruiter-home__container__recruitment-management__top">
            <div className="recruiter-home__container__recruitment-management__top__title">
              <h3>Recruitment Management</h3>
              <GoIcons.GoPrimitiveDot className="dot-icon" />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, expedita? Adipisci eum velit, aut eaque modi ea quibusdam doloribus doloremque, ducimus debitis culpa voluptate beatae id accusamus, praesentium molestiae. Hic.</p>
            <div className="recruiter-home__container__recruitment-management__top__button">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={onMoveToManageRecruitment}
              >Manage</button>
            </div>
          </div>
          <div
            className="recruiter-home__container__recruitment-management__bottom">
            <img src={Images.recruitmentManageCard} alt="recruitment manage card" />
          </div>
        </div>
      </div>
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={handleToUpdateProfile}
        contentConfirm={
          user.r_profile.tax_code !== ""
            ? "Your profile is pending approval. Do you want to update again?"
            : "You need to have your profile Verified to continue."
        }
      />
    </div>
  );
}

export default RecruiterHomePage;