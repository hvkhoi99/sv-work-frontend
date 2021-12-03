import Images from 'constants/images';
import CompanyInfoForm from 'custom-fields/CompanyInfoForm';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import './verification.scss';


VerificationPage.propTypes = {

};

function VerificationPage(props) {
  var [currentPage, setCurrentPage] = useState(1);
  
  const match = useRouteMatch();
  console.log(match)

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