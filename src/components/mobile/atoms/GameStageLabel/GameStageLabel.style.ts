import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';

export const getStageLabelColor = (labelColor: string) => {
  return css(typo.Mobile.Text.SemiBold_14, {
    color: labelColor === 'main' ? color.MAIN : color.GY[1],
  });
};
