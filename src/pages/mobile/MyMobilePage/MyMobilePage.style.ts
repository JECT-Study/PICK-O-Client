import { css } from '@emotion/react';
import color from '@/styles/color';

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
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px 0',
  width: '100%',
});
