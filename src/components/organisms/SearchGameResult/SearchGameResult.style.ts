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
