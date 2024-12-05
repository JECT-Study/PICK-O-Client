import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const infoContainer = css`
  display: flex;
  width: 904px;
  height: 61px;
  padding: 15px 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1.5px solid ${color.GY[2]};
  border-radius: 15px;
  background-color: ${color.WT};
  box-sizing: border-box;

  &:focus-visible {
    outline: 1px solid ${color.BK};
    outline-offset: 1px;
  }
`;

export const textContainer = css`
  display: flex;
  width: 546px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: -2px;
  align-self: stretch;
  margin-right: auto;
`;

export const titleLabel = css`
  width: 100%;
  ${typo.Main.Medium_16};
  color: ${color.BK};
  margin: 0;
  text-align: left;
`;

export const bookmarkWrapper = css`
  margin-left: auto;
`;
