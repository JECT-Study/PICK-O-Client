import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import {
  BlueGameBg,
  ForestGameBg,
  GrayGameBg,
  GreenGameBg,
  PinkGameBg,
  PurpleGameBg,
} from '@/assets';

export const gameBackgrounds: string[] = [
  PurpleGameBg,
  BlueGameBg,
  GrayGameBg,
  ForestGameBg,
  GreenGameBg,
  PinkGameBg,
];

export const containerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '20px',
  outline: `1px solid ${color.GY[2]}`,

  '&:hover': {
    outline: 'none',
  },

  '&:hover > div': {
    visibility: 'hidden',
  },
});

export const getOutlineStyle = (selectedButton: 'A' | 'B' | null) => {
  if (selectedButton === null) {
    return css({});
  }

  return css({
    outline: 'none',
  });
};

export const letterStyle = css(typo.Title, {
  color: color.GY[1],
  position: 'absolute',
  bottom: '35px',
  left: '557.5px',
  transform: 'translate(-50%, -50%)',
});
