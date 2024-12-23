import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';

export const tempGameButtonStyling = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '10px',
  width: '142px',
  height: '136px',
  backgroundColor: color.WT,
  borderRadius: '10px',
  border: `1px solid ${color.GY[3]}`,
  boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
});

export const itemWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '95px',
});

export const buttonStyling = css(typo.Mobile.Text.SemiBold_14, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '122px',
  height: '34px',
  borderRadius: '8px',
  backgroundColor: color.WT_VIOLET,
  color: color.MAIN,
});
