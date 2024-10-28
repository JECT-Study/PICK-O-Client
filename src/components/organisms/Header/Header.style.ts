import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  width: '100%',
  padding: '0 200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.WT,
  boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  height: '100px',
});

export const logoStyle = css({
  display: 'flex',
  alignItems: 'center',
});

export const IconStyle = css({
  marginRight: '8px',
});

export const WriteButtonStyle = css({
  margin: '27px 28px 24px 0',
});

export const LoginButtonStyle = css(typo.Main.SemiBold, {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: color.GY[1],
  width: '100.24px',
  height: '32.92px',
  marginRight: '7.76px',
});

export const rightContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
});

export const notificationStyle = css({
  marginLeft: '42.93px',
});
