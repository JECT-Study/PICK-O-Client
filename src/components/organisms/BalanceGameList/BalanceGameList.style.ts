import { css } from '@emotion/react';
import typo from '@/styles/typo';

export const containerStyle = css({
  width: '1158px',
  '@media (max-width: 430px)': {
    width: '100%',
  },
});

export const titleWrapStyle = css({
  ...typo.Title,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  '@media (max-width: 430px)': {
    ...typo.Mobile.Text.Bold_16,
    marginBottom: 0,
  },
});

export const barStyle = css({
  margin: '48px 0',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width: 430px)': {
    margin: '18px 0',
  },
});

export const contentStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  '@media (max-width: 430px)': {
    gap: '9px',
  },
});

export const loadMoreWrapperStyle = css({
  gridColumn: '1 / -1',
  display: 'flex',
  justifyContent: 'center',
  padding: '62px 0 95px 0',
  '@media (max-width: 430px)': {
    padding: '16px 0',
  },
});
