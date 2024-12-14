import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const shareModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const textStyling = css(typo.Comment.SemiBold, {
  marginTop: '24px',
  marginBottom: '23px',
  color: color.BK,
});

export const shareTextStyling = css(typo.Comment.SemiBold, {
  color: color.MAIN,
});
