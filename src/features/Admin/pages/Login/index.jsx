import Images from 'constants/images';
import InputField from 'custom-fields/InputField';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormGroup, Spinner } from 'reactstrap';
import './AdminLogin.scss';

AdminLoginPage.propTypes = {

};

function AdminLoginPage(props) {
  const history = useHistory();

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = (values) => {
    console.log('form submit:', values)
    return new Promise(resolve => {
      setTimeout(() => {
        history.push('/admin');
        resolve(true);
      }, 2000);
    });
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
          onSubmit={handleSubmit}
        >
          {formikProps => {

            const { values, errors, touched, isSubmitting } = formikProps;
            console.log({ values, errors, touched });

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
                  component={InputField}

                  // label="Password"
                  placeholder="Password ..."
                  disabled={false}
                />

                <FormGroup className="login__form__button">
                  <Button style={{
                    borderRadius: "1.5rem",
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                  }} type="submit" color={"success"}>
                    {isSubmitting
                      && <Spinner
                        children={false}
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