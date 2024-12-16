import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const tagStyle = css(typo.Mobile.Text.Medium_12, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 14px',
  borderRadius: '6px',
  border: `1px solid ${color.WT_VIOLET}`,
  color: color.MAIN,
  fontSize: '14px',
  gap: '5px',
});
