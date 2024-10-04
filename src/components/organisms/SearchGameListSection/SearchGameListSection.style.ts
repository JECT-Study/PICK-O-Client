import { css } from '@emotion/react';
import typo from '@/styles/typo';

export const container = css`
  width: 1147px;
`;

export const titleWrapper = css`
  ${typo.Title};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
`;
