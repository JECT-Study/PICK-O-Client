import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const balanceGameEndingStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '335px',
  height: `calc(100vh - 80px)`,
  maxHeight: '800px',
  position: 'relative',
});

export const titleStyling = css(typo.Mobile.Text.Bold_20, {
  color: color.MAIN,
  width: '260px',
  marginTop: '80px',
  textAlign: 'center',
});

export const checkIconWrapper = css({
  marginTop: '80px',
  marginBottom: '100px',
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const buttonStyling = css({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%)',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '65px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});
