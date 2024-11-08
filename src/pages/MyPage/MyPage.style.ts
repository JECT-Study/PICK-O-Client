import { css } from '@emotion/react';
import color from '@/styles/color';

export const pageContainer = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 60px 362px 0 361px;
  background-color: ${color.WT}
  overflow: hidden;
  margin-top: 100px;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  width: calc(100% - 258px);
  padding-left: 20px;
  align-content: center;
`;

export const contentList = css`
  margin-top: 15px;
  background-color: ${color.WT};
  overflow-y: auto;
  position: relative;
`;
export const loader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${color.BK};
  margin-top: 10px;
`;
