import Images from 'constants/images';
import React from 'react';
import * as GoIcons from 'react-icons/go';
import './RecruiterHome.scss';

RecruiterHomePage.propTypes = {

};

function RecruiterHomePage(props) {
  return (
    <div className="recruiter-home">
      <div className="recruiter-home__container">
        <div className="recruiter-home__container__recruitment">
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
              <button className="btn btn-success btn-sm">Create</button>
            </div>
          </div>
        </div>
        <div className="recruiter-home__container__find-candidates">
          <div className="recruiter-home__container__find-candidates__left">
            <div className="recruiter-home__container__find-candidates__left__title">
              <h3>Searching candidates</h3>
              <GoIcons.GoPrimitiveDot className="dot-icon" />
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id maxime minus fugiat iste facilis dolorum quae voluptatem? Ipsam, explicabo eum accusamus labore itaque sunt nesciunt inventore voluptatum magnam. Alias, sit!</p>
            <div className="recruiter-home__container__find-candidates__left__button">
              <button className="btn btn-success btn-sm">Search</button>
            </div>
          </div>
          <div className="recruiter-home__container__find-candidates__right">
            <img src={Images.searchCard} alt="search card" />
          </div>
        </div>
        <div className="recruiter-home__container__recruitment-management">
          <div className="recruiter-home__container__recruitment-management__top">
            <div className="recruiter-home__container__recruitment-management__top__title">
              <h3>Recruitment Management</h3>
              <GoIcons.GoPrimitiveDot className="dot-icon" />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, expedita? Adipisci eum velit, aut eaque modi ea quibusdam doloribus doloremque, ducimus debitis culpa voluptate beatae id accusamus, praesentium molestiae. Hic.</p>
            <div className="recruiter-home__container__recruitment-management__top__button">
              <button className="btn btn-success btn-sm">Manage</button>
            </div>
          </div>
          <div className="recruiter-home__container__recruitment-management__bottom">
            <img src={Images.recruitmentManageCard} alt="recruitment manage card" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterHomePage;