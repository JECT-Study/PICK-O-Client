import React, { useRef, useState } from 'react';
import { Camera, MobileTrashCan } from '@/assets';
import useOutsideClick from '@/hooks/common/useOutsideClick';
import * as S from './PhotoBox.style';

export interface PhotoBoxProps {
  imgUrl?: string;
  alt: string;
  optionId: number;
  handleImageChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionId: number,
  ) => void;
  handleDeleteImg: () => void;
}

const PhotoBox = ({
  imgUrl,
  alt,
  optionId,
  handleImageChange,
  handleDeleteImg,
}: PhotoBoxProps) => {
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imgClicked, setImgClicked] = useState<boolean>(false);
  useOutsideClick(imgBoxRef, () => setImgClicked(false));

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  return (
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
          <img src={imgUrl} alt={alt} css={S.image} />
        </div>
      ) : (
        <>
          <Camera css={S.icon} />
          <input
            type="file"
            accept="image/*"
            css={S.fileInput}
            ref={fileInputRef}
            onChange={(e) => handleImageChange(e, optionId)}
          />
        </>
      )}
    </button>
  );
};

export default PhotoBox;
