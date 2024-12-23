import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const fieldStyling = css({
  display: 'flex',
  flexDirection: 'column',
  width: '375px',
  padding: '12px 20px',
});

export const dividerWrapper = css({
  margin: '12px 0',
});

export const titleStyling = css(typo.Mobile.Main.Medium_16, {
  width: '100%',
  color: color.BK,

  '::placeholder': {
    color: color.GY[1],
  },
});

export const descriptionStyling = css(typo.Mobile.Text.Medium_12, {
  fontSize: '14px',
  width: '100%',
  height: '200px',
  resize: 'none',
  color: color.BK,

  '::placeholder': {
    color: color.GY[1],
  },
});
