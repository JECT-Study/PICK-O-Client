import React from 'react';
import Button from '@/components/mobile/atoms/Button/Button';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import * as S from './ShareModal.style';

export interface ShareModalProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

const ShareModal = ({ isOpen, onConfirm, onClose }: ShareModalProps) => {
  return (
    <Modal action="share" isOpen={isOpen} onClose={onClose}>
      <div css={S.shareModalStyling}>
        <div css={S.textStyling}>
          카카오톡으로 <span css={S.shareTextStyling}>공유</span>하시겠습니까?
        </div>
        <Button size="large" variant="roundPrimary" onClick={onConfirm}>
          공유하기
        </Button>
      </div>
    </Modal>
  );
};

export default ShareModal;
