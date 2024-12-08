import React, { useState } from 'react';
import Modal from '@/components/atoms/Modal/Modal';
import Button from '@/components/atoms/Button/Button';
import * as S from './DefaultProfileModal.style';

export interface DefaultProfileModalProps {
  isOpen: boolean;
  imgList: string[];
  onSelect?: (selectedImage: string | null) => void;
  onClose?: () => void;
}

const DefaultProfileModal = ({
  isOpen,
  imgList,
  onSelect,
  onClose,
}: DefaultProfileModalProps) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleDefaultImage = (src: string) => {
    setSelectedImg(src);
  };

  return (
    <Modal action="profile" isOpen={isOpen} onClose={onClose}>
      <div css={S.defaultProfileModalStyling}>
        <div css={S.imageWrapperStyling}>
          {imgList.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => handleDefaultImage(src)}
              css={[
                S.imageButtonStyling,
                selectedImg === src && S.selectedImageStyling,
              ]}
            >
              <img src={src} alt={src} css={S.profileImage} />
            </button>
          ))}
        </div>
        <div css={S.selectTextStyling}>나만의 PICK-O 프렌즈를 픽해보세요!</div>
        <Button
          size="large"
          variant="primary"
          onClick={() => onSelect && onSelect(selectedImg)}
          css={S.selectButtonStyling}
        >
          설정 완료
        </Button>
      </div>
    </Modal>
  );
};

export default DefaultProfileModal;
