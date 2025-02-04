import React, { useState } from 'react';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import Button from '@/components/mobile/atoms/Button/Button';
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
    <Modal action="share" isOpen={isOpen} onClose={onClose} hasCloseButton>
      <div css={S.defaultProfileModalStyling}>
        <div css={S.selectTextStyling}>
          나만의 <span>PICK-O 프렌즈</span>를 픽해보세요!
        </div>
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
              <img src={src} alt="프렌즈 이미지" css={S.profileImage} />
            </button>
          ))}
        </div>
        <Button
          size="large"
          variant="primary"
          onClick={() => onSelect && onSelect(selectedImg)}
          css={S.selectButtonStyling(!!selectedImg)}
        >
          설정 완료
        </Button>
      </div>
    </Modal>
  );
};

export default DefaultProfileModal;
