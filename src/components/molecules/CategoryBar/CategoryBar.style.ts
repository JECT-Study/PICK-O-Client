import { css } from '@emotion/react';

export const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 0',
  '@media (max-width: 430px)': {
    padding: 0,
  },
});
