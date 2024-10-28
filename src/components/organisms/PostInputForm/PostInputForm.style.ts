import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const formStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '18px',
  width: '1173px',
});

export const bodyStyle = css({
  width: '1173px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '28px',
  padding: '26px 46.5px 42px 46.5px',
  backgroundColor: color.WT,
  border: `1px solid ${color.GY[2]}`,
  borderRadius: '20px',
});

export const optionStyle = css({
  display: 'flex',
  columnGap: '17px',
});

export const inputStyle = css(typo.Main.Medium, {
  width: '982px',
  height: '432px',
  border: 'none',
  resize: 'none',
  outline: 'none',
  color: color.BK,
  '::placeholder': {
    color: color.GY[1],
  },
});

export const otherStyle = css({
  width: '1173px',
  display: 'flex',
  justifyContent: 'space-between',
});

export const buttonStyle = css({
  marginTop: '53px',
  display: 'flex',
  alignItems: 'center',
  columnGap: '30px',
});

export const toastModalStyling = css({
  position: 'fixed',
  top: '110px',
  left: '50%',
  transform: 'translate(-50%)',
  zIndex: '1000',
});
