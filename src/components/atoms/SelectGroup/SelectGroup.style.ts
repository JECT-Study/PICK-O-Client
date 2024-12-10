import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const selectGroupStyling = css({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  padding: '4px',
  width: '912px',
  justifyContent: 'space-between',
  position: 'relative',
});

export const selectGroupItemStyling = css({
  ...typo.SubTitle,
  color: color.BK,
  display: 'flex',
  width: '452px',
  height: '57px',
  flexshrink: 0,
  backgroundColor: 'transparent',
  border: 'none',
  padding: '20px 10px',
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  transition: 'background-color 0.3s ease, color 0.3s ease',
});

export const selectedStyling = css({
  backgroundColor: color.MAIN,
  color: color.WT,
  zIndex: 1,
  position: 'relative',
});

export const itemRadius = css({
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
});

export const bottomBarStyling = css({
  width: '904px',
  height: '4px',
  flexShrink: 0,
  borderRadius: '10px',
  background: color.GY[2],
  position: 'absolute',
  bottom: '4px',
  left: '50%',
  transform: 'translateX(-50%)',
});
