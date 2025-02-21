import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const talkPickStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

export const talkPickTitle = css(typo.Main.SemiBold, {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  width: '100%',
  color: color.BK,
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const talkPickTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const talkPickWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '330px',
  padding: '10px 0',
  borderTop: `1px solid${color.GY[4]}`,
});

export const talkPickTopStyling = css({
  display: 'flex',
  gap: '10px',
});

export const talkPickInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: '6px',
  gap: '7px',
});

export const talkPickInfoTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const talkPickInfoBottomWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const talkPickWriterWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const talkPickWriterStyling = css(typo.Mobile.Text.Medium_12, {
  color: color.GY[1],
});

export const talkPickDateStyling = css(typo.Mobile.Text.Regular_10, {
  color: color.GY[2],
});

export const talkPickTitleStyling = css(typo.Main.SemiBold, {
  width: '230px',
  wordBreak: 'break-all',
  whiteSpace: 'normal',
  color: color.BK,
});

export const talkPickViewStyling = css(typo.Mobile.Text.Regular_10, {
  color: color.GY[1],
  marginTop: '6px',

  '& > span': {
    color: color.MAIN,
  },
});

export const talkPickContentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 0',
  gap: '17px',
  borderBottom: `1px solid${color.GY[4]}`,
});

export const talkPickContent = css({
  width: '100%',
  padding: '20px 8px 0',
});

export const talkPickContentTextStyling = css(typo.Mobile.Main.Regular_12, {
  width: '100%',
  whiteSpace: 'pre-wrap',
  color: color.BK,
});

export const talkPickImageWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  gap: '8px',

  '& > img': {
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
    borderRadius: '5px',
  },
});

export const voteToggleWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '14px',
});

export const contentBtnStyling = css({
  width: 'fit-content',
});

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
