import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonWrapStyle = css({
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: '305px',
  backgroundColor: color.WT,
  borderRadius: '10px',
  overflow: 'hidden',
});

export const getOutlineStyle = (option: 'A' | 'B', isSelected: boolean) => {
  if (!isSelected) return css({});

  return css({
    outline:
      option === 'A' ? `2px solid ${color.RED}` : `2px solid ${color.BLUE}`,
  });
};

export const nameWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '12px 20px',
});

export const nameStyle = css(typo.Mobile.Text.SemiBold_14, {
  width: '220px',
  fontSize: '16px',
});

export const imgContainer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '90px',
  height: '90px',
  borderRadius: '10px',
  backgroundColor: color.GY[2],
  overflow: 'hidden',
  flexShrink: 0,
});

export const imgStyle = css({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
});

export const contentWrapper = css({
  display: 'flex',
  width: '100%',
  padding: '15px 20px',
  gap: '15px',
  borderTop: `1px solid ${color.GY[4]}`,
});

export const descriptionStyle = css(typo.Mobile.Main.Regular_12, {
  display: 'flex',
  width: '100%',
});
