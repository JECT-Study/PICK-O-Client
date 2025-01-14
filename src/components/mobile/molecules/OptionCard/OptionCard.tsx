import React, { ComponentPropsWithoutRef, useState } from 'react';
import { MobileChoiceMinus, MobileChoicePlus } from '@/assets';
import * as S from './OptionCard.style';
import PhotoBox from '../../atoms/PhotoBox/PhotoBox';

export interface OptionCardProps {
  type: 'A' | 'B';
  nameProps: ComponentPropsWithoutRef<'input'>;
  descriptionProps: ComponentPropsWithoutRef<'input'>;
  imgUrl?: string;
  handleImgChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number,
  ) => void;
  handleDeleteImg: () => void;
}

const OptionCard = ({
  type,
  nameProps,
  descriptionProps,
  imgUrl,
  handleImgChange,
  handleDeleteImg,
}: OptionCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isContentEmpty = !nameProps.value && !descriptionProps.value;
  const gameOptionId: number = type === 'A' ? 0 : 1;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div css={S.container(type, isContentEmpty)}>
      <div css={S.contentWrapper}>
        <PhotoBox
          imgUrl={imgUrl}
          alt={`${type} 선택지`}
          optionId={gameOptionId}
          handleImageChange={handleImgChange}
          handleDeleteImg={handleDeleteImg}
        />
        <div css={S.textContainer}>
          <input
            type="text"
            placeholder={`${type} 선택지를 입력하세요.`}
            css={S.titleInput}
            {...nameProps}
          />
          {!isExpanded && (
            <button
              type="button"
              onClick={toggleExpand}
              css={S.expandButton}
              aria-label="부가 설명 열기"
            >
              <MobileChoicePlus />
            </button>
          )}
        </div>
      </div>
      {isExpanded && (
        <div css={S.additionalContainer}>
          <input
            type="text"
            placeholder="선택지에 대해 추가로 설명을 입력할 수 있어요!"
            css={S.subTitleInput}
            {...descriptionProps}
          />
          <button
            type="button"
            onClick={toggleExpand}
            css={S.expandButton}
            aria-label="부가 설명 닫기"
          >
            <MobileChoiceMinus />
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionCard;
