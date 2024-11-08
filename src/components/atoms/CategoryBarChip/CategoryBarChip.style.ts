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
  };

  return style[size];
};

export const categoryBarChipStyling = css(typo.Comment.SemiBold, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.MAIN,
  color: color.WT,
});
