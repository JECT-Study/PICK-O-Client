import { css } from '@emotion/react';
import color from '@/styles/color';

export const dateWrapper = css({
  width: '88px',
  height: '17px',
  borderRadius: '20px',
  backgroundColor: color.GY[3],
  marginBottom: '9px',
});

export const cardWrapper = css({
  width: '432px',
  height: '354px',
  borderRadius: '15px',
  backgroundColor: color.GY[3],
  marginBottom: '20px',
});

export const cardContainer = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
});
