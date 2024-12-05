import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const fieldWrapStyle = css({
  padding: '27px 0 22px 19px',
  border: `1px solid ${color.GY[2]}`,
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '1174px',
});

export const titleStyle = css(typo.SubTitle, {
  color: color.MAIN,
  marginRight: '28px',
});

export const descriptionStyle = css(typo.SubTitle, {
  color: color.MAIN,
  marginRight: '30px',
});

export const titleDesStyle = css(typo.Comment.SemiBold, {
  color: color.MAIN,
});

export const titleWrapStyle = css({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '11px',
  alignItems: 'center',
});

export const descriptionWrapStyle = css({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '24px',
  alignItems: 'center',
});

export const textStyle = css(typo.SubTitle, {
  color: color.BK,
  '::placeholder': {
    color: color.GY[1],
  },
  width: '1024px',
});
