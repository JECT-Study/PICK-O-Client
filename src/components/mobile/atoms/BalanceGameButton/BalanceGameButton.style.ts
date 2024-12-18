import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonWrapStyle = (option: 'A' | 'B', isSelected: boolean) =>
  css({
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    width: '305px',
    backgroundColor: color.WT,
    borderRadius: '10px',
    overflow: 'hidden',
    outline: isSelected
      ? `2px solid ${option === 'A' ? color.RED : color.BLUE}`
      : 'none',
  });

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

export const imageStyle = css({
  width: '90px',
  height: '90px',
  borderRadius: '10px',
  objectFit: 'cover',
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
