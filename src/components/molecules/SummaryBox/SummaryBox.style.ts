import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import { rotate } from '@/styles/keyframes';

export const summaryBoxStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '748px',
  padding: '30px',
  gap: '25px',
  borderRadius: '10px',
  backgroundColor: '#F2F3FF',
});

export const summaryTextStyling = css(typo.SubTitle, {
  color: color.BK,
});

export const summaryWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '17px',
});

export const summarySpinnerWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '17px 0',
  gap: '35px',
});

export const summarySpinnerStyling = css({
  animation: `${rotate} 2s infinite linear`,
});

export const summarySpinnerText = css(typo.Main.Medium, {
  color: color.GY[1],
});

export const summaryTextWrapper = css(typo.Main.Medium, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: color.GY[1],
});

export const summaryStatusWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
});

export const summaryText = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});
