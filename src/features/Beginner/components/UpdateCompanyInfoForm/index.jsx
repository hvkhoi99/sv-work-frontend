import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './UpdateCompanyInfoForm.scss';

UpdateCompanyInfoForm.propTypes = {
  initialValues: PropTypes.object
};

UpdateCompanyInfoForm.defaultProps = {
  initialValues: {}
}

function UpdateCompanyInfoForm(props) {
  const { initialValues } = props;
  const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    company_name: Yup
      .string()
      .required('Company name is required')
      .min(5, "Company name must be at least 5 characters"),
    phone_number: Yup
      .string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid'),
    // .min(10, "Phone number is too short")
    // .max(11, "Phone number is too long"),
    contact_email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    address: Yup
      .string()
      .required('Location is required')
      .min(10, "Location must be at least 10 characters"),
    company_industry: Yup
      .string()
      .required('Company industry is required')
      .min(10, "Company industry must be at least 10 characters"),
    company_size: Yup
      .string()
      .required("Company size is required")
      .matches(/^[0-9]+$/, "Must be only digits"),
    tax_code: Yup
      .string()
      .required("Company size is required")
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {formikProps => {
        const { isSubmitting } = formikProps;
        // const { values, errors, touched, isSubmitting } = formikProps;
        // console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="company_name"
              component={InputField}

              label="Company Name"
            />

            <div className="formGroup-phone-email">
              <FastField
                name="phone_number"
                component={InputField}

                label="Phone Number"
                moreClassName="mr-4"
              />

              <FastField
                name="contact_email"
                component={InputField}

                label="Contact Email"
                moreClassName="width-60"

              />
            </div>

            <FastField
              name="address"
              component={InputField}

              label="Location"
              // moreClassName="width-100"
            />

            <div className="formGroup-industry-size">
              <FastField
                name="company_industry"
                component={InputField}

                label="Company Industry"
                moreClassName="width-60 mr-4"

              />

              <FastField
                name="company_size"
                component={InputField}

                label="Company Size"

              />
            </div>

            <FormGroup className="formGroup-label">
              <label>Verify Option</label>
            </FormGroup>

            <FastField
              name="tax_code"
              component={InputField}

              label="Tax Code"
            />

            <FormGroup className="formGroup-button">
              <Button 
              type="submit" 
              color={'success'} 
              className="formGroup-button__btn-update"
              disabled={isSubmitting}
              >
                {isSubmitting && <Spinner children="" size="sm" />}
                &nbsp;Update
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UpdateCompanyInfoForm;