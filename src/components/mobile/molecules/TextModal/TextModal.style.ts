import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const textModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '23px',
});

export const textStyling = css(typo.Comment.SemiBold, {
  color: color.BK,
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '9px',
});
