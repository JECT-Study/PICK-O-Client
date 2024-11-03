import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const MainContainer = css`
  display: flex;
  flex-direction: column;
  width: 1175px;
  border-top: 1px solid #f4f4f4;
`;

export const myReplyColor = css`
  background-color: ${color.WT_VIOLET};
`;

export const ReplyContainer = css`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 30px 10px 20px 27px;
  border-top: 1px solid #f4f4f4;
`;

export const ReplyWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 80px;
  gap: 7px;
`;

export const ReplyTopWrapper = css`
  display: flex;
  justify-content: space-between;
`;

export const nicknameWrapper = css`
  display: flex;
  gap: 10px;
`;

export const nickname = css`
  ${typo.Comment.SemiBold}
  color: ${color.BK};
`;

export const createdTime = css`
  ${typo.Comment.SemiBold}
  color: #67727E;
  margin-left: 10px;
`;

export const editedText = css`
  ${typo.Comment.Regular}
  color: ${color.GY[1]};
`;

export const ReplyTextWrapper = css`
  display: flex;
  width: 100%;
  padding-right: 20px;
  ${typo.Comment.Regular}
  color: #505050;
`;

export const ReplyBottomWrapper = css`
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
`;

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
