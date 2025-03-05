import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const reportModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

export const reportTextWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
});

export const reportTextStyling = css(typo.Main.SemiBold, {
  color: color.BK,
});

export const buttonWrapperStyling = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '7px',
});

export const reportBtnWrapperStyling = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const buttonStyling = css(typo.Mobile.Text.Medium_14, {
  display: 'flex',
  width: '143px',
  height: '50px',
  alignItems: 'center',
  padding: '0 16px',
  borderRadius: '8px',
  backgroundColor: color.GY[5],
  color: color.GY[6],
  cursor: 'pointer',
});

export const selectedButtonStyling = css({
  backgroundColor: color.WT_VIOLET,
  color: color.MAIN,
  outline: `2px solid ${color.MAIN}`,
});

export const getButtonStyling = (selected: boolean) =>
  css({
    width: '293px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: selected ? color.MAIN : color.GY[2],
  });

export const reportInputStyling = css(typo.Mobile.Text.SemiBold_14, {
  width: '100%',
  padding: '6px 0',
  outline: '0',
  border: 'none',
  borderBottom: `1px solid ${color.GY[3]}`,
  color: color.BK,

  ':-webkit-autofill': {
    boxShadow: '0 0 0px 1000px white inset',
  },

  '&::placeholder': {
    color: color.GY[1],
  },
});
