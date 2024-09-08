import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const searchBarStyling = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '1135px',
  height: '80px',
  padding: '0 22px',
  outline: `1px solid ${color.GY[2]}`,
  borderRadius: '50px',
  boxShadow: '1px 2px 15px rgba(0, 0, 0, 0.05)',
});

export const inputStyling = css(typo.SubTitle, {
  width: '100%',
  color: color.BK,
  outline: 'none',
  padding: '0 35px',
});