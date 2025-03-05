import { css } from '@emotion/react';
import { VoteOption, MyVoteOption } from '@/types/vote';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const voteToggleStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const buttonContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '306px',
});

export const voteTextStyle = css(typo.Mobile.Text.Medium_16, {
  color: color.GY[1],
});

export const getButtonStyle = (
  side: VoteOption,
  selectedButton: MyVoteOption,
) =>
  css({
    ...(selectedButton === side && {
      backgroundColor: side === 'A' ? color.RED : color.BLUE,
      color: color.WT,
      border: 'none',
    }),
  });

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
