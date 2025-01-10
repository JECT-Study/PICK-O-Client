import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

const getBorderColor = (type: 'A' | 'B', isContentEmpty: boolean) =>
  isContentEmpty
    ? color.GY[2]
    : {
        A: color.RED,
        B: color.BLUE,
      }[type];

export const container = (type: 'A' | 'B', isContentEmpty: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '335px',
    padding: '5px',
    borderRadius: '10px',
    border: `1px solid ${getBorderColor(type, isContentEmpty)}`,
    backgroundColor: isContentEmpty ? color.GY[3] : color.WT,
  });

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '50px',
});

export const photoLabel = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const fileInput = css({
  display: 'none',
});

export const textContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const titleInput = css(typo.Mobile.Main.Medium_16, {
  color: color.BK,
  outline: 'none',
  paddingLeft: '10px',
  width: '240px',

  '&::placeholder': {
    color: color.GY[1],
    opacity: 1,
  },
});

export const additionalContainer = css({
  borderTop: `1px solid ${color.GY[2]}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '50px',
  marginTop: '5px',
  padding: '5px 0 0 9px',
});

export const subTitleInput = css(typo.Mobile.Main.Medium_16, {
  width: '100%',
  color: color.BK,
  outline: 'none',

  '&::placeholder': {
    color: color.GY[1],
    opacity: 1,
  },
});

export const expandButton = css({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  color: color.GY[1],
});
