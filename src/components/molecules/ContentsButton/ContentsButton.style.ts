import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { ContentsButtonProps } from './ContentsButton';

type SizeType = Required<ContentsButtonProps>['size'];

const sizeStyles = {
  large: {
    width: '563px',
    height: '357px',
    infoHeight: '107px',
    labelMaxWidth: '440px',
    imageHeight: '250px',
  },
  medium: {
    width: '432px',
    height: '354px',
    infoHeight: '104px',
    labelMaxWidth: '330px',
    imageHeight: '250px',
  },
  small: {
    width: '369px',
    height: '278px',
    infoHeight: '95px',
    labelMaxWidth: '315px',
    imageHeight: '183px',
  },
};

export const cardWrapper = (size: SizeType) => css`
  width: ${sizeStyles[size].width};
  height: ${sizeStyles[size].height};
  border-radius: 20px;
  border: 1px solid ${color.GY[2]};
  background-color: ${color.WT};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;

  &:active {
    background-color: ${color.WT};
    box-shadow: 0 5px 15px 0 rgba(119, 130, 255, 0.7);
    & > div > div > img {
      transform: scale(0.98);
    }
  }

  &:hover {
    border: 1px solid ${color.MAIN};
    & > div > div > img {
      transform: scale(1.05);
    }
  }
`;

export const imageContainer = (size: SizeType) => css`
  display: flex;
  width: 100%;
  height: ${sizeStyles[size].imageHeight};
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const imageWrapper = css`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const image = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.2s ease-in-out;
`;

export const chipsContainer = css`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
`;

export const infoContainer = (size: SizeType) => css`
  width: 100%;
  height: ${sizeStyles[size].infoHeight};
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const label = (size: SizeType, highlighted?: boolean) => css`
  ${typo.Component.Medium};
  color: ${highlighted ? color.MAIN : color.BK};
  max-width: ${sizeStyles[size].labelMaxWidth};
`;

export const bookmarkWrapper = css`
  margin-left: auto;
`;
