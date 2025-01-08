import { css } from '@emotion/react';
import color from '@/styles/color';

export const pageContainer = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 60px 0 20px 0;
  background-color: ${color.WT}
  overflow: hidden;
  margin-top: 100px;
  justify-content: center;
`;

export const contentWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 904px;
  margin-left: 20px;
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
