import { css } from '@emotion/react';
import color from '@/styles/color';

export const buttonStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: ' center',
  width: '54px',
  height: '34px',
  border: `1px solid ${color.GY[3]}`,
  borderRadius: '4px',
  cursor: 'pointer',
});
