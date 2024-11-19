/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, ReactNode } from 'react';
import { ModalClose } from '@/assets';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import { getModalSize, modalCloseStyling, modalStyling } from './Modal.style';

export interface ModalProps {
  action?: 'default' | 'share' | 'report' | 'profile' | 'tag';
  isOpen?: boolean;
  onClose?: () => void;
  hasCloseButton?: boolean;
  children?: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  action = 'default',
  hasCloseButton = true,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => onClose?.());

  return (
    <div>
      {isOpen && (
        <div ref={modalRef} css={[modalStyling, getModalSize(action)]}>
          {hasCloseButton && (
            <ModalClose css={modalCloseStyling} onClick={onClose} />
          )}
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
