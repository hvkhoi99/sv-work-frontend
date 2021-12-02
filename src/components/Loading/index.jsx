import { css } from '@emotion/react';
import React from 'react';
import { PuffLoader } from 'react-spinners';

LoadingUI.propTypes = {

};

const override = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function LoadingUI(props) {
  return (
    <div>
      <PuffLoader css={override} size={100} color='#0DAB42' />
    </div>
  );
}

export default LoadingUI;