import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const loginFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const loginTextStyling = css(typo.Component.Bold, {
  color: color.BK,
  marginBottom: '45px',
});

export const loginFormWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '15px',
});

export const textStyling = css(typo.Main.Medium, {
  color: color.GY[1],
  cursor: 'pointer',
});

export const loginInputStyling = css({
  width: '450px',
});

export const loginBtnStyling = css({
  width: '536px',
});

export const textWrapperStyling = css({
  display: 'flex',
  alignItems: 'center',
  margin: '21px 0',
  gap: '20px',
});

export const signInTextStyling = css(typo.Main.SemiBold, {
  marginTop: '16px',
  color: color.MAIN,
});

export const btnWrapperMargin = css({
  marginTop: '23px',
});

export const btnWrapperStyling = css({
  display: 'flex',
  marginTop: '40px',
  marginBottom: '6px',
  gap: '30px',
});

export const loginButtonStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '83px',
  height: '83px',
  borderRadius: '50%',
  backgroundColor: color.WT,
  outline: `1px solid ${color.GY[2]}`,
  cursor: 'pointer',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
