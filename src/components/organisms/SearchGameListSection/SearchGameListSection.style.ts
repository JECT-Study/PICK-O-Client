import { css } from '@emotion/react';
import typo from '@/styles/typo';
import color from '@/styles/color';

export const container = css({
  width: '1147px',
  marginTop: '46px',
  marginBottom: '93px',
});

export const titleWrapper = css(typo.Title, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
});

export const contentWrapper = css({
  minHeight: '874px',
});

export const paginationWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px',
  width: '100%',
  height: '40px',
  flexShrink: '0',
});

export const noResultWrapper = css({
  width: '1147px',
  paddingTop: '11px',
  paddingLeft: '6px',
  background: color.WT,
});
