import Images from 'constants/images';
import React from 'react';
import * as GoIcons from 'react-icons/go';
import AnotherCVCard from '../../components/AnotherCVCard';
import EducationsCard from '../../components/EducationsCard';
import ExperiencesCard from '../../components/ExperiencesCard';
import LanguagesCard from '../../components/LanguagesCard';
import PersonalInfoCard from '../../components/PersonalInfoCard';
import SkillsCard from '../../components/SkillsCard';
import CertificatesCard from '../../components/CertificatesCard';
// import PropTypes from 'prop-types';
import './Candidate.scss';

CandidatePage.propTypes = {

};

function CandidatePage(props) {
  return (
    <div className="candidate">
      <div className="candidate__above">
        <div className="candidate__above__img">
          <img src={Images.tw} alt="candidate-avatar" />
        </div>
        <span className="candidate__above__candidate-name">Candidate</span>
        <span className="candidate__above__candidate-job-title">UX/UI Designer</span>
        <div className="candidate__above__btn-group">
          <button className="btn btn-success btn-sm mr-4">Approve</button>
          <button className="btn btn-secondary btn-sm">Reject</button>
        </div>
        <div className="candidate__above__overview">
          <div className="candidate__above__overview__title">
            <span>Overview</span>
            <GoIcons.GoPrimitiveDot className="candidate__above__overview__title__dot" />
          </div>
          <div className="candidate__above__overview__description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Porro aspernatur nemo mollitia sint perspiciatis amet,
            excepturi suscipit provident possimus voluptate illum maxime velit alias recusandae.
            Explicabo maiores sapiente a quasi?
          </div>
        </div>
      </div>
      <div className="candidate__below">
        <div className="candidate__below__left">
          <PersonalInfoCard />
          <SkillsCard />
          <LanguagesCard />
          <AnotherCVCard />
        </div>
        <div className="candidate__below__right">
          <ExperiencesCard />
          <EducationsCard />
          <CertificatesCard />
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;