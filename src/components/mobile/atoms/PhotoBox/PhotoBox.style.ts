import { css } from '@emotion/react';
import color from '@/styles/color';

export const container = css({
  width: '50px',
  height: '50px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.GY[3],
  flexShrink: 0,
  overflow: 'hidden',
});

export const image = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const placeholder = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export const icon = css({
  width: '24px',
  height: '20px',
  color: color.GY[1],
  flexShrink: 0,
});
