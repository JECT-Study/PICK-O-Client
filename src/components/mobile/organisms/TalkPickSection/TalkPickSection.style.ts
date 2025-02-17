import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const talkPickStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '7px',
});

export const talkPickTitle = css(typo.Main.SemiBold, {
  width: '100%',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
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
  width: '335px',
  padding: '20px 14px',
  backgroundColor: color.WT,
  outline: `1px solid ${color.GY[5]}`,
  borderRadius: '10px',
  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.07)',
});

export const talkPickTopStyling = css({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '17px',
  gap: '7px',
});

export const talkPickContentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px 0',
  gap: '17px',
  borderTop: `1px solid ${color.GY[4]}`,
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
