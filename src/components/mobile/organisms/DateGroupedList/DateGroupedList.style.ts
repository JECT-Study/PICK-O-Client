import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '335px',
  padding: '12px 22px 8px 20px',
  borderRadius: '5px',
  backgroundColor: color.WT,
  boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
});

export const dateStyle = css(typo.Mobile.Main.Regular_12, {
  color: color.GY[1],
  marginBottom: '2px',
});

export const listStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const listItemStyle = css({
  borderBottom: `0.6px solid ${color.GY[2]}`,
  paddingBottom: '6px',
  ':last-of-type': {
    borderBottom: 'none',
  },
});
