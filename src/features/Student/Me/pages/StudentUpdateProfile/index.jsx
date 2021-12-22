import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import './StudentUpdateProfile.scss';

StudentUpdateProfilePage.propTypes = {

};

function StudentUpdateProfilePage(props) {
  return (
    <>
      <Header />
      <div className="edit-profile">
        Student edit profile page
      </div>
      <Footer />
    </>
  );
}

export default StudentUpdateProfilePage;