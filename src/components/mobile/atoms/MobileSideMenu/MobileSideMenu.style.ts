import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonGroupStyle = css({
  position: 'fixed',
  top: '55px',
  right: 0,
  width: '134px',
  height: '100%',
  backgroundColor: color.WT,
  boxShadow: '0px 0 5px rgba(0, 0, 0, 0.1)',
  zIndex: 1100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const buttonContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

export const fillerStyle = css({
  flex: 1,
});

export const buttonStyle = css(typo.Mobile.Text.Medium_12, {
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  padding: '10.5px 60px 10.5px 24px',
  textAlign: 'left',
  color: color.BK,
  border: 'none',
});
