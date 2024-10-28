import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const todayTalkPickStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '25px',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});

export const talkPickWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '1175px',
  padding: '30px 40px',
  backgroundColor: color.WT,
  outline: `1px solid ${color.GY[2]}`,
  borderRadius: '20px',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.07)',
});

export const talkPickTopStyling = css({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '17px',
  gap: '7px',
});

export const talkPickDetailWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '70px',
});

export const talkPickContentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 0',
  gap: '40px',
  borderTop: '1px solid #F4F4F4',
  borderBottom: '1px solid #F4F4F4',
});

export const talkPickTitle = css(typo.Title, {
  width: '100%',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  color: color.BK,
});

export const talkPickDetail = css(typo.Comment.SemiBold, {
  color: color.GY[1],
});

export const talkPickDate = css(typo.Number.Medium, {
  marginLeft: '10px',
  marginRight: '3px',
  color: color.GY[1],
});

export const talkPickView = css(typo.Number.Medium, {
  marginLeft: '5px',
  color: color.MAIN,
});

export const talkPickContent = css(typo.Main.Medium, {
  width: '100%',
  paddingTop: '40px',
  paddingLeft: '173px',
  paddingRight: '173px',
  borderTop: '1px solid #F4F4F4',
  color: color.BK,
});

export const talkPickImageWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  gap: '15px',

  '& > img': {
    maxWidth: '100%',
    width: 'auto',
    height: 'auto',
  },
});

export const voteBarWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
  paddingBottom: '15px',
});

export const talkPickBtnWrapper = css({
  display: 'flex',
  paddingTop: '20px',
  gap: '32px',
});

export const contentBtnStyling = css({
  width: 'fit-content',
});

export const shareBtnStyling = css(typo.Main.SemiBold);

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '1000',
});
