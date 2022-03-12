import userApi from 'api/userApi';
import Footer from 'components/Footer';
import LoadingUI from 'components/Loading';
import Images from 'constants/images';
import Paths from 'constants/paths';
import InputField from 'custom-fields/InputField';
// import { signup } from 'features/Auth/userSlice';
import { FastField, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import '../SignIn/SignIn.scss';

SignUpPage.propTypes = {

};

function SignUpPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const history = useHistory();
  const { roleId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    passwordConfirmation: Yup
      .string()
      .oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      )
  })

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors, isSubmitting }
  // } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onRegister = async (values) => {
    try {
      const params = {
        email: values.email,
        password: values.passwordConfirmation,
        role_id: parseInt(roleId, 10)
      };

      const action = await userApi.signup(params);

      // console.log({action});

      if (action.data.status === 1) {
        enqueueSnackbar(action.data.message, { variant: "success" });
        history.push({
          pathname: `${Paths.verifyEmail}`,
          state: {
            email: params.email,
            code: action.data.code,
            role: roleId
          }
        });
        return true;
      } else {
        enqueueSnackbar(action.data.message, { variant: "error" });
        setErrorMessage(action.data.message);
        switch (action.data.code) {
          case 400:
            break;
          case 409:
            history.push({
              pathname: `${Paths.verifyEmail}`,
              state: {
                email: params.email,
                code: action.data.code,
                role: roleId
              }
            });
            break;
          default:
            break;
        }
        return false;
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
      return false;
    }
  };

  // const checkKeyDown = (e) => {
  //   if (e.code === 'Enter') e.preventDefault();
  // };

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <>
        <div className="login">
          <div className="login__image">
            <img src={Images.teamwork} alt="admin" />
          </div>
          <div className="login__form">
            <div className="login__form__ellipse">
              <img src={Images.ellipse} alt="ellipse" />
            </div>
            <div className="login__form__title">
              <span>Sign up</span>
              <img src={Images.smDot} alt="smDot" />
            </div>
            {/* <form onSubmit={handleSubmit(onRegister)} onKeyDown={(e) => checkKeyDown(e)}>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="email"
                  control={control}
                  scheme={errors.email}
                  placeholder="Email"
                  moreClassName="shadow-input radius"
                />
              </div>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="password"
                  control={control}
                  scheme={errors.password}
                  type="password"
                  moreClassName="shadow-input radius"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="passwordConfirmation"
                  control={control}
                  scheme={errors.passwordConfirmation}
                  type="password"
                  moreClassName="shadow-input radius"
                  placeholder="Confirm password"
                />
              </div>
              <div className="form-group button signin-button">
                <button disabled={isSubmitting} className="btn btn-success btn-sm justify-content-center" type="submit">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Sign Up
                </button>
                {isError &&
                  <span className="text-danger form-span">This email address is already being used</span>}
              </div>
              <div className="form-group signUp">
                <span>Already have an account?</span>
                <Link to="/auth/sign-in" className="signUp__link">Sign in</Link>
              </div>
            </form> */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onRegister}
            >
              {formikProps => {
                const { isSubmitting } = formikProps;

                return (
                  <Form>
                    <FastField
                      name="email"
                      component={InputField}

                      placeholder="Email"
                    />

                    <FastField
                      name="password"
                      component={InputField}

                      placeholder="Password*"
                      type="password"
                    />

                    <FastField
                      name="passwordConfirmation"
                      component={InputField}

                      placeholder="Password Confirmation"
                      type="password"
                    />

                    <div className="button signup-button">
                      <button disabled={isSubmitting} className="btn btn-success btn-sm justify-content-center" type="submit">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Sign Up
                      </button>
                      <span className="text-danger form-span">{errorMessage}</span>
                    </div>
                    <div className="form-group signUp">
                      <span>Already have an account?</span>
                      <Link to="/auth/sign-in" className="signUp__link">Sign in</Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <Footer />
      </>
    );

  return <>{currentUI}</>
}

export default SignUpPage;