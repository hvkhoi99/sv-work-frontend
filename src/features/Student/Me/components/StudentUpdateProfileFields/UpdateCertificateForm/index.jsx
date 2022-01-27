import InputField from 'custom-fields/InputField';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
// import './UpdateExperienceForm.scss';

UpdateCertificateForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  close: PropTypes.func,
};

UpdateCertificateForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  close: null,
}

function UpdateCertificateForm(props) {
  const { initialValues, onSubmit, isUpdate, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    title: Yup
      .string()
      .typeError('Title is required')
      .min(5, "Title must be at least 5 characters")
      .max(255, "Title cannot be more than 255 characters")
      .required('Title is required'),
    issuing_organization: Yup
      .string()
      .typeError('Issuing Organization is required')
      .min(5, "Issuing Organization must be at least 5 characters")
      .max(255, "Issuing Organization cannot be more than 255 characters")
      .required("Issuing Organization is required"),
    description: Yup
      .string()
      .typeError('Description is required')
      .min(5, "Description must be at least 5 characters")
      .required("Description is required"),
    image_link: Yup
      .string()
      .typeError('Please enter website')
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url! Eg: https://www.google.com'
      )
      .required("Certificate Link is required"),
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
            isUpdate ? "Update Certificate" : "Create a Certificate"
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
                  name="title"
                  component={InputField}

                  label="Title"
                />

                <FastField
                  name="issuing_organization"
                  component={InputField}

                  label="Issuing Organization"
                />

                <FastField
                  name="description"
                  component={InputField}

                  label="Description"
                  type="textarea"
                  isTextArea={true}
                // inputClassName="width-100"
                // labelClassName="input-field-label"
                />

                <FastField
                  name="image_link"
                  component={TextFieldDate}

                  label="Link"
                  moreClassName="text-field-date"
                  labelClassName="input-field-label"
                // type="date"
                // inputClassName="text-field-date-width"
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

export default UpdateCertificateForm;