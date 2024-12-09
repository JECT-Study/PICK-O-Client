import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const toggleGroupStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

export const clickedToggleStyle = (isOpen: boolean) =>
  css(typo.Mobile.Text.SemiBold_12, {
    color: color.MAIN,
    backgroundColor: color.WT_VIOLET,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px 4px 9px',
    borderBottom: isOpen ? `0.6px solid ${color.SKYBLUE}` : undefined,
    borderRadius: isOpen ? undefined : '6px',
    cursor: 'pointer',
  });

export const unClickedToggleStyle = css(typo.Mobile.Text.SemiBold_12, {
  color: color.GY[1],
  backgroundColor: color.WT,
  padding: '4px 26px 4px 9px',
  transition: 'all .1s ease-in',
  borderRadius: '0 0 6px 6px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: color.WT_VIOLET,
  },
});
