import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import { COMMENT } from '@/constants/message';

export const inputContainer = css({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: color.WT,
  borderTop: `1px solid ${color.GY[4]}`,
  padding: '9px 20px 11px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const inputBoxWrapper = (length: number) =>
  css({
    backgroundColor: color.GY[5],
    padding: '3px 4px 3px 18px',
    width: '335px',
    height: 'auto',
    borderRadius: length < 20 ? '30px' : '17px',
    display: 'flex',
  });

export const inputStyling = css(typo.Text.Regular, {
  flex: 1,
  border: 'none',
  outline: 'none',
  width: '213px',
  resize: 'none',
  overflowY: 'auto',
  maxHeight: '66px',
  height: 'auto',
  '&::placeholder': {
    color: color.GY[6],
  },
});

export const rightContainer = (length: number) =>
  css({
    display: 'flex',
    alignItems: 'end',
    visibility: length === 0 ? 'hidden' : 'visible',
  });

export const rightWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const charCountContainer = css({
  display: 'flex',
  alignItems: 'center',
});

export const charCountStyling = (length: number) =>
  css(typo.Mobile.Text.Medium_12, {
    color: length > COMMENT.MAX_LENGTH ? color.PINK : color.SKYBLUE,
  });

export const charDefaultStyling = css(typo.Mobile.Text.Medium_12, {
  color: color.GY[2],
});

export const buttonStyling = css({
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '8px 15.5px',
  backgroundColor: color.MAIN,
  borderRadius: '60px',
  cursor: 'pointer',
});
