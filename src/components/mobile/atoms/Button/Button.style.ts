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
    Primary2: css({
      borderRadius: '6px',
      backgroundColor: color.MAIN,
      color: color.WT,
    }),
    outlineShadow: css({
      border: `1px solid ${color.GY[4]}`,
      borderRadius: '6px',
      backgroundColor: color.GY[5],
      color: color.GY[1],
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
    Primary2: {
      large: css({}),
      medium: css({
        width: '64px',
        height: '34px',
      }),
    },
    outlineShadow: {
      large: css({}),
      medium: css({
        width: '64px',
        height: '34px',
      }),
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
