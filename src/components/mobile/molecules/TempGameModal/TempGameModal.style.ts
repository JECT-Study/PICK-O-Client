import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const tempGameModalStyling = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

export const textStyling = css(typo.Main.SemiBold, {
  color: color.BK,
});

export const buttonWrapper = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '11px',
  marginTop: '5px',
});
