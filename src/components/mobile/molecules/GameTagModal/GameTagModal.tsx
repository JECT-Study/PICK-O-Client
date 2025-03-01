/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { BalanceGame } from '@/types/game';
import { MobileCheckIcon } from '@/assets';
import { TAG_OPTIONS } from '@/constants/game';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import { validateGameTag } from '@/hooks/game/validateBalanceGameForm';
import { createArrayFromCommaString } from '@/utils/array';
import * as S from './GameTagModal.style';

interface GameTagModalProps {
  form: BalanceGame;
  isOpen?: boolean;
  onClose?: () => void;
  setMainTagValue: (name: string, tag: string) => void;
  setSubTagValue: (name: string, tag: string) => void;
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
  const subTagArray: string[] = createArrayFromCommaString(form.subTag);

  const [errorMessage, setErrorMessage] = useState<string>(
    '서브태그 1개 당 최대 10자까지 입력 가능',
  );

  const handleMainTag = (tag: string) => {
    setMainTagValue('mainTag', tag);
  };

  const handleTagSubmit = () => {
    if (!currentMainTag) return;

    const { isValid } = validateGameTag(form);
    if (!isValid) return;

    submitGame();
    onClose?.();
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
            <span css={S.subTagTextStyling}>(최대 3개)</span>
          </div>
          <div css={S.subTagWrapper}>
            {subTagArray.map((tag, idx) => (
              <div css={S.subTagChipStyling}>
                <span>#{tag}</span>
                <button type="button" css={S.subTagButtonStyling}>
                  ⨉
                </button>
              </div>
            ))}
          </div>
          <div css={S.inputWrapper}>
            <input
              css={S.inputStyling}
              placeholder="ex. 연애, 데이트, 데이트취향"
            />
            {errorMessage && (
              <span css={S.errorMessageStyling}>{errorMessage}</span>
            )}
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
      </div>
    </Modal>
  );
};

export default GameTagModal;
