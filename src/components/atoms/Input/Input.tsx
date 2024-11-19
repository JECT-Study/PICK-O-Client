import { Size } from '@/types/theme';
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from 'react';
import React, { forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Label from '../Label/Label';
import {
  getInputStyling,
  getSizeStyling,
  getVariantStyling,
  inputContainerStyling,
  inputWrapperStyling,
} from './Input.style';

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  size?: Extract<Size, 'medium' | 'small' | 'large'>;
  variant?: 'default';
  isError?: boolean;
  icon?: ReactElement;
  btn?: ReactElement;
  errorMessage?: string;
}

const Input = (
  {
    label,
    size = 'medium',
    variant = 'default',
    isError = false,
    icon,
    btn,
    errorMessage,
    ...attributes
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => (
  <div css={inputContainerStyling}>
    {label && <Label id={attributes.id}>{label}</Label>}
    <div>
      <div
        css={[
          getVariantStyling(variant),
          getSizeStyling(size),
          inputWrapperStyling,
        ]}
      >
        {icon}
        <input
          ref={ref}
          css={[getSizeStyling(size), getInputStyling]}
          {...attributes}
        />
        {btn}
      </div>
      {errorMessage && (
        <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>
      )}
    </div>
  </div>
);

export default forwardRef(Input);
