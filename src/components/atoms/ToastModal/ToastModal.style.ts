import { css } from '@emotion/react';
import color from '@/styles/color';
import typo from '@/styles/typo';
import type { ToastModalProps } from './ToastModal';

export const getToastModalColor = (
  bgColor: Required<ToastModalProps>['bgColor'],
) => {
  const style = {
    black: css({
      backgroundColor: 'rgba(24, 24, 24, 0.7)',
      color: color.WT,
    }),
    white: css({
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      color: color.BK,
    }),
  };

  return style[bgColor];
};

export const toastModalStyling = css(typo.Main.SemiBold, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'max-content',
  height: 'max-content',
  padding: '20px 30px',
  borderRadius: '35px',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.07)',
});
