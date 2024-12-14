import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const reportModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const reportTextStyling = css(typo.SubTitle, {
  color: color.BK,
});

export const checkBoxWrapperStyling = css({
  display: 'flex',
  flexDirection: 'column',
  margin: '45px 0',
  gap: '20px',
});

export const reportBtnWrapperStyling = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const confirmBtnStyling = css({
  width: '108px',
});

export const closeBtnStyling = css({
  width: '108px',
  backgroundColor: color.GY[2],
  color: color.GY[1],
});

export const reportTextAreaStyling = css(typo.Comment.Regular, {
  width: '100%',
  height: '118px',
  padding: '17px 23px',
  borderRadius: '5px',
  border: `1px solid ${color.GY[2]}`,
  backgroundColor: color.WT,
  boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
  color: '#555555',
  resize: 'none',
});
