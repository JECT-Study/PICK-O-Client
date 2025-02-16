import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import { rotate } from '@/styles/keyframes';

export const summaryBoxStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const summaryTextStyling = css(typo.Mobile.Text.SemiBold_14, {
  color: color.MAIN,
});

export const summaryWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
});

export const summarySpinnerWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const summarySpinnerStyling = css({
  animation: `${rotate} 2s infinite linear`,
});

export const summarySpinnerText = css(typo.Mobile.Main.Regular_12, {
  color: color.GY[1],
});

export const summaryTextWrapper = css(typo.Mobile.Main.Regular_12, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: color.GY[1],
});

export const summaryStatusWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const summaryText = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const iconStyling = css({
  transform: 'scale(0.75)',
});

export const spinnerStyling = css({
  transform: 'scale(0.75)',
  margin: '10px',
});
