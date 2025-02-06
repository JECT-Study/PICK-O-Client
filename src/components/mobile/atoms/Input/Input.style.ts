import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const inputContainerStyling = css({
  display: 'flex',
  flexDirection: 'column',
  width: '335px',
  minHeight: '68px',
});

export const inputWrapperStyling = (isSuccess: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '44px',
    gap: '15px',
    borderBottom: isSuccess
      ? `1px solid ${color.MAIN}`
      : `1px solid ${color.GY[2]}`,
  });

export const inputStyling = css(typo.Comment.Regular, {
  width: '100%',
  height: '100%',
  padding: '0',
  outline: '0',
  border: 'none',
  color: color.BK,

  ':-webkit-autofill': {
    boxShadow: '0 0 0px 1000px white inset',
  },

  '&::placeholder': {
    color: color.GY[1],
  },
});
