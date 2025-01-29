import { css } from '@emotion/react';
import color from '@/styles/color';
import type { DividerProps } from './Divider';

export const getDividerStyling = ({
  orientation,
  length,
  tone,
}: Required<DividerProps>) => {
  const style = {
    width: css({
      width: `${length}px`,
      borderBottom:
        tone === 'gy'
          ? `1px solid ${color.GY[2]}`
          : `1px solid ${color.WT_VIOLET}`,
    }),
    height: css({
      height: `${length}px`,
      borderRight:
        tone === 'gy'
          ? `1px solid ${color.GY[2]}`
          : `1px solid ${color.WT_VIOLET}`,
    }),
  };

  return style[orientation];
};
