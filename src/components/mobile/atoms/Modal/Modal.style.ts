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
    text: css({
      padding: '36px 21px 26px',
    }),
    share: css({
      padding: '24px 20px 26px',
    }),
    tag: css({
      padding: '24px 20px 30px',
    }),
    tempGame: css({
      padding: '24px 20px',
    }),
  };

  return style[action];
};

export const modalCloseStyling = css({
  position: 'absolute',
  top: '24px',
  right: '20px',
  cursor: 'pointer',
});
