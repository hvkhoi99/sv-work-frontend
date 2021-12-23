import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './UpdateCompanyInfoForm.scss';

UpdateCompanyInfoForm.propTypes = {
  initialValues: PropTypes.object
};

UpdateCompanyInfoForm.defaultProps = {
  initialValues: {}
}

function UpdateCompanyInfoForm(props) {
  const { initialValues } = props;

  const validationSchema = Yup.object().shape({

  });

  // npm i --save react-select
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {formikProps => {
        // do something here ...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="name"
              component={InputField}

              label="Company Name"
            />

            <FastField
              name="location"
              component={InputField}

              label="Location"
            />

            <FastField
              name="phoneNumber"
              component={InputField}

              label="Phone Number"
            />

            <FastField
              name="contactEmail"
              component={InputField}

              label="Contact Email"
            />

            <FastField
              name="companyIndustry"
              component={InputField}

              label="Company Industry"
            />

            <FastField
              name="companySize"
              component={InputField}

              label="Company Size"
            />

            <FormGroup className="formGroup-label">
              <label>Verify Option</label>
            </FormGroup>

            <FastField
              name="taxCode"
              component={InputField}

              label="Tax Code"
            />

            <FormGroup className="formGroup-button">
              <Button type="submit" color={'success'} className="formGroup-button__btn-update"> 
                {isSubmitting && <Spinner size="sm" />}
                {'Update'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UpdateCompanyInfoForm;