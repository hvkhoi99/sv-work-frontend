import { JOB_TAGS_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

UpdateSkillsForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isUpdate: PropTypes.bool,
  close: PropTypes.func,
};

UpdateSkillsForm.defaultProps = {
  initialValues: {},
  onSubmit: null,
  isUpdate: false,
  close: null,
}

function UpdateSkillsForm(props) {
  const { initialValues, onSubmit, isUpdate, close } = props;
  // const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validationSchema = Yup.object().shape({
    skills: Yup
      .array()
      // .typeError('Skills is required')
      .min(1, 'Skills is required')
      .required('Skills is required'),
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
            isUpdate ? "Update Skills" : "Create Skills"
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
                  name="skills"
                  component={SelectField}

                  label="Skills"
                  labelClassName="input-field-label"
                  placeholder="Eg: ReactJS"
                  options={JOB_TAGS_OPTIONS}
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

export default UpdateSkillsForm;