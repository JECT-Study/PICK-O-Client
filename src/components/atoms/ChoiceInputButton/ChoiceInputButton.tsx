/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { ChoiceMinus, ChoicePlus } from '@/assets';
import Divider from '../Divider/Divider';
import * as S from './ChoiceInputButton.style';

export interface ChoiceInputBoxProps {
  option: 'A' | 'B';
  choiceInputProps?: ComponentPropsWithoutRef<'input'>;
  infoInputProps?: ComponentPropsWithoutRef<'input'>;
  clearInput?: boolean;
}

const ChoiceInputButton = ({
  option = 'A',
  choiceInputProps,
  infoInputProps,
  clearInput,
}: ChoiceInputBoxProps) => {
  const [infoInputClicked, setInfoButtonClicked] = useState<boolean>(false);
  const [choiceInputValue, setChoiceInputValue] = useState<string>('');
  const [infoInputValue, setInfoInputValue] = useState<string>('');

  const isFilled = Boolean(
    (choiceInputProps?.value && String(choiceInputProps.value).trim()) ||
      (infoInputProps?.value && String(infoInputProps.value).trim()),
  );

  useEffect(() => {
    if (clearInput) {
      setChoiceInputValue('');
      setInfoInputValue('');
      setInfoButtonClicked(false);
    }
  }, [clearInput]);

  return (
    <div css={S.choiceInputContainer(isFilled, option)}>
      <div css={S.choiceInputWrapper}>
        <input
          type="text"
          placeholder={`${option} 선택지를 입력하세요.`}
          maxLength={30}
          value={choiceInputValue}
          onChange={(e) => setChoiceInputValue(e.target.value)}
          css={S.choiceInputStyling}
          {...choiceInputProps}
        />
        {!infoInputClicked && (
          <button type="button" onClick={() => setInfoButtonClicked(true)}>
            <ChoicePlus />
          </button>
        )}
      </div>
      {infoInputClicked && (
        <>
          <Divider orientation="width" length={534} />
          <div css={S.choiceInputWrapper}>
            <input
              type="text"
              placeholder="해당 선택지에 대해 추가로 설명을 입력할 수 있어요!"
              maxLength={50}
              value={infoInputValue}
              onChange={(e) => setInfoInputValue(e.target.value)}
              css={S.choiceInputStyling}
              {...infoInputProps}
            />
            <button
              type="button"
              onClick={() => {
                setInfoButtonClicked(false);
              }}
            >
              <ChoiceMinus />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChoiceInputButton;
