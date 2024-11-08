import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const likeButton = css`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
`;

export const icon = css`
  width: 22px;
  height: 22px;
  object-fit: contain;
`;

export const defaultLabel = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 29px;
  ${typo.Number.Medium_18}
  color: ${color.GY[1]};
  padding: 0;
  margin: 0;
`;

export const pressedLabel = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 29px;
  ${typo.Number.Medium_18}
  color: ${color.MAIN};
  padding: 0;
  margin: 0;
`;
