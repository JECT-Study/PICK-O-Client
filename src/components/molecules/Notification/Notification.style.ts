import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const iconContainerStyle = css({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
});

export const buttonStyle = css({
  cursor: 'pointer',
});

export const notificationContainerStyle = css({});

export const notificationStyle = css({
  position: 'absolute',
  top: '20px',
  zIndex: '1000',
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: color.GY[3],
  border: `1px solid ${color.GY[2]}`,
  width: '435px',
  height: '602px',
  borderRadius: '10px',
  padding: '30px 20px 18px 23px',
});

export const titleStyle = css(typo.SubTitle, {
  color: color.BK,
});

export const notificationContentStyle = css({
  flex: 1,
  overflowY: 'auto',
  marginTop: '18px',
});

export const notificationItemStyle = css({
  '&:not(:last-child)': {
    padding: '0 20px 10px 0',
  },
});
