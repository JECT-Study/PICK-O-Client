import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { ButtonProps } from './Button';

export const getVariantStyling = (
  variant: Required<ButtonProps>['variant'],
) => {
  const style = {
    primary: css({
      borderRadius: '4px',
      backgroundColor: color.MAIN,
      color: color.WT,
    }),
    primarySquare: css({
      borderRadius: '4px',
      backgroundColor: color.MAIN,
      color: color.WT,
    }),
    roundPrimary: css({
      backgroundColor: color.MAIN,
      color: color.WT,
    }),
    roundPrimary2: css({
      backgroundColor: color.MAIN,
      color: color.WT,

      '&:hover': {
        boxShadow: '1px 2px 15px rgba(119, 130, 255, 0.4)',
      },
    }),
    outlinePrimary: css({
      backgroundColor: 'transparent',
      outline: `1px solid ${color.MAIN}`,
      color: color.MAIN,
      borderRadius: '30px',

      '&:hover': {
        backgroundColor: color.MAIN,
        color: color.WT,
        boxShadow: '1px 2px 15px rgba(119, 130, 255, 0.4)',
      },
    }),
    outlineSecondary: css({
      backgroundColor: color.WT,
      color: color.GY[1],
      outline: `1px solid ${color.GY[1]}`,
      borderRadius: '30px',
      gap: '10px',

      '&:hover': {
        backgroundColor: color.GY[3],
      },
    }),
    outlinePrimarySquare: css({
      backgroundColor: 'transparent',
      outline: `1px solid ${color.MAIN}`,
      color: color.MAIN,
      borderRadius: '4px',
    }),
    outlineShadow: css({
      backgroundColor: 'transparent',
      outline: `1px solid ${color.GY[2]}`,
      borderRadius: '30px',
      gap: '10px',
    }),
    outlineHighlightR: css({
      backgroundColor: 'transparent',
      outline: `2px solid ${color.PINK}`,
      borderRadius: '10px',
      color: color.RED,
      boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.10)',

      '&:hover': {
        boxShadow: `0px 0px 15px ${color.PINK}`,
      },
    }),
    outlineHighlightB: css({
      backgroundColor: 'transparent',
      outline: `2px solid ${color.SKYBLUE}`,
      borderRadius: '10px',
      color: color.BLUE,
      boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.10)',

      '&:hover': {
        boxShadow: `0px 0px 15px ${color.SKYBLUE}`,
      },
    }),
    circle: css({
      borderRadius: '50%',
      backgroundColor: color.MAIN,
      color: color.WT,
      boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    }),
  };

  return style[variant as keyof typeof style];
};

export const getSizeByVariantStyling = (
  variant: Required<ButtonProps>['variant'],
  size: Required<ButtonProps>['size'],
) => {
  const style = {
    primary: {
      large: css(typo.Comment.SemiBold, {
        padding: '8px 16px',
      }),
      medium: css({}),
    },
    primarySquare: {
      large: css(typo.Main.SemiBold, {
        padding: '15.5px 120px',
      }),
      medium: css({}),
    },
    roundPrimary: {
      large: css(typo.SubTitle, {
        padding: '10px 35px',
        borderRadius: '30px',
        boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.15)',
      }),
      medium: css(typo.Main.SemiBold, {
        padding: '10px 25px',
        borderRadius: '25px',
      }),
    },
    roundPrimary2: {
      large: css(typo.Main.SemiBold, {
        padding: '10px 25px',
        borderRadius: '25px',
      }),
      medium: css({}),
    },
    outlinePrimary: {
      large: css(typo.Main.SemiBold, {
        padding: '10px 25px',
      }),
      medium: css({}),
    },
    outlineSecondary: {
      large: css(typo.Main.SemiBold, {
        padding: '10px 25px',
      }),
      medium: css({}),
    },
    outlinePrimarySquare: {
      large: css(typo.Main.SemiBold, {
        padding: '15.5px 105.5px',
      }),
      medium: css({}),
    },
    outlineShadow: {
      large: css(typo.Main.SemiBold, {
        padding: '15px 30px',
        color: color.BK,
        boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
      }),
      medium: css(typo.Number.Medium_18, {
        padding: '10px 35px',
        color: color.MAIN,
        boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.15)',
      }),
    },
    outlineHighlightR: {
      large: css(typo.Component.Bold, {
        width: '410px',
        padding: '22px 50px',
      }),
      medium: css({}),
    },
    outlineHighlightB: {
      large: css(typo.Component.Bold, {
        width: '410px',
        padding: '22px 50px',
      }),
      medium: css({}),
    },
    circle: {
      large: css({
        padding: '16px',
        '& svg': {
          width: '22px',
          height: '22px',
        },
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

  '& svg': {
    width: '24px',
    height: '24px',
  },
});
