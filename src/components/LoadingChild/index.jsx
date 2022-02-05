import { css } from '@emotion/react';
import React from 'react';
import { FadeLoader } from 'react-spinners';

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
      <FadeLoader css={override} height={15} width={5} radius={2} color='#0DAB42' />
    </div>
  );
}

export default LoadingChildUI;