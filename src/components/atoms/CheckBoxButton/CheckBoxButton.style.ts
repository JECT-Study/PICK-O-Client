import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const checkBoxBtnStyling = css({
  display: 'flex',
  alignItems: 'center',
  width: '395px',
  height: '42px',
  padding: '0 13px',
  borderRadius: '10px',
  backgroundColor: color.WT,
  boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
});

export const radioLabelStyling = css({
  display: 'flex',
  alignItems: 'center',
});

export const checkBoxRadioStyling = css({
  display: 'flex',
  width: '19px',
  height: '19px',
  appearance: 'none',
  borderRadius: '50%',
  border: `1px solid ${color.MAIN}`,
  cursor: 'pointer',

  '&: checked': {
    backgroundColor: '#E3F0FF',
    border: '1px solid #E3F0FF',
    boxShadow: 'inset -1px 2px 5px rgba(0, 0, 0, 0.3)',

    '&::after': {
      content: '""',
      display: 'block',
      width: '7px',
      height: '7px',
      margin: 'auto',
      backgroundColor: color.MAIN,
      outline: `2px solid ${color.MAIN}`,
      border: '1px solid #E3F0FF',
      borderRadius: '50%',
    },
  },
});

export const checkBoxTextStyling = css(typo.Main.Medium, {
  marginLeft: '14px',
  color: '#555555',
  cursor: 'pointer',
});
