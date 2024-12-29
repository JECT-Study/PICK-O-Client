import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const containerStyle = css({
  width: '293px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.WT,
});

export const titleStyle = css(typo.Mobile.Main.Medium_16, {
  fontWeight: 600,
  color: color.BK,
  flexGrow: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
