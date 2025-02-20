import color from '@/styles/color';
import { css } from '@emotion/react';

export const contentWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const commentsWrapStyle = css({
  margin: '444px 0 90px',
  borderTop: `10px solid ${color.GY[5]}`,
  width: '100%',
});
