import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const balanceGameStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '62px',
});

export const balanceGameContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1175px',
  minHeight: '874x',
  padding: '40px',
  gap: '30px',
  borderRadius: '20px',
  border: `1px solid ${color.GY[2]}`,
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.07)',
});

export const balanceGameWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
  minHeight: '100px',
});

export const balanceGameTitleWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const balanceGameInfoWrapper = css({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '5px',
});

export const balanceGameMenuWrapper = css({
  display: 'flex',
  gap: '5px',
});

export const balanceGameTitle = css(typo.Title, {
  color: color.BK,
});

export const balanceGameSubTitle = css(typo.SubTitle, {
  color: color.BK,
  fontWeight: 'bold',
});

export const titleWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const textWrapper = css({
  display: 'flex',
  paddingTop: '15px',
  paddingRight: '20px',
  gap: '17px',
});

export const tagStyling = css({
  paddingTop: '15px',
});

export const nicknameStyling = css(typo.Comment.SemiBold, {
  color: color.GY[1],
});

export const dateStyling = css(typo.Number.Medium, {
  color: color.GY[1],
  fontWeight: 'bold',
});

export const stageBarWrapper = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px 0',
});

export const buttonStyling = css(typo.Comment.SemiBold, {
  display: 'flex',
  width: '193px',
  height: '60px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  border: `1px solid ${color.MAIN}`,
  borderRadius: '5px',
  color: color.MAIN,
  cursor: 'pointer',

  svg: {
    fill: color.MAIN,
  },
});

export const activeButtonStyling = (isAble: boolean) => {
  if (isAble) {
    return css({
      ':hover': {
        backgroundColor: color.MAIN,
        color: color.WT,

        svg: {
          fill: color.WT,
        },
      },
    });
  }
  return css({});
};

export const getButtonVisibility = (gameStage: number) => {
  return css({
    visibility: gameStage === 0 ? 'hidden' : 'visible',
  });
};

export const buttonWrapper = css({
  display: 'flex',
  gap: '20px',
});

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
