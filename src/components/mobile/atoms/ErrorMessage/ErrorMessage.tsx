import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { getTextStyling } from './ErrorMessage.style';

export interface ErrorMessageProps extends ComponentPropsWithoutRef<'span'> {
  isError?: boolean;
}

const ErrorMessage = ({
  isError = false,
  children,
  ...attributes
}: ErrorMessageProps) => (
  <p css={getTextStyling(isError)} {...attributes}>
    {children}
  </p>
);

export default ErrorMessage;
