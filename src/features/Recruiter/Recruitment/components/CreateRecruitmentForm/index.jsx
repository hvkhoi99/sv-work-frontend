import { JOB_CATEGORY_OPTIONS, JOB_TYPE_OPTIONS } from 'constants/global';
import DatePickerField from 'custom-fields/DatePickerField';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import { Button, FormGroup, Label, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import DivAreaText from '../DivAreaText';
import './CreateRecruitmentForm.scss';

CreateRecruitmentForm.propTypes = {
};

function CreateRecruitmentForm(props) {
  var initialValues = {
    jobName: '',
    typeOfJob: '',
    jobCategory: '',
    location: '',
    description: '',
    minSalary: '',
    maxSalary: '',
    benefits: '',
    expiryDate: ''
  };
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    jobName: Yup
      .string()
      .required('Job Name is required'),
    typeOfJob: Yup
      .string()
      .required('Type of Job is required'),
    jobCategory: Yup
      .string()
      .required('Job Category is required'),
    location: Yup
      .string()
      .required('Location is required'),
    // description: Yup
    //   .string()
    //   .required('Description is required')
    //   .min(10, "Description must be at least 10 characters"),
    minSalary: Yup
      .string()
      .required('Min Salary is required')
      .matches(/^[0-9]+$/, "Must be only digits"),
    maxSalary: Yup
      .string()
      .required('Max Salary is required')
      .matches(/^[0-9]+$/, "Must be only digits"),
    // benefits: Yup
    //   .string()
    //   .required('Benefits is required')
    //   .min(10, "Benefits must be at least 10 characters"),
    // expiryDate: Yup
    //   .string()
    //   .required('Expiry Date is required')
  });

  const onTextChange = (currentData) => {
    setDescription(currentData);
  }

  const onBenefitsChange = (currentData) => {
    setBenefits(currentData);
  }

  const onRereshField = (name) => {
    switch (name) {
      case "description":
        setDescription("");
        break;
      case "benefits":
        setBenefits("");
        break;
      default:
        break;
    }
  }

  const handleClick = () => {
    setIsSubmit(true);
  }

  const onSubmit = (values) => {
    console.log({ ...values, description: description, benefits: benefits })
  }

  return (
    <div className="create-recruitment-form">
      <div className="create-recruitment-form__container">
        <div className="create-recruitment-form__container__title">
          <MdIcons.MdWork className="create-recruitment-form__container__title__icon" />
          <span className="create-recruitment-form__container__title__form-title">
            Create a Recruitment
          </span>
        </div>
        <div className="create-recruitment-form__container__form">
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
                    name="jobName"
                    component={InputField}

                    label="Job Name"
                    placeholder=""
                  />

                  <FastField
                    name="typeOfJob"
                    component={SelectField}

                    label="Type of Job"
                    placeholder=""
                    options={JOB_TYPE_OPTIONS}
                  />

                  <FastField
                    name="jobCategory"
                    component={SelectField}

                    label="Job Category"
                    placeholder=""
                    options={JOB_CATEGORY_OPTIONS}
                  />

                  <FastField
                    name="location"
                    component={InputField}

                    label="Location"
                    placeholder=""
                  />

                  <DivAreaText
                    name="description"

                    label="Description"
                    textValue={description}
                    onTextChange={onTextChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                  />

                  <div className="formGroup-salary">
                    <FastField
                      name="minSalary"
                      component={InputField}

                      label="Min Salary"
                    />

                    <span className="formGroup-salary__span">~</span>

                    <FastField
                      name="maxSalary"
                      component={InputField}

                      label="Max Salary"
                    />
                  </div>

                  <DivAreaText
                    name="benefits"

                    label="Benefits"
                    textValue={benefits}
                    onTextChange={onBenefitsChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                  />

                  <FormGroup>
                    <div className="formGroup-text-editor__title">
                      <Label style={{
                        fontWeight: "500"
                      }}>Expiry Date</Label>
                    </div>
                    <DatePickerField 
                    name="expiryDate" 
                    label="Expiry Date"
                    isSubmit={isSubmit}
                    />
                  </FormGroup>

                  <FormGroup className="formGroup-btn-publish">
                    <Button type="submit" color={'success'} onClick={handleClick}>
                      {isSubmitting && <Spinner children="" size="sm" />}
                      {'Publish'}
                    </Button>
                  </FormGroup>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateRecruitmentForm;