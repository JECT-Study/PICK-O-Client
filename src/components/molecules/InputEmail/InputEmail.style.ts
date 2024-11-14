import { css } from '@emotion/react';
import color from '@/styles/color';

export const inputEmailContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputEmailBtnStyling = (isEmpty: boolean) => {
  return css({
    padding: '10px 25px',
    backgroundColor: isEmpty ? color.GY[2] : 'null',
  });
};

export const labelStyling = css({
  marginTop: '20px',
});
