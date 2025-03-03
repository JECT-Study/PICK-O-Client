/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { BalanceGame } from '@/types/game';
import { MobileCheckIcon } from '@/assets';
import { TAG_OPTIONS } from '@/constants/game';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
import Divider from '@/components/atoms/Divider/Divider';
import { validateGameTag } from '@/hooks/game/validateBalanceGameForm';
import { createArrayFromCommaString } from '@/utils/array';
import useOutsideClick from '@/hooks/common/useOutsideClick';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const currentMainTag: string = form.mainTag;
  const [subTagArray] = useState(() => createArrayFromCommaString(form.subTag));
  const [currentSubTag, setCurrentSubTag] = useState<string[]>(subTagArray);

  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    const subTagList = inputValue
      ? [...currentSubTag, inputValue]
      : currentSubTag;
    setSubTagValue('subTag', subTagList.join(','));
  }, [currentSubTag, setCurrentSubTag, inputValue, setSubTagValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 10) return;

    setInputValue(value);
    setInputError(false);
  };

  const handleSpaceAction = () => {
    if (!inputValue.trim()) return;

    setCurrentSubTag((prev) => [...prev, inputValue.trim()]);
    setInputValue('');
    setInputError(false);
  };
  useOutsideClick(inputRef, handleSpaceAction);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue) {
      setInputError(false);
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      handleSpaceAction();
    }

    setInputError(inputValue.length >= 10);
  };

  const handleMainTag = (tag: string) => {
    setMainTagValue('mainTag', tag);
  };

  const handleDeleteSubTag = (idx: number) => {
    setCurrentSubTag((prev) => prev.filter((_, i) => i !== idx));
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
        <div css={S.tagBottomWrapper}>
          <div css={S.textBox}>
            <span css={S.tagTextStyling}>서브태그</span>
            <span css={S.subTagTextStyling}>(최대 3개)</span>
          </div>
          <div css={S.subTagWrapper(currentSubTag.length === 3)}>
            {currentSubTag.map((tag, idx) => (
              <div css={S.subTagChipStyling}>
                <span>#{tag}</span>
                <button
                  type="button"
                  css={S.subTagButtonStyling}
                  onClick={() => handleDeleteSubTag(idx)}
                >
                  ⨉
                </button>
              </div>
            ))}
          </div>
          {currentSubTag.length !== 3 && (
            <div css={S.inputWrapper}>
              <input
                type="text"
                ref={inputRef}
                css={S.inputStyling}
                value={inputValue}
                placeholder="ex. 연애, 데이트, 데이트취향"
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
              />
              {inputError && (
                <span css={S.errorMessageStyling}>
                  서브태그 1개 당 최대 10자까지 입력 가능
                </span>
              )}
            </div>
          )}
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
