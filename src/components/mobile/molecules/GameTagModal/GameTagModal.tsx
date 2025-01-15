import React, { useState } from 'react';
import { BalanceGame } from '@/types/game';
import { MobileCheckIcon } from '@/assets';
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
  const [mainTag, setMainTag] = useState<string>(form.mainTag);

  const handleMainTag = (tag: '커플' | '취향' | '기타') => {
    setMainTagValue('mainTag', tag);
    setMainTag(tag);
  };

  const handleTagSubmit = () => {
    if (mainTag) {
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
            <Button
              type="button"
              variant={mainTag === '커플' ? 'Primary2' : 'outlineShadow'}
              onClick={() => handleMainTag('커플')}
            >
              커플
            </Button>
            <Button
              type="button"
              variant={mainTag === '취향' ? 'Primary2' : 'outlineShadow'}
              onClick={() => handleMainTag('취향')}
            >
              취향
            </Button>
            <Button
              type="button"
              variant={mainTag === '기타' ? 'Primary2' : 'outlineShadow'}
              onClick={() => handleMainTag('기타')}
            >
              기타
            </Button>
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
          disabled={!mainTag}
          active={!!mainTag}
          css={S.customButtonStyle(!mainTag)}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  );
};

export default GameTagModal;
