import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const pageStyle = css({
  height: '1217px',
  marginTop: '60px',
  marginBottom: '78px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const createTalkPickStyling = css({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
});

export const createTalkPickTextWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '35px',
});

export const createTalkPickSubTitle = css(typo.SubTitle, {
  display: 'flex',
  fontWeight: 'bold',
  color: color.BK,
});

export const createTalkPickTitle = css(typo.Title, {
  display: 'flex',
  color: color.BK,
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
