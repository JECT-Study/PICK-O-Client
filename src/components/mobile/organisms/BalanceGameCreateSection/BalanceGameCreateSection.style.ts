import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const balanceGameStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '374px',
  height: `calc(100vh - 80px)`,
  maxHeight: '800px',
  position: 'relative',
});

export const balanceGameTopWrapper = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 20px',
  borderBottom: `1px solid ${color.GY[3]}`,
});

export const balanceGameTextWrapper = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
});

export const balanceGameTextStyle = css(typo.Main.SemiBold, {
  color: color.BK,
});

export const cardTextWrapper = css({
  display: 'flex',
  width: '100%',
});

export const cardTextStyle = css(typo.Comment.SemiBold, {
  color: color.BK,
});

export const cardTextSubStyle = css(typo.Comment.Regular, {
  color: color.BK,
});

export const cardButtonWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '0 10px',
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translate(-50%)',
  background:
    'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '15px',
  marginTop: '8px',
});

export const getButtonVisibility = (gameStage: number) => {
  return css({
    visibility: gameStage === 0 ? 'hidden' : 'visible',
  });
};

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '65px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1001',
});
