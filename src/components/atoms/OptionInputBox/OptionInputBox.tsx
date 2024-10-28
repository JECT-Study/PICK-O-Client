import React, { forwardRef, useState } from 'react';
import type { ForwardedRef } from 'react';
import { OptionError } from '@/assets';
import { ERROR } from '@/constants/message';
import { isEmptyString, isLongerThan } from '@/utils/validator';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import * as S from './OptionInputBox.style';

interface OptionInputProps {
  option?: 'A' | 'B';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionInputBox = (
  { option = 'A', value, onChange }: OptionInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [hasText, setHasText] = useState(value.trim() !== '');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    setHasText(!isEmptyString(inputText));
    setHasError(isLongerThan(inputText, 10));
    onChange(e);
  };

  return (
    <div css={S.optionInputStyling}>
      <div
        css={[
          S.contentWrapStyling,
          S.getOutlineStyling(isFocused, hasText, option),
          hasError && S.getErrorStyling,
        ]}
      >
        <div css={S.optionStyling(option)}>{option === 'A' ? 'A' : 'B'}</div>
        <input
          css={S.textStyling}
          type="text"
          placeholder="항목을 입력하세요."
          ref={ref}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
        />
        {hasError && <OptionError />}
      </div>
      {hasError && (
        <ErrorMessage isError={hasError}>
          {ERROR.CREATE.OPTION_FORM}
        </ErrorMessage>
      )}
    </div>
  );
};

export default forwardRef(OptionInputBox);
