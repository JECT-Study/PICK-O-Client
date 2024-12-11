import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const searchTalkPickItemStyle = css({
  all: 'unset',
  display: 'flex',
  flexDirection: 'row',
  width: '1065px',
  height: '100px',
  cursor: 'pointer',
});

export const leftContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '861px',
  height: '78px',
  margin: '11px 104px 11px 0',
});

export const titleWrapStyle = css({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '4px',
  alignItems: 'center',
});

export const titleStyle = (highlighted: boolean) =>
  css(typo.Main.Medium, {
    color: highlighted ? color.MAIN : color.BK,
  });

export const dateStyle = css(typo.Number.Regular, {
  color: color.GY[1],
  marginLeft: '9px',
});

export const contentWrapStyle = css({
  display: 'flex',
});
export const contentStyle = (highlighted: boolean) =>
  css(typo.Comment.Regular, {
    overflowY: 'hidden',
    height: '45px',
    color: highlighted ? color.MAIN : color.GY[1],
  });

export const imageContainerStyle = css({
  width: '100px',
  height: '100px',
  borderRadius: '10px',
});
