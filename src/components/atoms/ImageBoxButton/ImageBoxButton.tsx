import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Camera, IcTrash } from '@/assets';
import * as S from './ImageBoxButton.style';

interface ImageBoxButtonProps {
  imgUrl?: string;
  onFileSelect: (file: File) => void;
  onDelete?: () => void;
}

const ImageBoxButton = ({
  imgUrl = '',
  onFileSelect,
  onDelete,
}: ImageBoxButtonProps) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      css={S.imageContainer}
      data-has-img={imgUrl ? 'true' : 'false'}
      onClick={imgUrl ? undefined : handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {imgUrl ? (
        <>
          <img src={imgUrl} alt="Uploaded from server" css={S.uploadedImage} />
          <button
            type="button"
            css={S.trashImageBox}
            className="trashIcon"
            onClick={onDelete}
            aria-label="Delete image"
          >
            <IcTrash css={S.trashImage} />
          </button>
        </>
      ) : (
        <div css={S.defaultImageBox}>
          <Camera css={S.iconStyle} />
        </div>
      )}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        css={S.fileInput}
      />
    </div>
  );
};

export default ImageBoxButton;
