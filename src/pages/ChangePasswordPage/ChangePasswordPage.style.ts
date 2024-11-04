import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const changePasswordPageContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '850px',
  padding: '118px 0',
  background: color.GY[3],
});

export const changePasswordTextStying = css(typo.SubTitle, {
  color: color.BK,
  marginTop: '44px',
  marginBottom: '60px',
});

export const changePasswordFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '573px',
  gap: '15px',
});

export const changePasswordStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: '15px',
});

export const btnContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '374px',
  gap: '46px',
  marginTop: '35px',
});

export const btnStyling = css({
  width: '100%',
  borderRadius: '50px',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
