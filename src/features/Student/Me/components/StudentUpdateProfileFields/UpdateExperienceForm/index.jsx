import InputField from 'custom-fields/InputField';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './UpdateExperienceForm.scss';

UpdateExperienceForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  close: PropTypes.func,
};

UpdateExperienceForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  close: null,
}

function UpdateExperienceForm(props) {
  const { initialValues, onSubmit, isUpdate, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    position: Yup
      .string()
      .typeError('Position is required')
      .required('Position is required'),
    company: Yup
      .string()
      .typeError('Company Name is required')
      .min(5, "Description must be at least 5 characters")
      .required("Company Name is required"),
    from_date: Yup
      .string()
      .typeError('From Date is required')
      .required('From Date is required'),
    to_date: Yup
      .string()
      .typeError('To Date is required')
      .required('To Date is required'),
    description: Yup
      .string()
      .typeError('Description is required')
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
  });

  const onSubmitForm = async (values, actions) => {
    await onSubmit(values);
    actions.setSubmitting(false);
    close();
  }

  return (
    <div className="update-personal-info-form">
      <div className="update-personal-info-form__header">
        <span>
          {
            isUpdate ? "Update Experience" : "Create an Experience"
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
                  name="position"
                  component={InputField}

                  label="Position"
                />

                <FastField
                  name="company"
                  component={InputField}

                  label="Company Name"
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
                  name="description"
                  component={InputField}

                  label="Description"
                  type="textarea"
                  isTextArea={true}
                  // inputClassName="width-100"
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

export default UpdateExperienceForm;