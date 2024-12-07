import React from 'react';
import { MobileTempIcon } from '@/assets';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import TempGameButton from '@/components/mobile/atoms/TempGameButton/TempGameButton';
import * as S from './TempGameModal.style';

export interface TempGameModalProps {
  isOpen?: boolean;
  onSaveGame?: () => void;
  onGetGame?: () => void;
  onClose?: () => void;
}

const TempGameModal = ({
  isOpen,
  onSaveGame,
  onGetGame,
  onClose,
}: TempGameModalProps) => {
  return (
    <Modal action="tempGame" isOpen={isOpen} onClose={onClose}>
      <div css={S.tempGameModalStyling}>
        <MobileTempIcon />
        <div css={S.textStyling}>임시 저장</div>
        <div css={S.buttonWrapper}>
          <TempGameButton action="save" onClick={onSaveGame} />
          <TempGameButton action="get" onClick={onGetGame} />
        </div>
      </div>
    </Modal>
  );
};

export default TempGameModal;
