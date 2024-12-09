import { css } from '@emotion/react';
// import color from '@/styles/color';

export const overlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  zIndex: 10,
});

export const dropdownStyling = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 20,
});

export const ButtonWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyItem: 'right',
  gap: '10px',
  position: 'absolute',
  bottom: '70px',
  right: 0,
  zIndex: 20,
});

export const dropdownButtonStyling = css({
  cursor: 'pointer',
  zIndex: 20,
  width: '50px',
  height: '50px',
  position: 'absolute',
  bottom: '10px',
  right: '20px',
});
