import { css } from '@emotion/react';
import color from '@/styles/color';

export const inputCodeContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputCodeBtnStyling = (sendSuccess: boolean) => {
  return css({
    padding: '10px 25px',
    backgroundColor: sendSuccess ? 'null' : color.GY[2],
  });
};

export const labelStyling = css({
  marginTop: '20px',
});
