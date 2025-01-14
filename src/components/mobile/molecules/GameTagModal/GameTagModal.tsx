import React, { useState } from 'react';
import { MobileCheckIcon } from '@/assets';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './GameTagModal.style';

interface GameTagModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onTagSubmit: (mainTag: string, subTag: string) => void;
}

const GameTagModal = ({ isOpen, onClose, onTagSubmit }: GameTagModalProps) => {
  const [mainTag, setMainTag] = useState<'커플' | '취향' | '기타' | null>(null);
  const [subTag, setSubTag] = useState<string>('');

  const handleTagSubmit = () => {
    if (mainTag) {
      onTagSubmit(mainTag, subTag);
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
              onClick={() => setMainTag('커플')}
            >
              커플
            </Button>
            <Button
              type="button"
              variant={mainTag === '취향' ? 'Primary2' : 'outlineShadow'}
              onClick={() => setMainTag('취향')}
            >
              취향
            </Button>
            <Button
              type="button"
              variant={mainTag === '기타' ? 'Primary2' : 'outlineShadow'}
              onClick={() => setMainTag('기타')}
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
            css={S.inputStyling}
            placeholder="ex. 너무어려운밸런스게임, 선택장애, 이상형"
            value={subTag}
            onChange={(e) => setSubTag(e.target.value)}
          />
        </div>
        <Button
          size="large"
          variant="roundPrimary"
          onClick={handleTagSubmit}
          disabled={!mainTag}
          css={S.customButtonStyle(!mainTag)}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  );
};

export default GameTagModal;
