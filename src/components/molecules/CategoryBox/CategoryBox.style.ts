import { css } from '@emotion/react';

export const categoryBoxStyling = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  width: '100%',
  '@media (max-width: 430px)': {
    gap: '7px',
  },
});
