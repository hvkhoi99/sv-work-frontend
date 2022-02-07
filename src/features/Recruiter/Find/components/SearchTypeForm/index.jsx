import { CAREER_OPTIONS, GENDER, LANGUAGE_OPTIONS, LOCATION_OPTIONS, SCHOOL_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Spinner } from 'reactstrap';

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
    locales: '',
    gender: '',
    school: '',
  };

  // const validationSchema = Yup.object().shape({
  //   gender: Yup
  //     .string()
  //     .typeError('Type of Job is required')
  //     .required('Type of Job is required'),
  // });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formikProps => {
          const { isSubmitting } = formikProps;

          return (
            <Form>
              <div className="search-type-form__above">
                <FastField
                  name="career"
                  component={SelectField}

                  label="Career"
                  placeholder="Eg: Designer"
                  options={CAREER_OPTIONS}
                  isCreatableSelect={true}
                  moreClassName="width-20"
                />

                <FastField
                  name="location"
                  component={SelectField}

                  label="Location"
                  placeholder="Eg: Da Nang"
                  options={LOCATION_OPTIONS}
                  isCreatableSelect={true}
                  moreClassName="width-20"
                />

                <FastField
                  name="locales"
                  component={SelectField}

                  label="Language"
                  placeholder="Eg: English"
                  options={LANGUAGE_OPTIONS}
                  isCreatableSelect={true}
                  moreClassName="width-20"
                />

                <FastField
                  name="gender"
                  component={SelectField}

                  label="Gender"
                  placeholder="Male"
                  options={GENDER}
                  // isCreatableSelect={true}
                  isOptionValue={true}
                  moreClassName="width-20"
                />
              </div>

              <div className="search-type-form__below">
                <FastField
                  name="school"
                  component={SelectField}

                  label="Education"
                  placeholder="Eg: Bach Khoa"
                  options={SCHOOL_OPTIONS}
                  isCreatableSelect={true}
                  moreClassName="width-20"
                />
                <Button
                  disabled={isSubmitting}
                  style={isSubmitting ? { cursor: "default" } : { cursor: "pointer" }}
                  type="submit"
                  color={'success'}
                >
                  {isSubmitting && <Spinner className="mr-2" children="" size="sm" />}
                  {isSubmitting ? "Searching" : "Search"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default SearchTypeForm;