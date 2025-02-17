import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const MainContainer = css({
  display: 'flex',
  flexDirection: 'column',
  width: '1175px',
});

export const myCommentColor = css({
  backgroundColor: color.WT_VIOLET,
});

export const commentContainer = css({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  padding: '30px 10px 30px 27px',
  gap: '20px',
  borderTop: '1px solid #f4f4f4',
});

export const profileWrapper = css({
  display: 'flex',
});

export const commentInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
});

export const commentTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const writerInfoWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const nickname = css({
  ...typo.Comment.SemiBold,
  color: color.BK,
});

export const createdTime = css({
  ...typo.Comment.SemiBold,
  color: '#67727E',
  marginLeft: '10px',
});

export const editedText = css({
  ...typo.Comment.Regular,
  color: color.MAIN,
});

export const commentTextWrapper = css({
  display: 'flex',
  width: '100%',
  paddingRight: '20px',
  ...typo.Comment.Regular,
  color: '#505050',
});

export const commentBottomWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: '15px',
});

export const replyButton = css({
  display: 'flex',
  gap: '10px',
  ...typo.Comment.SemiBold,
  background: 'none',
  paddingTop: '10px',
  color: color.GY[1],
  cursor: 'pointer',
});

export const repliesWrapper = css({
  display: 'flex',
  flexDirection: 'column',
});

export const replyContainer = css({
  display: 'flex',
  width: '100%',
  height: '210px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderTop: '1px solid #f4f4f4',
  paddingLeft: '105px',
});

export const nicknameInput = css({
  marginBottom: '12px',
  ...typo.Comment.SemiBold,
});

export const moreButtonStyling = css({
  display: 'flex',
  width: '100%',
  height: '80px',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: '1px solid #f4f4f4',
  cursor: 'pointer',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: 1000,
});

export const centerStyling = css({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
});
