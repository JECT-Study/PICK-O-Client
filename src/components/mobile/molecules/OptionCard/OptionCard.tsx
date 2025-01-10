import React, { ComponentPropsWithoutRef, useState } from 'react';
import PhotoBox from '@/components/mobile/atoms/PhotoBox/PhotoBox';
import { ChoiceMinus, ChoicePlus } from '@/assets';
import { useFileUploadMutation } from '@/hooks/api/file/useFileUploadMutation';
import * as S from './OptionCard.style';

export interface OptionCardProps {
  type: 'A' | 'B';
  nameProps: ComponentPropsWithoutRef<'input'>;
  descriptionProps: ComponentPropsWithoutRef<'input'>;
  imgUrl?: string;
  setFileId: (name: string, fileId: number, gameOptionId: number) => void;
  setImgUrl: (name: string, imgUrl: string, gameOptionId: number) => void;
}

const OptionCard = ({
  type,
  nameProps,
  descriptionProps,
  imgUrl,
  setFileId,
  setImgUrl,
}: OptionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isContentEmpty = !nameProps.value && !descriptionProps.value;
  const gameOptionId: number = type === 'A' ? 0 : 1;

  const { mutate: uploadFiles } = useFileUploadMutation();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgFile = event.target.files[0];
      const imageFormData = new FormData();
      imageFormData.append('file', imgFile);

      uploadFiles(
        {
          formData: imageFormData,
          params: { type: 'GAME_OPTION' },
        },
        {
          onSuccess: (res) => {
            setFileId('fileId', res.fileIds[0], gameOptionId);
            setImgUrl('imgUrl', res.imgUrls[0], gameOptionId);
          },
        },
      );
    }
  };

  return (
    <div css={S.container(type, isContentEmpty)}>
      <div css={S.contentWrapper}>
        <label css={S.photoLabel}>
          <PhotoBox imgUrl={imgUrl} alt={`${type} 선택지`} />
          <input
            type="file"
            accept="image/*"
            css={S.fileInput}
            onChange={handleImageChange}
          />
        </label>
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
              <ChoicePlus />
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
            <ChoiceMinus />
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionCard;
