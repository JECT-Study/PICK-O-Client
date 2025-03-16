import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const reportModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

export const titleContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
});

export const titleStyle = css(typo.Main.SemiBold, {});

export const getButtonContainer = (inputVisible: boolean) =>
  css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '7px',
    margin: `18px 0 ${inputVisible ? '14px' : '22px'} 0`,
  });

export const reasonButton = css(typo.Mobile.Text.SemiBold_14, {
  padding: '14px 16px',
  display: 'flex',
  justifyContent: 'flex-start',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: color.GY[5],
  cursor: 'pointer',
  color: color.GY[6],
  ':hover': {
    backgroundColor: color.WT_VIOLET,
    border: `1.6px solid ${color.MAIN}`,
    color: color.MAIN,
  },
});

export const reportInputStyling = css(typo.Mobile.Text.SemiBold_14, {
  width: '100%',
  paddingBottom: '6px',
  borderBottom: `1px solid ${color.GY[4]}`,
  marginBottom: '20px',
  color: color.BK,
  '::placeholder': {
    color: color.GY[6],
  },
});

export const submitButton = css(typo.Comment.SemiBold, {
  width: '100%',
  padding: '9px 118.5px',
  border: 'none',
  borderRadius: '12px',
  backgroundColor: color.MAIN,
  color: color.WT,
  cursor: 'pointer',
  ':disabled': {
    backgroundColor: color.GY[4],
  },
});
