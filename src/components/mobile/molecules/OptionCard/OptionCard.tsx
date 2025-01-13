/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ComponentPropsWithoutRef, useRef, useState } from 'react';
import {
  Camera,
  MobileChoiceMinus,
  MobileChoicePlus,
  MobileTrashCan,
} from '@/assets';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import * as S from './OptionCard.style';

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
  const imgBoxRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [imgClicked, setImgClicked] = useState<boolean>(false);
  useOutsideClick(imgBoxRef, () => setImgClicked(false));

  const isContentEmpty = !nameProps.value && !descriptionProps.value;
  const gameOptionId: number = type === 'A' ? 0 : 1;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = () => {
    if (imgUrl) {
      if (imgClicked) {
        handleDeleteImg();
      } else {
        setImgClicked(true);
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div css={S.container(type, isContentEmpty)}>
      <div css={S.contentWrapper}>
        <button
          type="button"
          css={S.imgContainer(!!imgUrl)}
          onClick={imgUrl ? handleImageClick : handleButtonClick}
        >
          {imgUrl ? (
            <div css={S.imageWrapper} ref={imgBoxRef}>
              {imgClicked && (
                <>
                  <div css={S.overlay} />
                  <div css={S.trashCanIcon}>
                    <MobileTrashCan />
                  </div>
                </>
              )}
              <img src={imgUrl} alt={`${type} 선택지`} css={S.image} />
            </div>
          ) : (
            <>
              <Camera css={S.icon} />
              <input
                type="file"
                accept="image/*"
                css={S.fileInput}
                ref={fileInputRef}
                onChange={(e) => handleImgChange(e, gameOptionId)}
              />
            </>
          )}
        </button>
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
