import { css } from '@emotion/react';
import color from '@/styles/color';
import type { ModalProps } from './Modal';

export const modalStyling = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '598px',
  backgroundColor: color.GY[3],
  borderRadius: '10px',
  boxShadow: '1px 2px 30px rgba(0, 0, 0, 0.15)',
});

export const getModalSize = (action: Required<ModalProps>['action']) => {
  const style = {
    default: css({
      padding: '30px',
    }),
    share: css({
      paddingTop: '34px',
      paddingLeft: '30px',
      paddingRight: '30px',
      paddingBottom: '12px',
    }),
    report: css({
      width: '495px',
      paddingTop: '39px',
      paddingLeft: '33px',
      paddingRight: '33px',
      paddingBottom: '41px',
    }),
    profile: css({
      width: '516px',
      padding: '38px 35px',
    }),
    tag: css({
      width: '616px',
      height: '486px',
    }),
  };

  return style[action as keyof typeof style];
};

export const modalCloseStyling = css({
  position: 'absolute',
  top: '34px',
  right: '30px',
  cursor: 'pointer',
});
