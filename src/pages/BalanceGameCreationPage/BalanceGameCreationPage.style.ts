import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const pageContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '60px',
  marginBottom: '78px',
});

export const pageWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const textWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px',
});

export const subLabel = css(typo.SubTitle, {
  display: 'flex',
  fontWeight: 'bold',
  color: color.BK,
});

export const titleLabel = css(typo.Title, {
  display: 'flex',
  color: color.BK,
});

export const buttonContainer = css({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '58px',
});

export const customButtonStyle = css({
  width: '300px',
  height: '60px',
});

export const submitModalBackdrop = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.11)',
  backdropFilter: 'blur(20px)',
  zIndex: '900',
});

export const deleteModalBackdrop = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: '900',
});

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
