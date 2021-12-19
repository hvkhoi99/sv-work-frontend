import { css } from '@emotion/react';
import React from 'react';
import { PuffLoader } from 'react-spinners';

LoadingChildUI.propTypes = {

};

const override = css`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

function LoadingChildUI(props) {
  return (
    <div>
      <PuffLoader css={override} size={60} color='#0DAB42' />
    </div>
  );
}

export default LoadingChildUI;