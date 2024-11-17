import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Camera } from '@/assets';
import * as S from './ImageBoxButton.style';

interface ImageBoxButtonProps {
  imageFile: File | null;
  imgUrl?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ImageBoxButton = ({
  imageFile,
  imgUrl = '',
  onChange,
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

  const renderImage = () => {
    if (imageFile instanceof File) {
      return (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Uploaded"
          css={S.uploadedImage}
        />
      );
    }

    if (imgUrl && imgUrl.length > 0) {
      return (
        <img src={imgUrl} alt="Uploaded from server" css={S.uploadedImage} />
      );
    }

    return (
      <div css={S.defaultImageBox}>
        <Camera css={S.iconStyle} />
      </div>
    );
  };

  return (
    <div
      css={S.imageContainer}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {renderImage()}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onChange}
        css={S.fileInput}
      />
    </div>
  );
};

export default ImageBoxButton;
