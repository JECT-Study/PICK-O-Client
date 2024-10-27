import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import ImageUploadButton from '@/components/atoms/ImageUploadButton/ImageUploadButton';
import ImagePreview from '@/components/atoms/ImagePreview/ImagePreview';
import { RightArrowButton, LeftArrowButton } from '@/assets';
import { useDeleteFileMutation } from '@/hooks/api/file/useDeleteFileMutation';
import * as S from './ImageUploader.style';

interface ImageUploaderProps {
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  storedNames: string[];
}

const ImageUploader = ({
  imageFiles,
  setImageFiles,
  imgUrls,
  setImgUrls,
  storedNames,
}: ImageUploaderProps) => {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const deleteFileMutation = useDeleteFileMutation();

  const imageList: string[] = useMemo(
    () => [...imgUrls, ...imageFiles.map((file) => URL.createObjectURL(file))],
    [imgUrls, imageFiles],
  );

  const handleDelete = (index: number) => {
    const isObjectUrl: boolean = imageList[index].startsWith('blob:');

    if (isObjectUrl) {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      const storedName = storedNames[index];

      deleteFileMutation.mutate(storedName, {
        onSuccess: () => {
          setImgUrls((prev) => prev.filter((_, i) => i !== index));
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
        imageFiles.length > 0 && scrollLeft < scrollWidth - clientWidth,
      );
    }
  }, [imageFiles]);

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
  }, [imageFiles, checkScrollPosition]);

  return (
    <div css={S.uploaderContainerStyle}>
      <div css={S.imageContainerStyle} ref={imageContainerRef}>
        <ImageUploadButton
          imageCount={imageList.length}
          setImageFiles={setImageFiles}
        />

        {imageList.map((url, index) => (
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
