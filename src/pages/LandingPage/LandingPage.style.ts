import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const contentWrapStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  background: color.WT,
  padding: '113px 388px 95px 374px',
  '@media (max-width: 430px)': {
    padding: '18px 20px',
  },
});

export const pageWrapperStyle = css({
  position: 'relative',
});

export const floatingDropdownStyle = css({
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  zIndex: 50,
});

export const categoryBoxStyle = css({
  margin: '109px 0 137px 0',
});

export const searchBoxStyle = css({
  margin: '30px 0',
  gap: '14px',
  display: 'flex',
  flexDirection: 'column',
});

export const searchBoxTitleStyle = css(typo.Mobile.Text.Bold_16, {
  color: color.BK,
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
  '@media (max-width: 430px)': {
    top: '65px',
  },
});
