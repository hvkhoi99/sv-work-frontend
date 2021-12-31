import { JOB_TAGS_OPTIONS, JOB_TYPE_OPTIONS } from 'constants/global';
import DatePickerField from 'custom-fields/DatePickerField';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import { Button, FormGroup, Label, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import DivAreaText from '../DivAreaText';
import './CreateRecruitmentForm.scss';

CreateRecruitmentForm.propTypes = {
  recruitment: PropTypes.object,
  isEditMode: PropTypes.bool
};

CreateRecruitmentForm.defaultProps = {
  recruitment: {},
  isEditMode: false
}

function CreateRecruitmentForm(props) {
  const { recruitment, isEditMode } = props;

  const initialValues = isEditMode
    ? recruitment
    : {
      title: '',
      is_full_time: '',
      job_category: '',
      expiry_date: '',
      benefits: '',
      description: '',
      requirement: '',
      min_salary: '',
      max_salary: '',
      location: '',
      hashtags: ''
    };

  const [benefits, setBenefits] = useState(recruitment.benefits);
  const [description, setDescription] = useState(recruitment.description);
  const [requirement, setRequirement] = useState(recruitment.requirement);
  const [isBeautiful, setIsBeautiful] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup
      .string()
      .typeError('Job Name is required')
      .required('Job Name is required'),
    is_full_time: Yup
      .string()
      .typeError('Type of Job is required')
      .required('Type of Job is required'),
    job_category: Yup
      // .array()
      // .min(1, 'Job Category is required')
      .string()
      .typeError('Job Category is required')
      .required('Job Category is required'),
    location: Yup
      .string()
      .typeError('Location is required')
      .required('Location is required'),
    min_salary: Yup
      .string()
      .typeError('Min Salary is required')
      .required('Min Salary is required')
      .matches(/^[0-9]+$/, "Must be only digits"),
    max_salary: Yup
      .string()
      .typeError('Max Salary is required')
      .required('Max Salary is required')
      .matches(/^[0-9]+$/, "Must be only digits"),
    expiry_date: Yup
      .string()
      .typeError('Expiry Date is required')
      .required('Expiry Date is required'),
    hashtags: Yup
      .array()
      // .typeError('Job Tags is required')
      .min(1, 'Job Tags is required')
      .required('Job Tags is required'),
  });

  const onBenefitsChange = (currentData) => {
    setBenefits(currentData);
  }

  const onTextChange = (currentData) => {
    setDescription(currentData);
  }

  const onRequirementChange = (currentData) => {
    setRequirement(currentData);
  }

  const onRereshField = (name) => {
    switch (name) {
      case "benefits":
        setBenefits("");
        break;
      case "description":
        setDescription("");
        break;
      case "requirement":
        setRequirement("");
        break;
      default:
        break;
    }
  }

  const handleClick = () => {
    setIsSubmit(true);
    setIsBeautiful((description.length <= 0 || benefits.length <= 0 || requirement.length <= 0) ? false : true);
  }

  const onSubmit = (values) => {
    if (!isBeautiful) {
      return
    } else {
      console.log({ 
        ...values, 
        is_full_time: "Full Time" ? true : false, 
        description: description, 
        benefits: benefits, 
        requirement: requirement,
        min_salary: parseInt(values.min_salary),
        max_salary: parseInt(values.max_salary),
        expiry_date: new Date(values.expiry_date)
      })
    }
  }

  return (
    <div className="create-recruitment-form">
      <div className="create-recruitment-form__container">
        <div className="create-recruitment-form__container__title">
          <MdIcons.MdWork className="create-recruitment-form__container__title__icon" />
          <span className="create-recruitment-form__container__title__form-title">
            {isEditMode ? "Update Recruitment" : "Create a Recruitment"}
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
                    name="title"
                    component={InputField}

                    label="Job Name"
                    placeholder=""
                  />

                  <FastField
                    name="is_full_time"
                    component={SelectField}

                    label="Type of Job"
                    placeholder=""
                    options={JOB_TYPE_OPTIONS}
                    isOptionValue={true}
                  />


                  {/* <FastField
                    name="job_category"
                    component={SelectField}

                    label="Job Category"
                    placeholder=""
                    options={JOB_CATEGORY_OPTIONS}
                    // isMulti={true}
                    isCreatableSelect={true}
                    isOptionValue={true}
                  /> */}

                  <FastField
                    name="job_category"
                    component={InputField}

                    label="Job Category"
                    placeholder=""
                  />

                  <DivAreaText
                    name="benefits"

                    label="Benefits"
                    textValue={benefits}
                    onTextChange={onBenefitsChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                  />

                  <DivAreaText
                    name="description"

                    label="Description"
                    textValue={description}
                    onTextChange={onTextChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                  />

                  <DivAreaText
                    name="requirement"

                    label="Requirement"
                    textValue={requirement}
                    onTextChange={onRequirementChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                  />

                  <div className="formGroup-salary">
                    <FastField
                      name="min_salary"
                      component={InputField}

                      label="Min Salary"
                    />

                    <span className="formGroup-salary__span">~</span>

                    <FastField
                      name="max_salary"
                      component={InputField}

                      label="Max Salary"
                    />
                  </div>

                  <FormGroup>
                    <div className="formGroup-text-editor__title">
                      <Label style={{
                        fontWeight: "500"
                      }}>Expiry Date</Label>
                    </div>
                    <DatePickerField
                      name="expiry_date"
                      label="Expiry Date"
                      isSubmit={isSubmit}
                    />
                  </FormGroup>


                  <FastField
                    name="location"
                    component={InputField}

                    label="Location"
                    placeholder=""
                  />

                  <FastField
                    name="hashtags"
                    component={SelectField}

                    label="Job Tags"
                    placeholder=""
                    options={JOB_TAGS_OPTIONS}
                    isMulti={true}
                    isCreatableSelect={true}
                  />

                  <FormGroup className="formGroup-btn-publish">
                    <Button
                      // disabled={(isSubmitting && isBeautiful)}
                      type="submit"
                      color={'success'}
                      onClick={handleClick}
                    >
                      {(isSubmitting && isBeautiful) && <Spinner className="mr-2" children="" size="sm" />}
                      {isEditMode ? "Update" : "Publish"}
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