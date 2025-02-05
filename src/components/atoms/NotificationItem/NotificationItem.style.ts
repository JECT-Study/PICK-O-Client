import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const notificationItemStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 14px',
  backgroundColor: color.WT,
  position: 'relative',
  borderRadius: '5px',
  width: '392px',
  '@media (max-width: 430px)': {
    width: '335px',
    boxShadow: '1px 1px 7px rgba(0, 0, 0, 0.1)',
  },
});

export const NewNotificationStyle = css({
  position: 'absolute',
  top: '12px',
  left: '14px',
});

export const textContainerStyle = css({
  marginLeft: '11px',
});

export const headerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const categoryStyle = css({
  ...typo.Main.SemiBold,
  color: color.MAIN,
  '@media (max-width: 430px)': {
    ...typo.Comment.SemiBold,
  },
});

export const dateStyle = css({
  ...typo.Number.Regular,
  color: color.GY[1],
  paddingLeft: '9px',
  '@media (max-width: 430px)': {
    ...typo.Comment.SemiBold,
  },
});

export const titleStyle = css({
  ...typo.Main.SemiBold,
  color: color.BK,
  marginTop: '2px',
  marginBottom: '1px',
  textAlign: 'start',
  '@media (max-width: 430px)': {
    ...typo.Comment.SemiBold,
  },
});

export const contentStyle = css({
  ...typo.Main.Medium,
  color: color.GY[1],
  textAlign: 'start',
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.SemiBold_14,
  },
});
