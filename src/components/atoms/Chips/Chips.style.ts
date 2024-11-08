import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { ChipsProps } from './Chips';

export const chipsStyling = css(typo.Main.SemiBold, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  backgroundColor: color.WT,
  color: color.MAIN,
  outline: `1px solid ${color.MAIN}`,
});

export const getChipStyling = (variant: Required<ChipsProps>['variant']) => {
  const style = {
    outline: css({
      padding: '10px 18px',
      borderRadius: '12px',
    }),
    roundOutline: css({
      padding: '10px 25px',
      borderRadius: '50px',
    }),
  };

  return style[variant];
};
