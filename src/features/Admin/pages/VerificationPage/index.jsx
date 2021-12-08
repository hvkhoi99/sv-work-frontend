import Images from 'constants/images';
import CompanyInfoForm from 'custom-fields/CompanyInfoForm';
import CompanyCard from 'features/Admin/components/CompanyCard';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import './verification.scss';

VerificationPage.propTypes = {
  handlePageClick: PropTypes.func,
  handleCompanyClick: PropTypes.func,
  handleVerifyCompany: PropTypes.func,
  recruiters: PropTypes.array,
  company: PropTypes.object,
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  activeIndex: PropTypes.number,
}

VerificationPage.defaultProps = {
  handlePageClick: null,
  handleCompanyClick: null,
  handleVerifyCompany: null,
  recruiters: [],
  company: {},
  currentPage: 1,
  lastPage: 1,
  activeIndex: null
}

function VerificationPage(props) {

  const {
    recruiters,
    handlePageClick,
    handleCompanyClick,
    handleVerifyCompany,
    currentPage,
    lastPage,
    company,
    activeIndex
  } = props;

  const isCompanyEmpty = (Object.keys(company).length === 0 && company.constructor === Object);

  const initialValues = {
    companyName: company.company_name,
    location: company.address,
    phoneNumber: company.phone_number,
    companyIndustry: company.company_industry,
    companySize: company.company_size,
    taxCode: company.tax_code
  };

  return (
    <div className="verification">
      <div className="verification__main">
        <div className="verification__company">
          {recruiters.map((recruiter, index) => {
            const className = activeIndex === index ? "company-card__item company-card__item--visited" : "company-card__item";
            return (
              <CompanyCard
                key={index}
                index={index}
                handleCompanyClick={handleCompanyClick}
                recruiter={recruiter}
                className={className}
              />
            )
          })}
          <div className="verification__company__button-group">
            <Button
              type="button"
              disabled={currentPage === 1 && true}
              color={currentPage === 1 ? "secondary" : "primary"}
              style={
                currentPage === 1 ? { cursor: "default" } : { cursor: "pointer" }
              }
              onClick={(e) => handlePageClick(e, 0)}
            >
              Prev
            </Button>
            <Button
              type="button"
              style={
                currentPage === lastPage ? { cursor: "default" } : { cursor: "pointer" }
              }
              cursor="default"
              disabled={currentPage === lastPage && true}
              color={currentPage === lastPage ? "secondary" : "primary"}
              onClick={(e) => handlePageClick(e, 1)}
            >
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

                // const { values, errors, touched } = formikProps;

                return (
                  <Form>
                    <CompanyInfoForm disabled={true} />

                    <FormGroup className="verification__button-group">
                      <Button
                        color={isCompanyEmpty ? 'secondary' : 'success'}
                        style={
                          isCompanyEmpty
                            ? {
                              cursor: "default",
                            } : {
                              cursor: "pointer",
                            }
                        }
                        disabled={isCompanyEmpty && true}
                        type="submit"
                        onClick={(e) => handleVerifyCompany(e, company, true)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="verification__button-group__reject"
                        style={
                          isCompanyEmpty
                            ? { cursor: "default" }
                            : { cursor: "pointer" }
                        }
                        disabled={isCompanyEmpty && true}
                        type="button"
                        color={"secondary"}
                        onClick={(e) => handleVerifyCompany(e, company, false)}
                      >
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
  );
}

export default VerificationPage;