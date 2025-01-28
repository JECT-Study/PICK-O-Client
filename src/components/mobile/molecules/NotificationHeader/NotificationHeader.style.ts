// NotificationHeader.style.ts
import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  width: '100%',
  padding: '0 20px',
  height: '55px',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.WT,
  boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.1)',
});

export const iconStyle = css({
  position: 'absolute',
  left: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
});

export const textStyle = css(typo.Main.Medium, {
  color: color.BK,
});
