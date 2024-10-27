import { css } from '@emotion/react';
import color from '@/styles/color';

export const contentWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  background: color.WT,
  padding: '113px 388px 95px 374px',
});

export const categoryBoxStyle = css({
  margin: '109px 0 137px 0',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
