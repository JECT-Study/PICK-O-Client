import { css } from '@emotion/react';
import color from '@/styles/color';

export const bannerStyling = css({
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  '@media (max-width: 430px)': {
    height: '227px',
  },
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
  '@media (max-width: 430px)': {
    bottom: '14px',
    gap: '5px',
  },
});

export const dotStyling = css({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: color.GY[4],
  transition: '0.5s ease-in-out',
  cursor: 'pointer',
  '@media (max-width: 430px)': {
    width: '4px',
    height: '4px',
  },
});

export const activeDotStyling = css({
  width: '79px',
  borderRadius: '10px',
  backgroundColor: color.GY[2],
  '@media (max-width: 430px)': {
    width: '32px',
    height: '4px',
  },
});
