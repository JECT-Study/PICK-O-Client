import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '333px',
  border: 'none',
  backgroundColor: color.WT,
});

export const dateStyle = css(typo.Mobile.Main.Regular_12, {
  color: color.GY[1],
  marginBottom: '6px',
});

export const listStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
});

export const listItemStyle = css({});
