import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { CategoryBarChipProps } from './CategoryBarChip';

export const getStylingBySize = (
  size: Required<CategoryBarChipProps>['size'],
) => {
  const style = {
    large: css({
      borderRadius: '30px',
      padding: '5px 32px',
    }),
    small: css({
      borderRadius: '25px',
      padding: '0 12px',
    }),
    extraSmall: css({
      borderRadius: '3px',
      padding: '3px 6px',
    }),
  };

  return style[size];
};

export const categoryBarChipStyling = css({
  ...typo.Comment.SemiBold,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.MAIN,
  color: color.WT,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.SemiBold_10,
    backgroundColor: color.WT_VIOLET,
    color: color.MAIN,
  },
});
