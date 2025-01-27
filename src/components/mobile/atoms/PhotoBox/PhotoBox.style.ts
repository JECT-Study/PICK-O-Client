import { css } from '@emotion/react';
import color from '@/styles/color';

export const imgContainer = (imgUrl: boolean) =>
  css({
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    backgroundColor: imgUrl ? color.GY[2] : color.GY[3],
    flexShrink: 0,
    overflow: 'hidden',
    cursor: 'pointer',
  });

export const imageWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const icon = css({
  width: '24px',
  height: '20px',
  color: color.GY[1],
  flexShrink: 0,
});

export const overlay = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1,
});

export const trashCanIcon = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  zIndex: 2,
});

export const image = css({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

export const fileInput = css({
  display: 'none',
});
