import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import Images from 'constants/images';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RHFInputField from 'custom-fields/RHFInputField';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import * as FcIcons from 'react-icons/fc';
import LoadingUI from 'components/Loading';

SignInPage.propTypes = {

};

function SignInPage(props) {
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required')
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onLogin = async (values) => {
    try {
      //   const action = login({
      //     email: values.email,
      //     password: values.password
      //   });

      //   const actionResult = await dispatch(action);
      //   unwrapResult(actionResult);

      //   history.push("/admin");
    } catch (error) {
      // enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    }
  };

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

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
              <span>Sign in</span>
              <img src={Images.smDot} alt="smDot" />
            </div>
            <form onSubmit={handleSubmit(onLogin)} onKeyDown={(e) => checkKeyDown(e)}>
              <div className="form-group">
                <RHFInputField
                  register={register}
                  inputName="email"
                  control={control}
                  scheme={errors.email}
                  placeholder="Ex: abc@gmail.com"
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
                />
              </div>
              <div className="form-group remember-forget">
                <div className="remember-forget__left">
                  <input type="checkbox" />
                  <p>Remember</p>
                </div>
                <Link to="/auth/forget-password" className="remember-forget__link">
                  Forget Password
                </Link>
              </div>
              <div className="form-group button">
                <button disabled={isSubmitting} className="btn btn-success btn-sm" type="submit">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Sign in
                </button>
              </div>
              <div className="form-group under-line">
                {/* <div className=""></div> */}
                <div className="under-line__line" />
                <p>With</p>
                <div className="under-line__line" />
              </div>

              <div className="form-group button">
                <button disabled={isSubmitting} className="btn btn-sm google" type="submit">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <FcIcons.FcGoogle className="google__icon" />
                  Sign in with Google
                </button>
              </div>
              <div className="form-group signUp">
                <span>Don't have an account?</span>
                <Link to="/auth/sign-up" className="signUp__link">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );

  return <>{currentUI}</>
}

export default SignInPage;