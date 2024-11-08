import React, { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import Button from '@/components/atoms/Button/Button';
import * as S from './TextArea.style';

export interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  size: 'large' | 'medium';
  value: string;
  label: string;
  onSubmit: () => void;
  isEdited?: boolean;
}

const TextArea = (
  { size, value, label, onSubmit, isEdited = true, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => (
  <div css={[S.textAreaContainer, S.getContainerSizeStyling(size)]}>
    <textarea
      css={[S.replyTextArea, S.getTextareaSizeStyling(size)]}
      value={value}
      maxLength={500}
      {...props}
      ref={ref}
    />
    <div css={S.replyFooter}>
      <span css={S.replyCount}>{value.length}/500</span>
      <Button
        size="large"
        variant="primary"
        onClick={onSubmit}
        css={S.getButtonStyle(isEdited)}
      >
        {label}
      </Button>
    </div>
  </div>
);

export default forwardRef(TextArea);
