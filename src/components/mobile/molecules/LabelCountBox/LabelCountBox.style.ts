import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '111px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
});

export const labelStyle = css(typo.Mobile.Text.Medium_12, {
  textAlign: 'center',
  color: color.GY[1],
});

export const countStyle = css(typo.Mobile.Text.SemiBold_12, {
  textAlign: 'center',
  color: color.MAIN,
});
