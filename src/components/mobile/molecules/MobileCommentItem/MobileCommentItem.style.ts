import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const MainContainer = css({
  display: 'flex',
  flexDirection: 'column',
});

export const myCommentColor = css({
  backgroundColor: color.WT_VIOLET,
});

export const commentContainer = css({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
  gap: '8px',
});

export const profileWrapper = css({
  display: 'flex',
});

export const commentInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '3.5px',
});

export const commentTopWrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const writerInfoWrapper = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

export const nickname = css({
  ...typo.Mobile.Text.SemiBold_12,
  color: color.GY[1],
});

export const createdTime = css({
  ...typo.Mobile.Main.Regular_12,
  color: color.GY[1],
  marginLeft: '8px',
});

export const commentTextWrapper = css({
  ...typo.Text.Regular,
  display: 'flex',
  width: '100%',
  paddingRight: '20px',
  color: color.BK,
});

export const commentBottomWrapper = css({
  display: 'flex',
  paddingRight: '15px',
  gap: '18px',
});

export const replyButton = css({
  ...typo.Mobile.Text.Medium_12,
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  background: 'none',
  color: color.GY[1],
  padding: 0,
});
