import { css } from '@emotion/react';

export const containerStyle = css({
  padding: '18px 20px',
});

export const notificationContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  overflowY: 'auto',
});

export const buttonStyle = css({
  border: 'none',
  background: 'transparent',
  width: '335px',
  cursor: 'pointer',
});
