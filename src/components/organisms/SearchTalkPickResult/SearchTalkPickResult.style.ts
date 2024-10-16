import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const container = css({
  width: '1147px',
  marginTop: '28px',
  marginBottom: '60px',
});

export const titleWrapper = css(typo.Title, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '23px',
});

export const contentWrapper = css({
  border: `1px solid ${color.GY[2]}`,
  width: '1145px',
  height: '224px',
  borderRadius: '10px',
  paddingTop: '49px',
  paddingLeft: '34px',
  background: color.WT,
});
