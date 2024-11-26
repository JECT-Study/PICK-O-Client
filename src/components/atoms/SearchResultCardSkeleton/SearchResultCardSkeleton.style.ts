import { css } from '@emotion/react';
import color from '@/styles/color';

export const gridContainer = css({
  display: 'grid',
  width: '1146px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
});

export const cardWrapper = css({
  width: '369px',
  height: '278px',
  borderRadius: '10px',
  backgroundColor: color.GY[3],
});

export const rowContainer = css({});
