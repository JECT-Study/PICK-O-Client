import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const defaultProfileModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: '17px',
});

export const selectTextStyling = css(typo.Main.SemiBold_16, {
  color: color.BK,
  marginTop: '22px',

  '& > span': {
    color: color.MAIN,
  },
});

export const imageWrapperStyling = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '10px',
});

export const imageButtonStyling = css({
  all: 'unset',
  width: '70px',
  height: '70px',
  borderRadius: '3px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
});

export const profileImage = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const selectedImageStyling = css({
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: `3px solid ${color.MAIN}`,
    borderRadius: '3px',
  },
});

export const selectButtonStyling = (selected: boolean) =>
  css({
    width: '293px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: selected ? color.MAIN : color.GY[2],
  });
