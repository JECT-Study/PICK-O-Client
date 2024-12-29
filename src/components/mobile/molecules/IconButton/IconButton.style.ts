import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const iconButtonStyle = css({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  width: '84px',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  color: color.GY[1],
  transition: 'background-color 0.3s ease, color 0.3s ease',
  position: 'relative',
});

export const activeStyle = css({
  color: color.BK,

  '&::after': {
    content: "''",
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '16px',
    height: '2px',
    backgroundColor: color.MAIN,
  },
});

export const labelStyle = css(typo.Mobile.Text.SemiBold_12, {
  color: 'inherit',
});
