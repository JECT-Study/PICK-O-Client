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
  const [internalChoiceValue, setInternalChoiceValue] = useState<string>('');
  const [internalInfoValue, setInternalInfoValue] = useState<string>('');

  const choiceValue = choiceInputProps?.value ?? internalChoiceValue;
  const infoValue = infoInputProps?.value ?? internalInfoValue;

  const isFilled = Boolean(
    String(choiceValue).trim() || String(infoValue).trim(),
  );

  useEffect(() => {
    if (clearInput) {
      setInternalChoiceValue('');
      setInternalInfoValue('');
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
          value={choiceValue}
          onChange={(e) => setInternalChoiceValue(e.target.value)}
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
              value={infoValue}
              onChange={(e) => setInternalInfoValue(e.target.value)}
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
