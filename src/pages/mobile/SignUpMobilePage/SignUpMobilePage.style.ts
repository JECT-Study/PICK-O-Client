import color from '@/styles/color';
import typo from '@/styles/typo';
import { css } from '@emotion/react';

export const signupContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: `calc(100vh - 80px)`,
  maxHeight: '800px',
  paddingTop: '10px',
  position: 'relative',
});

export const signUpHeadingStyling = css(typo.Mobile.Title.SemiBold_22, {
  width: '335px',
  color: color.BK,
});

export const scrollFormStyling = css({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  height: '100%',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const profileImageWrapper = css({
  margin: '15px 0px 30px 0px',
});

export const inputWrapper = css({
  marginBottom: '60px',
});

export const btnContainer = css({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '0 10px',
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%)',
  background:
    'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
});

export const signupToastModalStyling = css({
  position: 'fixed',
  top: '65px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
