/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
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
  const [subTagArray] = useState(() => createArrayFromCommaString(form.subTag)); // 초기 값 서브태그 배열 (빈 배열 가능, 값 안변함)
  const [currentSubTag, setCurrentSubTag] = useState<string[]>(subTagArray);
  // 서브 태그 블록이 보여지는 배열은 currentSubTag
  // subTagArray는 첫 form의 초기값에 대한 서브 태그만 저장
  // 인풋에 값 입력 후 스페이스를 누르면 setCurrentSubTag로 currentSubTag에 서브태그 값 추가
  // 만약 인풋에 값 입력된 상태에서 스페이스를 누르지 않았어도 서브태그에는 포함되어야하지만 currentSubTag에는 추가되면 안됨
  // 인풋이 존재 -> currentSubTag + inputValue (배열로 들어가야함)
  // 인풋이 존재x (이미 스페이스를 눌렀음) -> currentSubTag 만으로 처리 가능
  // 인풋 컴포넌트는 currentSubTag.length로 제시 처리 가능

  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    const subTagList = inputValue
      ? [...currentSubTag, inputValue]
      : currentSubTag;
    setSubTagValue('subTag', subTagList.join(','));
  }, [currentSubTag, setSubTagValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSpaceAction = () => {
    if (!inputValue.trim()) return;

    setCurrentSubTag((prev) => [...prev, inputValue]);
    setInputValue('');
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Space') {
      e.preventDefault();
      handleSpaceAction();
    }
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
          <div css={S.subTagWrapper}>
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
