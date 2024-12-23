import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { ChipsProps } from './Chips';

export const chipsStyling = css({
  ...typo.Main.SemiBold,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  backgroundColor: color.WT,
  color: color.MAIN,
  outline: `1px solid ${color.MAIN}`,
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.SemiBold_10,
    padding: '4px 9px',
  },
});

export const getChipStyling = (variant: Required<ChipsProps>['variant']) => {
  const style = {
    outline: css({
      padding: '10px 18px',
      borderRadius: '12px',
      '@media (max-width: 430px)': {
        padding: '4px 9px',
        borderRadius: '7.2px',
      },
    }),
    roundOutline: css({
      padding: '10px 25px',
      borderRadius: '50px',
    }),
  };

  return style[variant];
};
