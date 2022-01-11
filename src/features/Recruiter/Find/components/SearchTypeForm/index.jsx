import { GENDER, JOB_TAGS_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

SearchTypeForm.propTypes = {
  onSubmit: PropTypes.func
};

SearchTypeForm.defaultProps = {
  onsubmit: null
}

function SearchTypeForm(props) {
  const { onSubmit } = props;

  const initialValues = {
    career: '',
    location: '',
    language: '',
    gender: '',
    education: '',
  };

  const validationSchema = Yup.object().shape({
    gender: Yup
      .string()
      .typeError('Type of Job is required')
      .required('Type of Job is required'),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formikProps => {
          const { isSubmitting } = formikProps;

          return (
            <Form>
              <FastField
                name="career"
                component={SelectField}

                label="Career"
                placeholder="Eg: Designer"
                // options={GENDER}
                isCreatableSelect={true}
              />

              <FastField
                name="location"
                component={SelectField}

                label="Location"
                placeholder="Eg: Da Nang"
                // options={GENDER}
                isCreatableSelect={true}
              />

              <FastField
                name="language"
                component={SelectField}

                label="Language"
                placeholder="Eg: English"
                // options={GENDER}
                isCreatableSelect={true}
              />

              <FastField
                name="gender"
                component={SelectField}

                label="Gender"
                placeholder="Male"
                options={GENDER}
                // isCreatableSelect={true}
                isOptionValue={true}
              />
              <FastField
                name="education"
                component={SelectField}

                label="Education"
                placeholder="Eg: Bach Khoa"
                options={JOB_TAGS_OPTIONS}
                isCreatableSelect={true}
              />

              <FormGroup>
                <Button
                  disabled={isSubmitting}
                  style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                  type="submit"
                  color={'success'}
                  className="candidates-search-button"
                >
                  {isSubmitting && <Spinner className="mr-2" children="" size="sm" />}
                  {isSubmitting ? "Searching" : "Search"}
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default SearchTypeForm;