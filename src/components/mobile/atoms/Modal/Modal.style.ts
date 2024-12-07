import { css } from '@emotion/react';
import color from '@/styles/color';
import type { ModalProps } from './Modal';

export const modalStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '335px',
  backgroundColor: color.WT,
  borderRadius: '12px',
  boxShadow: '1px 2px 30px rgba(0, 0, 0, 0.15)',
});

export const getModalSize = (action: Required<ModalProps>['action']) => {
  const style = {
    share: css({
      paddingTop: '24px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '26px',
    }),
    tag: css({
      paddingTop: '24px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '30px',
    }),
    tempGame: css({
      paddingTop: '24px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '24px',
    }),
  };

  return style[action as keyof typeof style];
};

export const modalCloseStyling = css({
  position: 'absolute',
  top: '24px',
  right: '20px',
  cursor: 'pointer',
});
