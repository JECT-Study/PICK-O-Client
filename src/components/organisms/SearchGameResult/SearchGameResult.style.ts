import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const container = css({
  width: '1147px',
});

export const titleWrapper = css(typo.Title, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const contentWRapper = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40px',
  marginBottom: '105px',
});

export const noResultsWrapper = css({
  border: `1px solid ${color.GY[2]}`,
  width: '1147px',
  height: '224px',
  borderRadius: '10px',
  paddingTop: '49px',
  paddingLeft: '34px',
  background: color.WT,
  marginTop: '23px',
  marginBottom: '79px',
});
