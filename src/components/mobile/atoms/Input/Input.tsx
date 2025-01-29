import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import * as S from './Input.style';

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  isError?: boolean;
  btn?: ReactElement;
  errorMessage?: string;
  success?: boolean;
}

const Input = (
  {
    isError = false,
    btn,
    errorMessage,
    success = false,
    ...attributes
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <div css={S.inputContainerStyling}>
    <div css={S.inputWrapperStyling(success)}>
      <input ref={ref} css={S.inputStyling} {...attributes} />
      {btn}
    </div>
    {errorMessage && (
      <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>
    )}
  </div>
);

export default forwardRef(Input);
