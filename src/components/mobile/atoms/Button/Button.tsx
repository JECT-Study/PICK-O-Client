import React, { forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';
import * as S from './Button.style';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: 'large' | 'medium';
  variant?: 'primary' | 'roundPrimary' | 'roundPrimary2' | 'outlineShadow';
  active?: boolean;
}

const Button = (
  {
    size = 'medium',
    variant = 'primary',
    active = true,
    children,
    ...attributes
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <button
    type="button"
    ref={ref}
    css={[
      S.buttonStyling,
      S.getVariantStyling(variant, active),
      S.getSizeByVariantStyling(variant, size),
    ]}
    {...attributes}
  >
    {children}
  </button>
);

export default forwardRef(Button);
