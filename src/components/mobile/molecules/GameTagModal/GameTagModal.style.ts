import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

export const textBox = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3px',
});

export const textStyling = css(typo.Main.SemiBold, {
  color: color.BK,
});

export const tagTextStyling = css(typo.Mobile.Text.SemiBold_14, {
  color: color.GY[1],
});

export const markStyling = css(typo.Mobile.Text.SemiBold_14, {
  color: color.MAIN,
});

export const tagWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '8px',
});

export const inputStyling = css(typo.Mobile.Text.Medium_12, {
  fontSize: '14px',
  width: '295px',
  height: '42px',
  padding: '10px 20px',
  border: `1px solid ${color.GY[4]}`,
  borderRadius: '6px',
});

export const customButtonStyle = (isDisabled: boolean) =>
  css({
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  });

export const customDisabledBtnStyle = css({
  color: color.WT,
  backgroundColor: color.GY[2],
  outline: '1px solid transparent',
  pointerEvents: 'none',
  ':hover': {
    backgroundColor: color.GY[2],
  },
});

export const getButtonStyling = (isSelected: boolean) => {
  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '64px',
    height: '34px',
    borderRadius: '6px',
    border: isSelected ? 'null' : `1px solid ${color.GY[4]}`,
    backgroundColor: isSelected ? color.MAIN : color.GY[5],
    color: isSelected ? color.WT : color.GY[1],
    cursor: 'pointer',
  });
};
