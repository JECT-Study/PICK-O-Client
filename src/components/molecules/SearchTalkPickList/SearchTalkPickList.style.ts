import { css } from '@emotion/react';
import color from '@/styles/color';

export const listContainerStyle = css({
  border: `1px solid ${color.GY[2]}`,
  width: '1145px',
  maxHeight: '1240px',
  borderRadius: '10px',
  padding: '30px 40px',
  background: color.WT,
});

export const dividerStyle = css({
  margin: '10px 0 10px 0',
});
