import React, { useState } from 'react';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './TagModal.style';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTagSubmit: (mainTag: string, subTag: string) => void;
}

const TagModal = ({ isOpen, onClose, onTagSubmit }: TagModalProps) => {
  const [mainTag, setMainTag] = useState<string | null>(null);
  const [subTag, setSubTag] = useState('');

  const handleTagSubmit = () => {
    if (mainTag) {
      onTagSubmit(mainTag, subTag);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} action="tag">
      <div css={S.contentWrapper}>
        <div css={S.titleLabel}>밸런스게임 태그를 선택해주세요!</div>
        <div css={S.dividerWrapper}>
          <Divider orientation="width" length={616} />
        </div>

        <div css={S.tagWrapper}>
          <div css={S.textBox}>
            <span css={S.titleLabel}>메인태그</span>
            <span css={S.subLabel}>필수</span>
          </div>
          <div css={S.buttonWrapper}>
            <Button
              size="large"
              variant={
                mainTag === '커플' ? 'roundPrimary2' : 'outlineSecondary'
              }
              onClick={() => setMainTag('커플')}
            >
              커플
            </Button>
            <Button
              size="large"
              variant={
                mainTag === '취향' ? 'roundPrimary2' : 'outlineSecondary'
              }
              onClick={() => setMainTag('취향')}
            >
              취향
            </Button>
            <Button
              size="large"
              variant={
                mainTag === '기타' ? 'roundPrimary2' : 'outlineSecondary'
              }
              onClick={() => setMainTag('기타')}
            >
              기타
            </Button>
            <Button
              size="large"
              variant="outlineSecondary"
              css={S.customDisabledBtnStyle}
              disabled
            >
              월드컵
            </Button>
          </div>
        </div>
        <div css={S.subTagWrapper}>
          <div css={S.textBox}>
            <span css={S.titleLabel}>서브태그</span>
            <span css={S.subLabel}>나만의 태그를 만들어 볼까요?</span>
          </div>
          <Input
            placeholder="ex) 아이돌, 연애..."
            size="large"
            variant="default"
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

export default TagModal;
