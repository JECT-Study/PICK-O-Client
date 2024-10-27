import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonWrapStyle = (option: 'A' | 'B') =>
  css({
    cursor: 'pointer',
    padding: '0',
    color: color.BK,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '561px',
    minHeight: '488px',
    flexGrow: 1,
    backgroundColor: 'transparent',
    borderRadius: option === 'A' ? '20px 0 0 20px' : '0 20px 20px 0',
    overflow: 'hidden',

    '&:hover': {
      zIndex: option === 'A' ? 100 : 'auto',
      boxShadow:
        option === 'A'
          ? `-5px 0px 5px rgba(255, 175, 191, 0.2)`
          : `5px 0px 5px rgba(157, 183, 255, 0.3)`,
      outline:
        option === 'A'
          ? `2px solid ${color.PINK}`
          : `2px solid  ${color.SKYBLUE}`,
    },

    '&:active': {
      backgroundColor:
        option === 'A'
          ? `-5px 0px 15px ${color.RED}`
          : `5px 0px 15px ${color.BLUE}`,
    },
  });

export const getButtonStyle = (
  side: 'A' | 'B',
  selectedButton: 'A' | 'B' | null,
) =>
  css({
    ...(selectedButton === side && {
      backgroundColor: side === 'A' ? color.RED : color.BLUE,
      color: color.WT,
      outline: 'none',
    }),
  });

export const textImageStyle = (randomImage: string) =>
  css(typo.Title, {
    display: 'flex',
    width: '100%',
    height: '320px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${randomImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

export const imageStyle = css({
  width: '100%',
  height: '320px',
  objectFit: 'cover',
});

export const contentBoxStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '561px',
  flexGrow: 1,
});

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const descriptionStyle = css(typo.Main.Medium, {
  width: '140px',
});

export const nameStyle = css(typo.Title, {
  width: '561px',
});
