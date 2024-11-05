/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { ChoiceMinus, ChoicePlus } from '@/assets';
import Divider from '../Divider/Divider';
import * as S from './ChoiceInputButton.style';

export interface ChoiceInputBoxProps {
  option: 'A' | 'B';
  choiceInputProps?: ComponentPropsWithoutRef<'input'>;
  infoInputProps?: ComponentPropsWithoutRef<'input'>;
  resetInfoInput: boolean;
}

const ChoiceInputButton = ({
  option = 'A',
  choiceInputProps,
  infoInputProps,
  resetInfoInput,
}: ChoiceInputBoxProps) => {
  const [infoInputClicked, setInfoButtonClicked] = useState<boolean>(false);
  const [withText, setWithText] = useState<boolean>(false);

  useEffect(() => {
    if (resetInfoInput) {
      setInfoButtonClicked(false);
      setWithText(false);
    }
  }, [resetInfoInput]);

  useEffect(() => {
    setWithText(
      Boolean(
        String(choiceInputProps?.value).trim() ||
          String(infoInputProps?.value).trim(),
      ),
    );
  }, [choiceInputProps?.value, infoInputProps?.value]);

  return (
    <div css={S.choiceInputContainer(withText, option)}>
      <div css={S.choiceInputWrapper}>
        <input
          type="text"
          placeholder={`${option} 선택지를 입력하세요.`}
          maxLength={30}
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
