import React from 'react';
import CreateRecruitmentForm from '../../components/CreateRecruitmentForm';
// import PropTypes from 'prop-types';
import './CreateRecruitment.scss';

CreateRecruitmentPage.propTypes = {
  
};

function CreateRecruitmentPage(props) {
  return (
    <div className="create-recruitment">
      <div className="create-recruitment__container">
        <CreateRecruitmentForm />
      </div>
    </div>
  );
}

export default CreateRecruitmentPage;