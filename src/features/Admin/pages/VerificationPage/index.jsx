import Images from 'constants/images';
import CompanyInfoForm from 'custom-fields/CompanyInfoForm';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, FormGroup } from 'reactstrap';
import './verification.scss';

import * as AiIcons from 'react-icons/ai';

VerificationPage.propTypes = {

};

function VerificationPage(props) {
  var [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (state) => {
    switch (state) {
      case "previous":
        if (currentPage === 1) return;
        setCurrentPage(--currentPage);
        break;
      case "next":
        if (currentPage === 10) return;
        setCurrentPage(++currentPage);
        break;
      default: break;
    }

    console.log(currentPage);
  }

  const initialValues = {
    companyName: '',
    location: '',
    phoneNumber: '',
    companyIndustry: '',
    companySize: '',
    taxtCode: ''
  }

  // const validationSchema = Yup.object().shape({
  //   title: Yup.string().required('This field is required'),

  //   categoryId: Yup.number().required('This field is required').nullable(),

  //   photo: Yup.string().when('categoryId', {
  //     is: 1,
  //     then: Yup.string().required('This field is required'),
  //     otherwise: Yup.string()
  //   })
  // })

  return (
    <>
      <div className="verification">
        <div className="nav__span">
          <svg
            width='237'
            height='21'
            viewBox='0 0 237 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9.992 20H13.256V2.48H9.992V9.656H3.272V2.48H0.00800008V20H3.272V12.776H9.992V20ZM22.1538 20.288C25.3218 20.288 27.4818 18.776 28.7058 16.496L26.0418 14.96C25.3698 16.472 23.9778 17.432 22.1538 17.432C19.8498 17.432 18.2898 16.112 17.8338 14.12H29.2578V12.896C29.2578 8.744 26.2098 5.672 22.0338 5.672C17.9298 5.672 14.7378 8.912 14.7378 13.016C14.7378 17.072 17.7378 20.288 22.1538 20.288ZM22.0338 8.528C24.0498 8.528 25.4898 9.512 25.9698 11.408H18.0018C18.5778 9.68 20.0898 8.528 22.0338 8.528ZM30.7094 20H33.9734V2.24H30.7094V20ZM35.9594 20H39.2234V2.24H35.9594V20ZM47.9083 20.288C51.9403 20.288 55.1803 17.024 55.1803 12.992C55.1803 8.888 51.9403 5.672 47.9083 5.672C43.8523 5.672 40.6363 8.888 40.6363 12.992C40.6363 17.024 43.8523 20.288 47.9083 20.288ZM47.9083 17.24C45.5803 17.24 43.8283 15.32 43.8283 12.992C43.8283 10.616 45.5803 8.72 47.9083 8.72C50.2123 8.72 51.9883 10.616 51.9883 12.992C51.9883 15.32 50.2123 17.24 47.9083 17.24ZM61.9147 20H65.3227L66.4027 16.88H73.1947L74.2747 20H77.6827L71.4427 2.48H68.1547L61.9147 20ZM69.8107 7.112L72.1147 13.76H67.5067L69.8107 7.112ZM84.5795 20.288C86.4275 20.288 88.1075 19.496 89.1395 18.176V20H92.3795V2.24H89.1155V7.616C88.0835 6.392 86.4515 5.672 84.6275 5.672C81.0755 5.672 77.6675 8.336 77.6675 12.992C77.6675 17.6 81.1955 20.288 84.5795 20.288ZM85.1075 17.312C82.7075 17.312 80.8595 15.392 80.8595 12.944C80.8595 10.52 82.7075 8.624 85.1075 8.624C87.5315 8.624 89.3075 10.544 89.3075 12.944C89.3075 15.368 87.5315 17.312 85.1075 17.312ZM94.2251 20H97.4651V12.224C97.4651 9.728 98.8091 8.48 100.633 8.48C102.577 8.48 103.585 9.704 103.585 11.72V20H106.873V12.152C106.873 9.68 108.217 8.48 109.969 8.48C111.985 8.48 113.017 9.776 113.017 11.816V20H116.329V11.552C116.329 7.88 114.433 5.672 110.617 5.672C108.601 5.672 106.969 6.632 106.009 8.096C105.169 6.56 103.657 5.672 101.449 5.672C99.7211 5.672 98.3291 6.416 97.4411 7.592V5.96H94.2251V20ZM118.178 20H121.442V5.96H118.178V20ZM117.77 2.528C117.77 3.752 118.49 4.544 119.81 4.544C121.082 4.544 121.85 3.752 121.85 2.528C121.85 1.304 121.082 0.487999 119.81 0.487999C118.562 0.487999 117.77 1.304 117.77 2.528ZM123.311 20H126.551V12.296C126.551 9.824 127.991 8.48 129.839 8.48C131.951 8.48 133.007 9.824 133.007 12.008V20H136.295V11.672C136.295 7.856 134.255 5.672 130.727 5.672C128.903 5.672 127.463 6.464 126.527 7.688V5.96H123.311V20ZM138.17 20H141.434V5.96H138.17V20ZM137.762 2.528C137.762 3.752 138.482 4.544 139.802 4.544C141.074 4.544 141.842 3.752 141.842 2.528C141.842 1.304 141.074 0.487999 139.802 0.487999C138.554 0.487999 137.762 1.304 137.762 2.528ZM148.583 20.288C152.591 20.288 154.343 17.672 154.343 15.704C154.343 12.752 151.703 11.936 149.399 11.48C147.287 11.024 146.183 10.784 146.183 9.848C146.183 9.056 146.903 8.336 148.439 8.336C149.783 8.336 150.839 8.96 151.415 9.944L154.175 8.552C153.095 6.752 151.295 5.648 148.439 5.648C145.103 5.648 142.919 7.688 142.919 9.944C142.919 12.896 145.439 13.664 147.839 14.168C149.567 14.552 151.127 14.744 151.127 15.776C151.127 16.712 150.335 17.48 148.727 17.48C147.191 17.48 146.015 16.76 145.343 15.44L142.343 16.88C143.471 19.088 145.439 20.288 148.583 20.288ZM154.987 8.864H157.387V14.144C157.387 18.608 158.707 20 163.051 20H163.507V16.952C161.011 16.952 160.651 16.568 160.651 14.12V8.864H163.507V5.96H160.651V1.592L157.387 3.824V5.96H154.987V8.864ZM165.077 20H168.317V12.512C168.317 10.088 169.301 9.08 171.197 9.08C172.133 9.08 172.661 9.32 173.141 9.632L174.365 6.56C173.717 6.2 172.925 5.96 171.893 5.96C170.141 5.96 168.941 6.656 168.293 8.048V5.96H165.077V20ZM181.4 20.288C183.248 20.288 184.928 19.496 185.96 18.176V20H189.2V5.96H185.96V7.64C184.928 6.416 183.296 5.672 181.448 5.672C177.896 5.672 174.488 8.336 174.488 12.992C174.488 17.6 178.016 20.288 181.4 20.288ZM181.928 17.312C179.528 17.312 177.68 15.392 177.68 12.944C177.68 10.52 179.528 8.624 181.928 8.624C184.352 8.624 186.128 10.544 186.128 12.944C186.128 15.368 184.352 17.312 181.928 17.312ZM190.541 8.864H192.941V14.144C192.941 18.608 194.261 20 198.605 20H199.061V16.952C196.565 16.952 196.205 16.568 196.205 14.12V8.864H199.061V5.96H196.205V1.592L192.941 3.824V5.96H190.541V8.864ZM206.979 20.288C211.011 20.288 214.251 17.024 214.251 12.992C214.251 8.888 211.011 5.672 206.979 5.672C202.923 5.672 199.707 8.888 199.707 12.992C199.707 17.024 202.923 20.288 206.979 20.288ZM206.979 17.24C204.651 17.24 202.899 15.32 202.899 12.992C202.899 10.616 204.651 8.72 206.979 8.72C209.283 8.72 211.059 10.616 211.059 12.992C211.059 15.32 209.283 17.24 206.979 17.24ZM215.678 20H218.918V12.512C218.918 10.088 219.902 9.08 221.798 9.08C222.734 9.08 223.262 9.32 223.742 9.632L224.966 6.56C224.318 6.2 223.526 5.96 222.494 5.96C220.742 5.96 219.542 6.656 218.894 8.048V5.96H215.678V20Z'
              fill='#404040'
            />
            <path
              d='M226.486 15.584C226.486 18.656 228.406 20.768 231.67 20.768C234.934 20.768 236.918 18.656 236.918 15.584C236.918 12.448 234.998 10.336 231.734 10.336C228.47 10.336 226.486 12.448 226.486 15.584Z'
              fill='#0DAB42'
            />
          </svg>
          <img src={Images.emoji} style={{ marginLeft: "1.5rem" }} alt='emoji' />
        </div>
        <div className="verification__main">
          <div className="verification__company">
            <div className="verification__company__item">
              <img src={Images.fptSoftware} alt="emoji" />
              <div>
                <span className="verification__company__name">Company name</span>
                <span className="verification__company__industry">Ind</span>
              </div>
            </div>
            <div className="verification__company__item">
              <img src={Images.fptSoftware} alt="emoji" />
              <div>
                <span className="verification__company__name">Company name</span>
                <span className="verification__company__industry">Ind</span>
              </div>
            </div>
            <div className="verification__company__item">
              <img src={Images.fptSoftware} alt="emoji" />
              <div>
                <span className="verification__company__name">Company name</span>
                <span className="verification__company__industry">Ind</span>
              </div>
            </div>
            <div className="verification__company__item">
              <img src={Images.fptSoftware} alt="emoji" />
              <div>
                <span className="verification__company__name">Company name</span>
                <span className="verification__company__industry">Ind</span>
              </div>
            </div>
            <div className="verification__company__item">
              <img src={Images.fptSoftware} alt="emoji" />
              <div>
                <span className="verification__company__name">Company name</span>
                <span className="verification__company__industry">Ind</span>
              </div>
            </div>
            <div>
              <Button disabled={currentPage === 1 && true} color={currentPage === 1 ? "secondary" : "primary"} onClick={() => handlePageClick("previous")}>
                Prev
              </Button>
              <Button style={{ marginLeft: "1rem" }} disabled={currentPage === 10 && true} color={currentPage === 10 ? "secondary" : "primary"} onClick={() => handlePageClick("next")}>
                Next
              </Button>
            </div>
          </div>

          <div className="verification__detail">
            <div className="verification__detail__form">
              <div className="verification__detail__form__title">
                <span>Company Info</span>
                <img src={Images.smDot} alt="smDot" />
              </div>
              <Formik
                initialValues={initialValues}
              >
                {formikProps => {

                  const { values, errors, touched } = formikProps;
                  console.log({ values, errors, touched });

                  return (
                    <Form>
                      <CompanyInfoForm disabled={true} />

                      <FormGroup className="verification__button-group">
                        <Button type="submit" color={"success"}>
                          Approve
                        </Button>
                        <Button style={{marginLeft: "1.5rem"}} type="submit" color={"secondary"}>
                          Reject
                        </Button>
                      </FormGroup>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerificationPage;