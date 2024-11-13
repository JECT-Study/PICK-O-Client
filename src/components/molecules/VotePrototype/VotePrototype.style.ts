import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const votePrototypeStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  position: 'relative',
  overflow: 'visible',
});

export const buttonContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
});

export const voteTextStyle = css(typo.Component.Bold, {
  color: color.GY[1],
  padding: '22px 42px',
});

export const getButtonStyle = (
  side: 'A' | 'B',
  selectedButton: 'A' | 'B' | null,
) =>
  css({
    ...(selectedButton === side && {
      backgroundColor: side === 'A' ? color.RED : color.BLUE,
      color: color.WT,
      outline: 'none',
    }),
  });

export const loggedOutContainerStyling = css({
  display: 'flex',
  position: 'absolute',
  top: '90px',
  left: '-100px',
  width: '1215px',
  height: '260px',
  backdropFilter: 'blur(11px)',
  backgroundColor: 'rgba(255, 255, 255, 0.01)',
  zIndex: 1,
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
