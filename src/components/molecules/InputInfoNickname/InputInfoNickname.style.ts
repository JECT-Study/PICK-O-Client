import { css } from '@emotion/react';
import color from '@/styles/color';

export const inputNicknameContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const inputNicknameBtnStyling = (isEmpty: boolean) => {
  return css({
    padding: '10px 25px',
    backgroundColor: isEmpty ? color.GY[2] : 'null',
  });
};

export const getButtonStyling = (
  value: string,
  defaultValue: string | undefined,
) => {
  if (value === defaultValue) {
    return css({
      backgroundColor: color.GY[2],
    });
  }

  return css({});
};

export const labelStyling = css({
  marginTop: '20px',
});
