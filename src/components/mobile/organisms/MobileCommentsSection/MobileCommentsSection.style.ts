import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const commentsSectionContainer = css({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '13px',
  // paddingBottom: '85px',
  backgroundColor: color.WT,
  overflowY: 'auto',
  gap: '10px',
});

export const commentTopWrapper = css(typo.Mobile.Text.SemiBold_14, {
  display: 'flex',
  margin: '0 11px 0 20px',
  alignItems: 'flex-start',
  color: color.GY[7],
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

export const toastModalWrapper = css({
  position: 'absolute',
  top: '76px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
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
  gap: '17px',
});

export const nonCommentsWrapper = css(typo.Text.Regular, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '68px 0 24px 0',
  color: color.GY[1],
});

export const nonCommentsTopWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
});
