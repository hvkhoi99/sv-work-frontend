import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingUI from 'components/Loading';

SignUpPage.propTypes = {

};

function SignUpPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { roleId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  })

  console.log({ roleId });

  const currentUI = isLoading
    ? <LoadingUI />
    : (
      <div className="sign-up">
        Sign Up.
      </div>
    );

  return <>{currentUI}</>
}

export default SignUpPage;