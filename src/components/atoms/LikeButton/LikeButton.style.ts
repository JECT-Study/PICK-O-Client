import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const likeButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s, color 0.3s',
  '@media (max-width: 430px)': {
    display: 'flex',
    padding: 0,
  },
});

export const icon = css({
  width: '22px',
  height: '22px',
  objectFit: 'contain',
  '@media (max-width: 430px)': {
    width: '16px',
    height: '16px',
  },
});

export const defaultLabel = css({
  ...typo.Number.Medium_18,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '22px',
  height: '29px',
  color: color.GY[1],
  padding: 0,
  margin: 0,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Main.Regular_12,
    width: '15px',
    height: '15px',
  },
});

export const pressedLabel = css({
  ...typo.Number.Medium_18,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '22px',
  height: '29px',
  color: color.MAIN,
  padding: 0,
  margin: 0,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Main.Regular_12,
    width: '15px',
    height: '15px',
  },
});
