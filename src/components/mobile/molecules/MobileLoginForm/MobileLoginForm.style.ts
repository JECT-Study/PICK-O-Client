import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const loginFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '336px',
});

export const loginFormWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  widht: '100%',
});

export const pwTextStyling = css(typo.Text.Regular, {
  color: color.GY[1],
  cursor: 'pointer',
});

export const signupTextStyling = css(typo.Text.Regular, {
  color: color.BK,
  cursor: 'pointer',
});

export const loginBtnStyling = css(typo.Comment.SemiBold, {
  width: '335px',
  height: '52px',
  marginTop: '3px',
});

export const textWrapperStyling = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  margin: '12px 0 22px 0',
});

export const signInTextStyling = css(typo.Comment.SemiBold, {
  color: color.MAIN,
  margin: '22px 0 12px 0',
});

export const btnWrapperStyling = css({
  display: 'flex',
  gap: '12px',
});
