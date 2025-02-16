import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const summaryItemStyling = css(typo.Mobile.Text.Medium_12, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 20px 4px 5px',
  gap: '13px',
  backgroundColor: color.WT_VIOLET,
  color: color.BK,
  borderRadius: '30px',
});

export const numberItemStyling = css(typo.Mobile.Text.Medium_12, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  width: '18px',
  height: '18px',
  backgroundColor: color.MAIN,
  color: color.WT,
  borderRadius: '50%',
});
