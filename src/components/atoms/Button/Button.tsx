import type { Size } from '@/types/theme';
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from 'react';
import React, { forwardRef } from 'react';
import {
  buttonStyling,
  getSizeByVariantStyling,
  getVariantStyling,
} from './Button.style';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: Extract<Size, 'large' | 'medium' | 'small'>;
  variant?:
    | 'primary'
    | 'primarySquare'
    | 'roundPrimary'
    | 'roundPrimary2'
    | 'outlinePrimary'
    | 'outlineSecondary'
    | 'outlinePrimarySquare'
    | 'outlineShadow'
    | 'outlineHighlightR'
    | 'outlineHighlightB'
    | 'circle';
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
}

const Button = (
  {
    size = 'large',
    variant = 'primary',
    children,
    iconLeft,
    iconRight,
    ...attributes
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <button
    type="button"
    ref={ref}
    css={[
      buttonStyling,
      getVariantStyling(variant),
      getSizeByVariantStyling(variant, size),
    ]}
    {...attributes}
  >
    {iconLeft}
    {children}
    {iconRight}
  </button>
);

export default forwardRef(Button);
