import { css } from '@emotion/react';

export const pageContainer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '1174px',
  alignItems: 'center',
  gap: '20px',
});

export const optionsContainer = css({
  display: 'flex',
  marginTop: '15px',
  gap: '20px',
  width: '100%',
  justifyContent: 'space-around',
});

export const draftPostButtonContainer = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'flex-end',
});

export const navigationContainer = css({
  display: 'flex',
  marginTop: '24px',
  width: '100%',
  justifyContent: 'center',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});

export const titleDescriptionFieldContainer = css({
  position: 'relative',
});

export const tagEditButtonContainer = css({
  position: 'absolute',
  top: '16px',
  right: '21px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '50',
});
