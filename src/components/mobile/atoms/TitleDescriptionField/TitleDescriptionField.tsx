import React, { ForwardedRef, forwardRef, useRef } from 'react';
import Divider from '@/components/atoms/Divider/Divider';
import * as S from './TitleDescriptionField.style';

export interface TitleDescriptionFieldProps {
  title: string;
  description?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TitleDescriptionField = (
  {
    title,
    description,
    onTitleChange,
    onDescriptionChange,
  }: TitleDescriptionFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 100) {
      onTitleChange(e);
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (onDescriptionChange && e.target.value.length <= 30) {
      onDescriptionChange(e);
    }
  };

  return (
    <div css={S.fieldStyling}>
      <input
        type="text"
        placeholder="제목(필수) 극악난이도 밸런스게임"
        value={title}
        onChange={handleTitleChange}
        ref={ref}
        css={S.titleStyling}
      />
      <div css={S.dividerWrapper}>
        <Divider orientation="width" length={335} />
      </div>
      <textarea
        placeholder="ex) 둘 중 한 명과 반드시 연애해야만 한다면..."
        value={description}
        onChange={handleDescriptionChange}
        css={S.descriptionStyling}
        ref={descriptionRef}
      />
    </div>
  );
};

export default forwardRef(TitleDescriptionField);
