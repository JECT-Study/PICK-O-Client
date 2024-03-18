import { css } from '@emotion/react';

export const CreatorSectionWrapper = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1.3rem',
  padding: '1rem 2rem',
});

export const creatorInfoWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const creatorNameWrapper = css({
  fontStyle: 'italic',
  fontFamily: 'SpoqaHanSansNeo-medium',
  fontWeight: '500',
  fontSize: '1rem',
});

export const CreatedDateWrapper = css({
  fontFamily: 'SpoqaHanSansNeo-thin',
  fontSize: '1rem',
});
