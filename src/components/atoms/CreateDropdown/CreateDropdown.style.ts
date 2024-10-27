import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const dropdownStyling = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const dropdownButtonStyling = css(typo.Main.SemiBold, {
  cursor: 'pointer',
  padding: '10px 25px',
  color: color.GY[1],
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
});

export const arrowStlying = css({
  marginLeft: '10px',
});

export const optionStlying = css({
  position: 'absolute',
  zIndex: '1000',
  marginTop: '68px',
  right: '5px',
  width: '173px',
  backgroundColor: color.WT,
  border: `1px solid ${color.GY[2]}`,
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.07)',
});

export const optionItemStyling = css(typo.Comment.SemiBold, {
  width: '173px',
  padding: '19.5px 32px',
  cursor: 'pointer',
  color: color.BK,
  borderBottom: `1px solid ${color.GY[2]}`,

  ':last-child': {
    borderBottom: 'none',
  },

  ':hover': {
    color: color.WT,
    backgroundColor: color.MAIN,
  },
});
