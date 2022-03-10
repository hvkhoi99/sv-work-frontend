import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import { JOB_TAGS_OPTIONS, JOB_TYPE_OPTIONS } from 'constants/global';
import Paths from 'constants/paths';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import TextFieldDate from 'custom-fields/TextFieldDate';
import { FastField, Form, Formik } from 'formik';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import DivAreaText from '../DivAreaText';
import './CreateRecruitmentForm.scss';

CreateRecruitmentForm.propTypes = {
  recruitment: PropTypes.object,
  isEditMode: PropTypes.bool,
};

CreateRecruitmentForm.defaultProps = {
  recruitment: {},
  isEditMode: false,
}

function CreateRecruitmentForm(props) {
  const { recruitment, isEditMode } = props;
  const user = useSelector((state) => state.user.current);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = isEditMode
    ? recruitment
    : {
      title: 'New Recruitment',
      is_full_time: 'Part Time',
      job_category: 'Fresher Backend',
      position: 'Fresher',
      expiry_date: '',
      benefits: 'benefits',
      description: 'description',
      requirement: 'requirement',
      min_salary: '',
      max_salary: '',
      location: 'Da Nang, Viet Nam',
      hashtags: ''
    };

  const [benefits, setBenefits] = useState(recruitment.benefits);
  const [description, setDescription] = useState(recruitment.description);
  const [requirement, setRequirement] = useState(recruitment.requirement);
  let [isBeautiful, setIsBeautiful] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    title: Yup
      .string()
      .typeError('Job Name is required')
      .required('Job Name is required')
      .min(10, "Title must be at least 10 characters"),
    is_full_time: Yup
      .string()
      .typeError('Type of Job is required')
      .required('Type of Job is required'),
    job_category: Yup
      .string()
      .typeError('Job Category is required')
      .required('Job Category is required'),
    position: Yup
      .string()
      .typeError('Position is required')
      .required('Position is required'),
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

  const onSubmit = async (values) => {
    if (!isBeautiful) {
      return
    } else {
      try {
        const params = {
          title: values.title,
          position: values.position,
          is_full_time: values.is_full_time === "Full Time" ? true : false,
          job_category: values.job_category,
          location: values.location,
          description: description,
          benefits: benefits,
          requirement: requirement,
          min_salary: parseInt(values.min_salary),
          max_salary: parseInt(values.max_salary),
          // expiry_date: moment(new Date(values.expiry_date)).format("MM/DD/YYYY"),
          expiry_date: values.expiry_date,
          is_closed: false,
          hashtags: values.hashtags
        };
        if (!isEditMode) {
          user.role_id === 2
            ? await recruiterApi.createNewRecruitment(params)
            : await studentApi.createNewRecruitment(params);
          enqueueSnackbar("Your recruitment has been created.", { variant: "success" });
          history.push(`${Paths.recruiterDashboard}`);
        } else {
          user.role_id === 2
            ? await recruiterApi.updateRecruitment(recruitment.id, params)
            : await studentApi.updateRecruitment(recruitment.id, params);
          enqueueSnackbar("Your recruitment has been updated.", { variant: "success" });
          history.push(`${Paths.recruiterDashboard}/available-jobs/${recruitment.id}`);
        }
      } catch (error) {
        isBeautiful = false;
        console.log("Cannot create/update recruitment. Error" + error.message);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      }
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
                    labelClassName="input-field-label"
                  />

                  <FastField
                    name="is_full_time"
                    component={SelectField}

                    label="Type of Job"
                    placeholder=""
                    labelClassName="input-field-label"
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
                    labelClassName="input-field-label"
                    placeholder="Eg: Senior Web Backend"
                  />

                  <FastField
                    name="position"
                    component={InputField}

                    label="Position"
                    labelClassName="input-field-label"
                    placeholder=""
                  />

                  <DivAreaText
                    name="benefits"

                    label="Benefits"
                    textValue={benefits}
                    onTextChange={onBenefitsChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                    labelClassName="input-field-label"
                  />

                  <DivAreaText
                    name="description"

                    label="Description"
                    textValue={description}
                    onTextChange={onTextChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                    labelClassName="input-field-label"
                  />

                  <DivAreaText
                    name="requirement"

                    label="Requirement"
                    textValue={requirement}
                    onTextChange={onRequirementChange}
                    onRereshField={onRereshField}
                    isSubmit={isSubmit}
                    labelClassName="input-field-label"
                  />

                  <div className="formGroup-salary">
                    <FastField
                      name="min_salary"
                      component={InputField}

                      label="Min Salary"
                      labelClassName="input-field-label"
                    />

                    <span className="formGroup-salary__span">~</span>

                    <FastField
                      name="max_salary"
                      component={InputField}

                      label="Max Salary"
                      labelClassName="input-field-label"
                      placeholder=""
                    />
                  </div>

                  {/* <FormGroup>
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
                  </FormGroup> */}
                  <FastField
                    name="expiry_date"
                    component={TextFieldDate}

                    label="Expiry"
                    type="date"
                    placeholder=""
                    moreClassName="text-field-date"
                    labelClassName="input-field-label"
                    inputClassName="text-field-date-width"
                    inputProps={{ min: moment(new Date().toJSON().slice(0, 10)).format('YYYY-MM-DD') }}
                  />

                  <FastField
                    name="location"
                    component={InputField}

                    label="Location"
                    labelClassName="input-field-label"
                    placeholder="Eg: Danang, Vietnam"
                  />

                  <FastField
                    name="hashtags"
                    component={SelectField}

                    label="Job Tags"
                    labelClassName="input-field-label"
                    placeholder="Eg: ReactJS"
                    options={JOB_TAGS_OPTIONS}
                    isMulti={true}
                    isCreatableSelect={true}
                  />

                  <FormGroup className="formGroup-btn-publish">
                    <Button
                      disabled={(isSubmitting && isBeautiful)}
                      style={(isSubmitting && isBeautiful) ? { cursor: "default" } : { cursor: "pointer" }}
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