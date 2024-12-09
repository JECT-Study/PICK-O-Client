import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { ButtonProps } from './Button';

export const getVariantStyling = (
  variant: Required<ButtonProps>['variant'],
  active: boolean,
) => {
  const style = {
    primary: css({
      borderRadius: '10px',
      backgroundColor: active ? color.MAIN : color.GY[2],
      color: color.WT,
    }),
    roundPrimary: css({
      borderRadius: '80px',
      backgroundColor: active ? color.MAIN : color.GY[2],
      color: color.WT,
    }),
  };

  return style[variant];
};

export const getSizeByVariantStyling = (
  variant: Required<ButtonProps>['variant'],
  size: Required<ButtonProps>['size'],
) => {
  const style = {
    primary: {
      large: css(typo.Main.SemiBold, {
        width: '335px',
        height: '50px',
      }),
      medium: css(typo.Main.SemiBold, {
        width: '130px',
        height: '50px',
      }),
    },
    roundPrimary: {
      large: css(typo.Mobile.Text.SemiBold_14, {
        width: '295px',
        height: '40px',
      }),
      medium: css({}),
    },
  };

  return style[variant][size];
};

export const buttonStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
});
