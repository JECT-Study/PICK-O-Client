import { css } from '@emotion/react';
import color from '@/styles/color';

export const commentsSectionContainer = css`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 100px;
  margin: 0 auto;
  background-color: ${color.WT};
  overflow-y: auto;
  gap: 23px;
`;

export const commentTopWrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

export const loggedInBackground = css`
  width: 100%;
  height: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 29px;
  position: relative;
`;

export const loggedOutBackground = css`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(11px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 29px;
`;

export const commentsWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  height: auto;
`;

export const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 17px;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
`;

export const toastModalWrapper = css`
  position: absolute;
  top: 76px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;
