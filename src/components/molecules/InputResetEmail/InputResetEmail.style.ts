import { css } from '@emotion/react';
import color from '@/styles/color';

export const inputResetEmailContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputResetEmailBtnStyling = (isEmpty: boolean) => {
  if (!isEmpty) {
    return css({
      padding: '10px 25px',
    });
  }
  return css({
    backgroundColor: color.GY[2],
    padding: '10px 25px',
  });
};

export const labelStyling = css({
  marginTop: '20px',
});
