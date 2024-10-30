import { css } from '@emotion/react';
import color from '@/styles/color';

export const listContainer = css({
  display: 'flex',
  flexDirection: 'column',
});

export const contentContainer = css({
  display: 'flex',
  flexDirection: 'row',
  margin: '10px 0',
  alignItems: 'center',
});

export const leftContainer = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  marginRight: '104px',
});

export const topWrapper = css({
  width: '397px',
  height: '30px',
  borderRadius: '10px',
  backgroundColor: color.GY[3],
});

export const bottomWrapper = css({
  width: '862px',
  height: '46px',
  borderRadius: '15px',
  backgroundColor: color.GY[3],
});

export const imageWrapper = css({
  width: '100px',
  height: '100px',
  borderRadius: '10px',
  backgroundColor: color.GY[3],
});
