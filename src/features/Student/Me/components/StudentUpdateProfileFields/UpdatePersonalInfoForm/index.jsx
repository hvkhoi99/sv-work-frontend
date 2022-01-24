import React from 'react';
import './UpdatePersonalInfoForm.scss';
import PropTypes from 'prop-types';
import { FastField, Form, Formik } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { GENDER } from 'constants/global';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

UpdatePersonalInfoForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  close: PropTypes.func,
};

UpdatePersonalInfoForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  close: null,
};

function UpdatePersonalInfoForm(props) {
  const { initialValues, onSubmit, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    last_name: Yup
      .string()
      .typeError('Last Name is required')
      .required('Last Name is required'),
    // .min(5, "Last name must be at least 5 characters"),
    
    job_title: Yup
      .string()
      .typeError('Job Title is required')
      .required("Job Title is required"),
    email: Yup
      .string()
      .email('Email is invalid')
      .typeError('Email is required')
      .required('Email is required'),
    date_of_birth: Yup
      .string()
      .typeError('Date of Birth is required')
      .required('Date of Birth is required'),
    phone_number: Yup
      .string()
      .typeError('Phone number is required')
      .required('Phone number is required')
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Must be only digits"),
    address: Yup
      .string()
      .typeError('Address is required')
      .required('Address is required')
      .min(10, "Address must be at least 10 characters"),
    nationality: Yup
      .string()
      .typeError('Nationality is required')
      .required('Nationality is required'),
    gender: Yup
      .string()
      .typeError('Gender is required')
      .required("Gender is required")
  });

  const onSubmitForm = async (values) => {
    await onSubmit(values);
    close();
  }

  return (
    <div className="update-personal-info-form">
      <div className="update-personal-info-form__header">
        <span>Update Personal Info</span>
        <div className="update-personal-info-form__header__dot" />
      </div>
      <div className="update-personal-info-form__main">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitForm}
        >
          {formikProps => {
            const { isSubmitting } = formikProps;

            return (
              <Form>
                <div className="first-last-name">
                  <FastField
                    name="first_name"
                    component={InputField}

                    label="First Name"
                    moreClassName="width-100 mr-4"
                  />
                  <FastField
                    name="last_name"
                    component={InputField}

                    label="Last Name"
                    moreClassName="width-100"
                  />
                </div>

                <FastField
                  name="job_title"
                  component={InputField}

                  label="Job Title"
                />

                <FastField
                  name="email"
                  component={InputField}

                  label="Email"
                // labelClassName="input-field-label"
                />

                <div className="phone-gender">
                  <FastField
                    name="phone_number"
                    component={InputField}

                    label="Phone Number"
                    moreClassName="width-50 mr-4"
                  // labelClassName="input-field-label"
                  />

                  <FastField
                    name="gender"
                    component={SelectField}

                    label="Gender"
                    moreClassName="width-30"
                    options={GENDER}
                    isOptionValue={true}
                  // labelClassName="input-field-label"
                  />
                </div>

                <FastField
                  name="address"
                  component={InputField}

                  label="Address"
                // labelClassName="input-field-label"
                />

                <FastField
                  name="date_of_birth"
                  component={TextFieldDate}

                  label="Date of Birth"
                  type="date"
                  moreClassName="text-field-date"
                  inputClassName="text-field-date-width"
                // labelClassName="input-field-label"
                />

                <FastField
                  name="nationality"
                  component={InputField}

                  label="Nationality"
                // labelClassName="input-field-label"
                />

                <FormGroup className="update-student-personal-form-btn-group">
                  <Button
                    type="submit"
                    color={'success'}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Spinner children="" size="sm" />}
                    &nbsp;Update
                  </Button>

                  <Button
                    type="submit"
                    color="secondary"
                    onClick={close}
                  >
                    &nbsp;Cancel
                  </Button>
                </FormGroup>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default UpdatePersonalInfoForm;