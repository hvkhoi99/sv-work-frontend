import PopupConfirm from 'components/PopupConfirm';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './UpdateCompanyInfoForm.scss';

UpdateCompanyInfoForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  close: PropTypes.func,
  isUpdate: PropTypes.bool,
  isUpdateWithPopup: PropTypes.bool,
};

UpdateCompanyInfoForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  close: null,
  isUpdate: false,
  isUpdateWithPopup: false,
}

function UpdateCompanyInfoForm(props) {
  const { initialValues, onSubmit, close, isUpdate, isUpdateWithPopup } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const validationSchema = Yup.object().shape({
    company_name: Yup
      .string()
      .required('Company Name is required')
      .typeError('Company Name is required')
      .min(5, "Company name must be at least 5 characters"),
    phone_number: Yup
      .string()
      .required('Phone Number is required')
      .typeError('Phone Number is required')
      // .matches(phoneRegExp, 'Phone number is not valid'),
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Must be only digits"),
    contact_email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required')
      .typeError('Email is required'),
    address: Yup
      .string()
      .required('Location is required')
      .typeError('Location is required')
      .min(10, "Location must be at least 10 characters"),
    company_industry: Yup
      .string()
      .required('Company Industry is required')
      .typeError('Company Industry is required')
      .min(10, "Company industry must be at least 10 characters"),
    company_size: Yup
      .string()
      .required("Company Size is required")
      .typeError('Company Size is required')
      .matches(/^[0-9]+$/, "Must be only digits"),
    tax_code: Yup
      .string()
      .required("Tax Code is required")
      .typeError('Tax Code is required')
  });

  const onSubmitForm = async (values) => {
    setIsUpdating(true);
    await onSubmit(values);
    setIsUpdating(false);
    isUpdateWithPopup && close();
  }
  
  const onShow = (value) => {
    setShow(value);
  }
  
  const onUpdateProfileWithTaxCode = async (values) => {
    if (isUpdate || isUpdateWithPopup) {
      if (values.tax_code !== "" && values.tax_code !== initialValues.tax_code) {
        setValues(values);
        onShow(true);
        return;
      }
    }
    await onSubmitForm(values);
    close();
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onUpdateProfileWithTaxCode}
      >
        {formikProps => {
          const { isSubmitting } = formikProps;

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
                labelClassName="tax-code"
              />

              <FormGroup className="formGroup-button">
                <Button
                  type="submit"
                  color={'success'}
                  className="formGroup-button__btn-update"
                  disabled={isSubmitting || isUpdating}
                >
                  {(isSubmitting || isUpdating) && <Spinner children="" size="sm" />}
                  &nbsp;Update
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
      <PopupConfirm
        show={show}
        onShow={onShow}
        onOK={async () => await onSubmitForm(values)}
        titleConfirm="Update Recruiter Profile"
        contentConfirm={
          `Your "Tax Code" has just changed. 
          If you select "OK", you will not be able to create new jobs until your profile is verified by the Administrator. 
          Are you sure to continue?`
        }
      />
    </>
  );
}

export default UpdateCompanyInfoForm;