import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';
import type { InputProps } from './Input';

export const inputContainerStyling = css({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
});

export const inputWrapperStyling = css({
  display: 'flex',
  gap: '14px',
  alignItems: 'center',
  paddingTop: 0,
  paddingBottom: 0,
  backgroundColor: color.WT,

  '&:focus-within': {
    outline: `1.5px solid ${color.MAIN}`,
  },

  '& svg': {
    width: '24px',
    height: '24px',
  },
});

export const getVariantStyling = (variant: Required<InputProps>['variant']) => {
  const style = {
    default: css({
      backgroundColor: 'transparent',
      outline: `1px solid ${color.GY[2]}`,
      borderRadius: '10px',
    }),
  };

  return style[variant as keyof typeof style];
};

export const getSizeStyling = (size: Required<InputProps>['size']) => {
  const style = {
    small: css(typo.Main.SemiBold, {
      width: '461px',
      height: '66px',
      padding: '19px 16px 19px 19px',
    }),
    medium: css(typo.SubTitle, {
      padding: '21px 23px',
    }),
  };

  return style[size];
};

export const getInputStyling = css({
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
  border: 'none',
  outline: 0,
  color: color.BK,

  '&::placeholder': {
    color: color.GY[1],
  },
});
