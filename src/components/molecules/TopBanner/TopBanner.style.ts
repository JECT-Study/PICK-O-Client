import { css } from '@emotion/react';
import color from '@/styles/color';

export const bannerStyling = css({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
});

export const getBannerMovement = (idx: number) =>
  css({
    display: 'flex',
    transform: `translateX(calc(-100% * ${idx}))`,
    transition: '0.5s ease-in-out',
  });

export const bannerWrapperStyling = css({
  flex: '0 0 100%',
});

export const dotWrapperStyling = css({
  display: 'flex',
  left: '50%',
  transform: 'translate(-50%)',
  bottom: '20px',
  gap: '13px',
  position: 'absolute',
});

export const dotStyling = css({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: '#555555',
  transition: '0.5s ease-in-out',
  cursor: 'pointer',
});

export const activeDotStyling = css({
  width: '79px',
  borderRadius: '10px',
  backgroundColor: color.GY[2],
});
