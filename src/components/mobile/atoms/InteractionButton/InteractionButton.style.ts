import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const buttonStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '163px',
  height: '58px',
  borderRadius: '12px',
  border: `1px solid ${color.GY[2]}`,
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
});

export const itemWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '10px',
  gap: '3px',
});

export const buttonLabelStyle = css(typo.Mobile.Text.Medium_12, {
  color: color.MAIN,
  fontSize: '11px',
  fontWeight: '700',
});

export const iconWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '3px',
});

export const iconStyle = css({
  width: '24px',
  height: '24px',
  flexShrink: '0',
});

export const iconLabelStyle = css(typo.Mobile.Text.Medium_12, {
  color: color.GY[1],
  fontWeight: '600',
});
