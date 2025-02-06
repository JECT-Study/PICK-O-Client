import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 0',
  gap: '55px',
});

export const textContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const titleTextWrapper = css({
  display: 'flex',
  flexDirection: 'column',
});

export const subTitleStyling = css(typo.SubTitle, {
  display: 'flex',
  fontWeight: 'bold',
  color: color.BK,
});

export const titleStyling = css(typo.Title, {
  display: 'flex',
  color: color.BK,
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
