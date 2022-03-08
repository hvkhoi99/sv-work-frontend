import PaginationSimple from 'components/PaginationSimple';
import Images from 'constants/images';
import CompanyInfoForm from 'custom-fields/CompanyInfoForm';
import CompanyCard from 'features/Admin/components/CompanyCard';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, FormGroup } from 'reactstrap';
import helper from 'utils/common';
import './verification.scss';
import * as RiIcons from 'react-icons/ri';

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

  useEffect(() => {
    helper.scrollToTop();
  }, []);

  return (
    <>
      {
        <div className="verification">
          <div className="verification__main">
            <div className="verification__company">
              {recruiters.map((recruiter, index) => {
                const className = activeIndex === index ? "company-card company-card--visited" : "company-card";
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
              {
                recruiters.length > 0
                  ? <PaginationSimple
                    handlePageClick={handlePageClick}
                    currentPage={currentPage}
                    lastPage={lastPage}
                  />
                  // : <div className="no-available">
                  //   <span>There are currently no articles available</span>
                  // </div>
                  : <div className="find-candidates__container__pagination__not-found__info">
                    <RiIcons.RiErrorWarningFill
                      className="find-candidates__container__pagination__not-found__info__icon"
                    />
                    <span>There are currently no articles available.</span>
                  </div>

              }
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
      }
    </>
  );
}

export default VerificationPage;