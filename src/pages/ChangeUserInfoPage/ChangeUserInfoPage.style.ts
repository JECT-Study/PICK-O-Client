import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const changeUserInfoPageContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  //   minHeight: '850px',
  padding: '100px 0',
  background: color.GY[3],
});

export const subTextStyling = css(typo.Component.Bold, {
  color: color.BK,
});

export const checkPasswordTextStyling = css(typo.Main.Medium, {
  color: color.BK,
  marginTop: '26px',
});

export const changeUserInfoFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '573px',
  marginTop: '25px',
  marginBottom: '60px',
  gap: '40px',
});

export const checkPasswordFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '573px',
  gap: '15px',
});

export const checkPasswordFormWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '70px',
  height: '270px',
});

export const btnStyling = css({
  width: '164px',
  borderRadius: '50px',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
