import recruiterApi from 'api/recruiterApi';
import studentApi from 'api/studentApi';
import LoadingChildUI from 'components/LoadingChild';
import SelectField from 'custom-fields/SelectField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './InviteCandidateForm.scss';

InviteCandidateForm.propTypes = {
  onInvite: PropTypes.func,
  close: PropTypes.func,
  initialValues: PropTypes.object
};

InviteCandidateForm.defaultProps = {
  onInvite: null,
  close: null,
  initialValues: {}
};

function InviteCandidateForm(props) {
  const { onInvite, close } = props;
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.current);
  const [jobsName, setJobsName] = useState([]);

  useEffect(() => {
    const fetchListJobsName = async () => {
      try {
        const data = user.role_id === 2
          ? await recruiterApi.getJobsInvite()
          : await studentApi.getJobsInvite();
        console.log(data);
        if (data.data.status === 1) {
          setJobsName(data.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Cannot fetch list of jobs name: " + error.message);
      }
    }

    fetchListJobsName();
  }, [user.role_id]);

  const validationSchema = Yup.object().shape({
    id: Yup
      .string()
      .typeError('Title is required')
      .required('Title is required'),
  });

  const onSubmitForm = async (values) => {
    await onInvite(values);
    close();
  }

  return (
    <div className="invite-candidate-form">
      {
        isLoading
          ? <div className="loading-child-ui">
            <LoadingChildUI />
          </div>
          : <>
            <h5>Invite student to recruitment News</h5>
            <span>Please, choose your available recruitment below!</span>
            <div className="invite-candidate-form__main">
              <Formik
                initialValues={{
                  id: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmitForm}
              >
                {formikProps => {
                  const { isSubmitting } = formikProps;

                  return (
                    <Form>
                      <FastField
                        name="id"
                        component={SelectField}

                        // label="Title"
                        moreClassName="width-100"
                        options={jobsName}
                        isOptionValue={true}
                        placeholder="Choose one recruitment"
                      // labelClassName="input-field-label"
                      />

                      <FormGroup className="form-group-button">
                        <Button
                          type="submit"
                          color={'success'}
                          disabled={isSubmitting}
                        >
                          {isSubmitting && <Spinner children="" size="sm" className="mr-2" />}
                          Invite
                        </Button>

                        <Button
                          type="button"
                          color="secondary"
                          onClick={close}
                        >
                          Cancel
                        </Button>
                      </FormGroup>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </>
      }
    </div>
  );
}

export default InviteCandidateForm;