import { GENDER } from 'constants/global';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './UpdateStudentInfoForm.scss';

UpdateStudentInfoForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  close: PropTypes.func,
  isUpdate: PropTypes.bool,
};

UpdateStudentInfoForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  close: null,
  isUpdate: false,
}

function UpdateStudentInfoForm(props) {
  const { initialValues, onSubmit, close, isUpdate } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .typeError('Email is required')
      .required('Email is required'),
    last_name: Yup
      .string()
      .typeError('Last name is required')
      .required('Last name is required'),
      // .min(5, "Last name must be at least 5 characters"),
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
      // .min(5, "Nationality must be at least 10 characters"),
    gender: Yup
      .string()
      .typeError('Gender is required')
      .required("Gender is required"),
    job_title: Yup
      .string()
      .typeError('Job title is required')
      .required("Gender is required")
  });

  const onSubmitForm = async (values) => {
    await onSubmit(values);
    isUpdate && close();
  }

  return (
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
            />

            <div className="phone-gender">
              <FastField
                name="phone_number"
                component={InputField}

                label="Phone Number"
                moreClassName="width-50 mr-4"
              />

              <FastField
                name="gender"
                component={SelectField}

                label="Gender"
                moreClassName="width-30"
                options={GENDER}
                isOptionValue={true}
              // moreClassName="width-60"
              />
            </div>

            <FastField
              name="address"
              component={InputField}

              label="Address"
            />

            <FastField
              name="date_of_birth"
              component={TextFieldDate}

              label="Date of Birth"
              type="date"
              moreClassName="text-field-date"
            />

            <FastField
              name="nationality"
              component={InputField}

              label="Nationality"
            // moreClassName="width-60"
            />

            <FormGroup className="update-student-form-btn-group">
              <Button
                type="submit"
                color={'success'}
                // className="update-student-form-btn-group__btn-update"
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

export default UpdateStudentInfoForm;