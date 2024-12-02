import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const PageContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const pageWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingTop: '64px',
  paddingBottom: '58px',
});

export const subLabel = css(typo.SubTitle, {
  display: 'inline-block',
  color: color.BK,
  textAlign: 'left',
});

export const titleLabel = css(typo.Title, {
  display: 'inline-block',
  color: color.BK,
  textAlign: 'left',
  marginBottom: '15px',
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
