import React from 'react';
import Button from '@/components/mobile/atoms/Button/Button';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import * as S from './TextModal.style';

export interface TextModalProps {
  text: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const TextModal = ({ text, isOpen, onConfirm, onClose }: TextModalProps) => {
  return (
    <Modal
      action="text"
      isOpen={isOpen}
      onClose={onClose}
      hasCloseButton={false}
    >
      <div css={S.textModalStyling}>
        <div css={S.textStyling}>{text}</div>
        <div css={S.buttonWrapper}>
          <Button
            variant="primary"
            css={S.buttonStyling}
            active={false}
            onClick={onConfirm}
          >
            확인
          </Button>
          <Button variant="primary" css={S.buttonStyling} onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TextModal;
