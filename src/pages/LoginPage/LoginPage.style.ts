import { css } from '@emotion/react';
import color from '@/styles/color';

export const loginContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: '118px',
  paddingBottom: '60px',
  backgroundColor: color.GY[3],

  '@media (max-width: 430px)': {
    paddingTop: '60px',
    backgroundColor: color.WT,
  },
});

export const logoStyle = css({
  marginBottom: '24px',

  '@media (max-width: 430px)': {
    marginBottom: '50px',
  },
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
