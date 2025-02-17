import color from '@/styles/color';
import { css } from '@emotion/react';

export const contentWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const commentsWrapStyle = css({
  marginTop: '444px',
  borderTop: `10px solid ${color.GY[5]}`,
  width: '100%',
});
