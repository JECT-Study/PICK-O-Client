import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonStyle = css(typo.Comment.SemiBold, {
  outline: 'none',
  color: color.MAIN,
  cursor: 'pointer',
});
