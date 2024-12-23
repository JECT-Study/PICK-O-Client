/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, ReactNode } from 'react';
import { MobileModalClose } from '@/assets';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import * as S from './Modal.style';

export interface ModalProps {
  action?: 'share' | 'tag' | 'tempGame';
  isOpen?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  action = 'share',
  hasCloseButton = true,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => onClose?.());

  return (
    <div>
      {isOpen && (
        <div ref={modalRef} css={[S.modalStyling, S.getModalSize(action)]}>
          {hasCloseButton && (
            <MobileModalClose css={S.modalCloseStyling} onClick={onClose} />
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
