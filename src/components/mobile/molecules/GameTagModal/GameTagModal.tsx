import React from 'react';
import { BalanceGame } from '@/types/game';
import { MobileCheckIcon } from '@/assets';
import { TAG_OPTIONS } from '@/constants/game';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './GameTagModal.style';

interface GameTagModalProps {
  form: BalanceGame;
  isOpen?: boolean;
  onClose?: () => void;
  setMainTagValue: (name: string, tag: string) => void;
  setSubTagValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitGame: () => void;
}

const GameTagModal = ({
  form,
  isOpen,
  onClose,
  setMainTagValue,
  setSubTagValue,
  submitGame,
}: GameTagModalProps) => {
  const currentMainTag: string = form.mainTag;

  const handleMainTag = (tag: string) => {
    setMainTagValue('mainTag', tag);
  };

  const handleTagSubmit = () => {
    if (currentMainTag) {
      submitGame();
      onClose?.();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} action="tag">
      <div css={S.contentWrapper}>
        <MobileCheckIcon />
        <div css={S.textStyling}>밸런스게임 태그를 선택해주세요!</div>
        <Divider orientation="width" length={50} />
        <div css={S.tagWrapper}>
          <div css={S.textBox}>
            <span css={S.tagTextStyling}>메인태그</span>
            <span css={S.markStyling}>*</span>
          </div>
          <div css={S.buttonWrapper}>
            {TAG_OPTIONS.map((tag) => (
              <Button
                key={tag}
                type="button"
                variant={currentMainTag === tag ? 'primary' : 'outlineShadow'}
                css={S.buttonStyling}
                onClick={() => handleMainTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <div css={S.tagWrapper}>
          <div css={S.textBox}>
            <span css={S.tagTextStyling}>서브태그</span>
          </div>
          <input
            name="subTag"
            css={S.inputStyling}
            placeholder="ex. 너무어려운밸런스게임, 선택장애, 이상형"
            maxLength={10}
            value={form.subTag}
            onChange={setSubTagValue}
          />
        </div>
        <Button
          size="large"
          variant="roundPrimary"
          onClick={handleTagSubmit}
          disabled={!currentMainTag}
          active={!!currentMainTag}
          css={S.customButtonStyle(!currentMainTag)}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  );
};

export default GameTagModal;
