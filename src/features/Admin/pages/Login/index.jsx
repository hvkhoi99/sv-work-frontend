import { unwrapResult } from '@reduxjs/toolkit';
import Images from 'constants/images';
import InputField from 'custom-fields/InputField';
import { login } from 'features/Auth/adminSlice';
import { FastField, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import './AdminLogin.scss';


AdminLoginPage.propTypes = {

};

function AdminLoginPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required')
  })

  const handleSubmit = async (values) => {
    try {
      const action = login({
        email: values.email,
        password: values.password
      });

      const actionResult = await dispatch(action);
      unwrapResult(actionResult);
      
      history.push("/admin");
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  return (
    <div className="login">
      <div className="login__image">
        <img src={Images.admin} alt="admin" />
      </div>
      <div className="login__form">
        <div className="login__form__title">
          <span>Sign in</span>
          <img src={Images.smDot} alt="smDot" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => {

            const { isSubmitting } = formikProps;
            // console.log({ values, errors, touched });

            return (
              <Form>
                <FastField
                  name="email"
                  component={InputField}

                  // label="Email"
                  placeholder="Email ..."
                  disabled={false}
                />

                <FastField
                  name="password"
                  type="password"
                  component={InputField}

                  // label="Password"
                  placeholder="Password ..."
                  disabled={false}
                />

                <FormGroup className="login__form__button">
                  <Button style={{
                    borderRadius: "1.5rem",
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                  }}
                    type="submit"
                    color={"success"}
                  >
                    {isSubmitting
                      && <Spinner
                        children=""
                        size="sm"
                        style={{ marginRight: ".5rem" }}
                      />
                    } Sign in
                  </Button>
                </FormGroup>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AdminLoginPage;