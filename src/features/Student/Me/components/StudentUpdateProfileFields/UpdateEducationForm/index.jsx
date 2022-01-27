import InputField from 'custom-fields/InputField';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
// import './UpdateExperienceForm.scss';

UpdateEducationForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  close: PropTypes.func,
};

UpdateEducationForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  close: null,
}

function UpdateEducationForm(props) {
  const { initialValues, onSubmit, isUpdate, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    school: Yup
      .string()
      .typeError('School is required')
      .min(5, "School must be at least 5 characters")
      .required('School is required'),
      from_date: Yup
      .string()
      .typeError('From Date is required')
      .required('From Date is required'),
      to_date: Yup
      .string()
      .typeError('To Date is required')
      .required('To Date is required'),
      major: Yup
      .string()
      .typeError('Major is required')
      .min(5, "Major must be at least 5 characters")
      .required("Major is required"),
      achievements: Yup
      .string()
      .typeError('Achievements is required')
      .min(5, "Achievements must be at least 5 characters")
      .required("Achievements is required"),
  });

  const onSubmitForm = async (values) => {
    await onSubmit(values);
    close();
  }

  return (
    <div className="update-personal-info-form">
      <div className="update-personal-info-form__header">
        <span>
          {
            isUpdate ? "Update Education" : "Create an Education"
          }
        </span>
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
                <FastField
                  name="school"
                  component={InputField}

                  label="School"
                  placeholder="Eg: Back Khoa"
                />

                <div className="from-to-date">
                  <FastField
                    name="from_date"
                    component={TextFieldDate}

                    label="From Date"
                    type="date"
                    moreClassName="text-field-date"
                    inputClassName="text-field-date-width"
                  // labelClassName="input-field-label"
                  />
                  <FastField
                    name="to_date"
                    component={TextFieldDate}

                    label="To Date"
                    type="date"
                    moreClassName="text-field-date"
                    inputClassName="text-field-date-width"
                  // labelClassName="input-field-label"
                  />
                </div>

                <FastField
                  name="major"
                  component={InputField}

                  label="Major"
                  placeholder="Eg: Software engineering"
                />

                <FastField
                  name="achievements"
                  component={InputField}

                  label="Achievement"
                  placeholder="Eg: Good - GPA 8.0"
                />

                <FormGroup className="update-student-personal-form-btn-group">
                  <Button
                    type="submit"
                    color={'success'}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Spinner children="" size="sm" className="mr-2"/>}
                    &nbsp;Update
                  </Button>

                  <Button
                    type="button"
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

export default UpdateEducationForm;