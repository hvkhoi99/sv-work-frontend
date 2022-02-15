import { LANGUAGE_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

UpdateLanguagesForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  close: PropTypes.func,
};

UpdateLanguagesForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  close: null,
}

function UpdateLanguagesForm(props) {
  const { initialValues, onSubmit, isUpdate, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    locales: Yup
      .array()
      .typeError('Languages is required')
      .min(1, 'Languages is required')
      .required('Languages is required'),
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
            isUpdate ? "Update Languages" : "Create Languages"
          }
        </span>
        <div className="update-personal-info-form__header__dot" />
      </div>
      <div className="update-personal-info-form__more-info">
        <span>Please choose from some of the available languages below or create new ones!</span>
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
                  name="locales"
                  component={SelectField}

                  label="Languages"
                  labelClassName="input-field-label"
                  placeholder="Eg: ReactJS"
                  options={LANGUAGE_OPTIONS}
                  isMulti={true}
                  isCreatableSelect={true}
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

export default UpdateLanguagesForm;