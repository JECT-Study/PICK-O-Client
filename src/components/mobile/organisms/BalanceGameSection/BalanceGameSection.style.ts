import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const balanceGameStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '335px',
  height: '680px',
  gap: '12px',
  position: 'relative',
});

export const balancGameTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const balanceGameScrollStyling = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: '12px',
  overflowY: 'scroll',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const balanceGameSectionStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '18px 15px',
  gap: '11px',
  backgroundColor: color.WT_VIOLET,
  borderRadius: '18px',
});

export const stageStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '3px 12px',
  backgroundColor: color.WT,
  borderRadius: '40px',
});

export const menuStyling = css({
  position: 'absolute',
  right: '0',
});

export const stageWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
});

export const titleStyling = css(typo.Mobile.Title.SemiBold_24, {
  width: '260px',
  textAlign: 'center',
});

export const descriptionStyling = css(typo.Mobile.Main.Regular_12, {
  width: '260px',
  textAlign: 'center',
});

export const subTagWrapper = css({
  display: 'flex',
  width: '100%',
  marginBottom: '50px',
});

export const iconButtonWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const stageButtonWrapper = css({
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

export const getButtonVisibility = (gameStage: number) => {
  return css({
    visibility: gameStage === 0 ? 'hidden' : 'visible',
  });
};

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});
