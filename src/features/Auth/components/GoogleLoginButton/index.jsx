import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import * as FcIcons from 'react-icons/fc';
import './GoogleLoginButton.scss';

GoogleLoginButton.propTypes = {

};

function GoogleLoginButton(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    if (response.profileObj) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }

  const logout = () => {
    setIsSignedIn(false);
  }

  return (
    <>
      {
        !isSignedIn
          ? <GoogleLogin
            clientId="689196569627-us0lkpasggkds5ddblkv0shoj94kue39.apps.googleusercontent.com"
            render={renderProps => (
              <button
                type="button"
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                className="btn btn-sm google"
              >
                <FcIcons.FcGoogle className="google__icon" />
                Sign in with Google
              </button>
            )}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          // isSignedIn={isSignedIn}
          />
          : <GoogleLogout
            clientId="689196569627-us0lkpasggkds5ddblkv0shoj94kue39.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          // isSignedIn={isSignedIn}
          />
      }
    </>
  );
}

export default GoogleLoginButton;