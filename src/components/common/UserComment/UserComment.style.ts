import { css } from '@emotion/react';

export const userCommentWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    gap: '1rem',
    borderRadius: '8px',
    padding: '0.8rem',
  });

export const creatorImageWrapper = css({
  ':hover': {
    cursor: 'pointer',
  },
});

export const commentMainWrapper = (isReply: boolean, isAlignLeft: boolean) =>
  css({
    display: 'inline-flex',
    flexDirection: 'column',
    backgroundColor: `${isReply ? '#D4C5D5' : isAlignLeft ? 'white' : '#D9D9D9'}`,
    gap: '0.5rem',
    padding: '1rem',
    borderRadius: '1rem',
    minWidth: '400px',
  });

export const commentWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'inline-flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    alignItems: 'flex-end',
    gap: '1rem',
  });

export const commentInfoWrapper = (
  isActiveEditInput: boolean,
  isMyComment: boolean,
) =>
  css({
    display: 'inline-flex',
    flexDirection: 'column',
    gap: `${isMyComment ? '0px' : '10px'}`,
  });

export const commentHistoryWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'inline-flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    alignItems: 'center',
    gap: '10px',
  });

export const nameWrapper = css({
  fontStyle: 'italic',
  fontWeight: '500',
});

export const contentWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    fontSize: '1rem',
  });

export const createdAtWrapper = css({
  fontWeight: '300',
  fontSize: '0.8rem',
});

export const editDeletebtnsWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'inline-flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    alignItems: 'center',
    gap: '0.3rem',
  });

export const btnsWrapper = (isAlingLeft: boolean) =>
  css({
    display: 'inline-flex',
    flexDirection: `${isAlingLeft ? 'row' : 'row-reverse'}`,
    alignItems: 'center',
    gap: '1rem',
  });

export const utilityBtnsWrapper = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1rem',
});

export const likeBtnWrapper = css({
  display: 'inline-flex',
  alignItems: 'center',
  alignContent: 'center',
  gap: '0.2rem',

  '& span': {
    paddingTop: '4px',
  },
});

export const likeCountTextWrapper = css({
  paddingTop: '3px',
});

export const replyBtnWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  '& button': {
    paddingTop: '0.25rem',

    '&:hover': {
      cursor: 'pointer',
      fontWeight: '800',
    },
  },
});
