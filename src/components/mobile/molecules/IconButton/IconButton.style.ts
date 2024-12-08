import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const iconButtonStyle = css({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  width: '84px',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: color.GY[1],
  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const activeStyle = css({
  color: color.BK,
});

export const labelStyle = css(typo.Mobile.Text.SemiBold_12, {
  color: 'inherit',
});
