import React, { useState } from 'react';
import PhotoBox from '@/components/mobile/atoms/PhotoBox/PhotoBox';
import { ChoiceMinus, ChoicePlus } from '@/assets';
import * as S from './OptionCard.style';

export interface OptionCardProps {
  type: 'A' | 'B';
  title: string;
  subTitle?: string;
  imgUrl?: string;
  onFileSelect?: (file: File) => void;
  onTitleChange?: (newTitle: string) => void;
  onSubTitleChange?: (newSubTitle: string) => void;
}

const OptionCard = ({
  type,
  title,
  subTitle,
  imgUrl,
  onFileSelect,
  onTitleChange,
  onSubTitleChange,
}: OptionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect?.(file);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange?.(event.target.value);
  };

  const handleSubTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSubTitleChange?.(event.target.value);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const isContentEmpty = !title && !subTitle;

  return (
    <div css={S.container(type, isContentEmpty, isExpanded)}>
      <div css={S.contentWrapper}>
        <label css={S.photoLabel}>
          <PhotoBox imgUrl={imgUrl} alt={`${type} 선택지`} />
          <input
            type="file"
            accept="image/*"
            css={S.fileInput}
            onChange={handleFileSelect}
          />
        </label>
        <div css={S.textContainer}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder={`${type} 선택지를 입력하세요.`}
            css={S.titleInput}
          />
        </div>
        {!isExpanded && (
          <button
            type="button"
            onClick={toggleExpand}
            css={S.expandButton}
            aria-label="부가 설명 열기"
          >
            <ChoicePlus />
          </button>
        )}
      </div>
      {isExpanded && (
        <div css={S.additionalContainer}>
          <input
            type="text"
            value={subTitle}
            onChange={handleSubTitleChange}
            placeholder="해당 선택지에 대해 추가로 설명을 입력"
            css={S.subTitleInput}
          />
          <button
            type="button"
            onClick={toggleExpand}
            css={S.expandButton}
            aria-label="부가 설명 닫기"
          >
            <ChoiceMinus />
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionCard;
