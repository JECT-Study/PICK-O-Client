import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const contentWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const textBox = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
});

export const dividerWrapper = css({
  marginTop: '33px',
  marginBottom: '30px',
});

export const titleLabel = css(typo.SubTitle_700, {
  display: 'inline-flex',
  color: color.BK,
});

export const subLabel = css(typo.Main.SemiBold_16, {
  display: 'inline-flex',
  color: color.MAIN,
  width: '458px',
  height: '29px',
});

export const tagWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '40px',
  marginBottom: '46px',
  gap: '20px',
});

export const subTagWrapper = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '40px',
  marginBottom: '38px',
  gap: '12px',
});

export const buttonWrapper = css({
  display: 'flex',
  gap: '10px',
});

export const customButtonStyle = (isDisabled: boolean) =>
  css({
    width: '536px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  });

export const customDisabledBtnStyle = css({
  color: color.WT,
  backgroundColor: color.GY[2],
  outline: '1px solid transparent',
  pointerEvents: 'none',
  ':hover': {
    backgroundColor: color.GY[2],
  },
});
