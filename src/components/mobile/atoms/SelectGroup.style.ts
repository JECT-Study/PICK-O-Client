import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const selectGroupStyling = css({
  backgroundColor: color.WT_VIOLET,
  display: 'flex',
  width: '335px',
  height: '42px',
  borderRadius: '8px',
  flexShrink: 0,
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
});

export const selectGroupItemStyling = css(typo.Mobile.Text.SemiBold_14, {
  all: 'unset',
  color: color.SKYBLUE,
  display: 'flex',
  width: '165px',
  height: '34px',
  flexshrink: 0,
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  position: 'relative',
  zIndex: 0,
});

export const selectedStyling = css({
  backgroundColor: color.MAIN,
  color: color.WT,
  zIndex: 1,
  position: 'relative',
  borderRadius: '8px',
});

export const secondButtonShift = css({
  marginLeft: '-10px',
});
