import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: color.WT,
  padding: '18px 20px',
  width: '100%',
});

export const selectGroupWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px 0 16px 0',
  width: '100%',
});

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px 0',
  gap: '10px',
});

export const menuDataBox = css(typo.Mobile.Text.Medium_12, {
  color: color.GY[1],
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const observerWrapper = css({
  display: 'flex',
  marginTop: '2px',
});
