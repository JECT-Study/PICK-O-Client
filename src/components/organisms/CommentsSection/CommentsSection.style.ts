import { css } from '@emotion/react';
import color from '@/styles/color';

export const commentsSectionContainer = css({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '5px',
  paddingBottom: '100px',
  margin: '0 auto',
  backgroundColor: color.WT,
  overflowY: 'auto',
  gap: '23px',
});

export const commentTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 5px',
});

export const loggedInBackground = css({
  width: '100%',
  height: 'auto',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '29px',
  position: 'relative',
});

export const loggedOutBackground = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(11px)',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '29px',
});

export const commentsWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: 0,
  margin: 0,
  height: 'auto',
});

export const paginationWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '17px',
  width: '100%',
  height: '40px',
  flexShrink: 0,
});

export const toastModalWrapper = css({
  position: 'absolute',
  top: '76px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
});
