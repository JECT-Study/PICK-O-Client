import React, { useRef, useState, useEffect, useCallback } from 'react';
import ImageUploadButton from '@/components/atoms/ImageUploadButton/ImageUploadButton';
import ImagePreview from '@/components/atoms/ImagePreview/ImagePreview';
import { RightArrowButton, LeftArrowButton } from '@/assets';
import { useDeleteFileMutation } from '@/hooks/api/file/useDeleteFileMutation';
import * as S from './ImageUploader.style';

interface ImageUploaderProps {
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  fileIds: number[];
  setFileIds: (name: string, fileIds: number[]) => void;
  setIsUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setNewFileIds: React.Dispatch<React.SetStateAction<number[]>>;
  setDeleteFileIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ImageUploader = ({
  imgUrls,
  setImgUrls,
  fileIds,
  setFileIds,
  setIsUploadingImage,
  isEditing,
  setNewFileIds,
  setDeleteFileIds,
}: ImageUploaderProps) => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const deleteFileMutation = useDeleteFileMutation();

  const handleDelete = (index: number) => {
    const fileId: number = fileIds[index];
    const updatedFileIds = fileIds.filter((_, i) => i !== index);
    setImgUrls((prev) => prev.filter((_, i) => i !== index));

    if (isEditing) {
      setFileIds('fileIds', updatedFileIds);
      setDeleteFileIds((prev) => [...prev, fileId]);
    } else {
      deleteFileMutation.mutate(fileId, {
        onSuccess: () => {
          setFileIds('fileIds', updatedFileIds);
        },
      });
    }
  };

  const scrollToRight = (): void => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToLeft = (): void => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = useCallback((): void => {
    if (imageContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        imageContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(
        imgUrls.length > 0 && scrollLeft < scrollWidth - clientWidth,
      );
    }
  }, [imgUrls]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
    }

    checkScrollPosition();

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [imgUrls, checkScrollPosition]);

  return (
    <div css={S.uploaderContainerStyle}>
      <div css={S.imageContainerStyle} ref={imageContainerRef}>
        <ImageUploadButton
          imageCount={imgUrls.length}
          setImgUrls={setImgUrls}
          fileIds={fileIds}
          setFileIds={setFileIds}
          setIsUploadingImage={setIsUploadingImage}
          isEditing={isEditing}
          setNewFileIds={setNewFileIds}
        />

        {imgUrls.map((url, index) => (
          <ImagePreview
            key={url}
            imgUrl={url}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          css={S.arrowButtonStyle('left')}
          onClick={scrollToLeft}
          aria-label="Scroll left"
        >
          <LeftArrowButton />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll right"
          css={S.arrowButtonStyle('right')}
          onClick={scrollToRight}
        >
          <RightArrowButton />
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
