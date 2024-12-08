import { css } from '@emotion/react';

export const bookmarkButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  @media (max-width: 430px) {
    width: 19px;
    height: 19px;
  }
`;

export const icon = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
