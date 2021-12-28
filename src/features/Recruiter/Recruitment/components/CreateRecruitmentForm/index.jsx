import { JOB_CATEGORY_OPTIONS, JOB_TYPE_OPTIONS } from 'constants/global';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import { Button, FormGroup, Label, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './CreateRecruitmentForm.scss';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

CreateRecruitmentForm.propTypes = {
};

function CreateRecruitmentForm(props) {
  const [data, setData] = useState("");

  const initialValues = {
    jobName: '',
    typeOfJob: '',
    jobCategory: '',
    location: '',
    minSalary: '',
    maxSalary: '',
  }

  const validationSchema = Yup.object().shape({
    // jobName: Yup
    //   .string()
    //   .required('Job Name is required'),
    // typeOfJob: Yup
    //   .string()
    //   .required('Type of Job is required'),
    // jobCategory: Yup
    //   .string()
    //   .required('Job Category is required'),
    // location: Yup
    //   .string()
    //   .required('Location is required'),
  });

  const onSubmit = (values) => {
    console.log({ values }, data)
  }

  const handleChange = (e, editor) => {
    const currentData = editor.getData();
    setData(currentData);
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

                  <FormGroup>
                    <Label style={{
                      fontWeight: "500"
                    }}>Description</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={data}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <div className="formGroup-salary">
                    <FastField
                      name="minSalary"
                      component={InputField}

                      label="Salary Range"
                      // moreClassName="width-60 mr-4"

                    />

                    <span className="formGroup-salary__span">~</span>

                    <FastField
                      name="maxSalary"
                      component={InputField}

                      label="*"

                    />
                  </div>

                  <FormGroup>
                    <Label style={{
                      fontWeight: "500"
                    }}>Benefits</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={data}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button type="submit" color={'success'}>
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