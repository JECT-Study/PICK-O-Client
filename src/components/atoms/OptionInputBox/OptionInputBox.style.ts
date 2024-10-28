import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const optionInputStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

export const contentWrapStyling = css(typo.SubTitle, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '517px',
  height: '80px',
  padding: '30.5px 22px 32.5px 63px',
  backgroundColor: color.WT,
  outline: `1px solid ${color.GY[2]}`,
  boxShadow: `1px 2px 15px rgba(0, 0, 0, 0.05)`,
  borderRadius: '20px',
});

export const getOutlineStyling = (
  isFocused: boolean,
  hasText: boolean,
  option: 'A' | 'B',
) => {
  if (hasText) {
    return css({
      outline: `1px solid ${option === 'A' ? color.RED : color.BLUE}`,
    });
  }

  if (isFocused) {
    return css({
      outline: `1px solid ${color.MAIN}`,
    });
  }

  return css({});
};

export const getErrorStyling = css({
  outline: `3px solid ${color.RED}`,
});

export const optionStyling = (option: 'A' | 'B') =>
  css({
    color: option === 'A' ? color.RED : color.BLUE,
    marginRight: '34px',
  });

export const textStyling = css({
  width: '340px',
  marginRight: '20px',
  color: color.BK,
  '::placeholder': {
    color: color.GY[1],
  },
});
