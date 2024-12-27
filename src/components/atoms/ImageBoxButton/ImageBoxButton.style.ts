import { css } from '@emotion/react';
import color from '@/styles/color';

export const imageContainer = css({
  display: 'flex',
  width: '577px',
  height: '359px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  borderRadius: '20px',
  border: `1px solid ${color.GY[2]}`,
  backgroundColor: color.WT,
  boxShadow: '1px 2px 15px 0 rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',

  "[data-has-img='true']:hover::after": {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },

  "[data-has-img='true']:hover .trashIcon": {
    opacity: 1,
    visibility: 'visible',
  },
});

export const defaultImageBox = css({
  display: 'flex',
  width: '100px',
  height: '100px',
  padding: '20px 30px',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
  borderRadius: '15px',
  border: `1px solid ${color.GY[2]}`,
  backgroundColor: color.GY[2],
  boxShadow: '1px 2px 30px 0 rgba(0, 0, 0, 0.15)',
});

export const iconStyle = css({
  width: '36px',
  height: '36px',
  flexShrink: 0,
  color: color.GY[1],
  boxShadow: '1px 2px 30px 0 rgba(0, 0, 0, 0.15)',
});

export const trashImageBox = css({
  display: 'flex',
  width: '120px',
  height: '120px',
  flexShrink: 0,
  backgroundColor: color.GY[2],
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  position: 'absolute',
  zIndex: 2,
});

export const trashImage = css({
  width: '63px',
  height: '63px',
});

export const uploadedImage = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
});

export const fileInput = css({
  display: 'none',
});
