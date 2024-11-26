import Label from '@/components/atoms/Label/Label';
import ProfileSetting from '@/components/atoms/ProfileSetting/ProfileSetting';
import {
  InputProfileImageProps,
  useCheckProfileImage,
} from '@/hooks/common/inputsUserInfo/useCheckProfileImage';
import React, { useState } from 'react';
import DefaultProfileModal from '../DefaultProfileModal/DefaultProfileModal';
import {
  defaultProfileModalcenterStyling,
  profileDefaultText,
  profileImageSelectContainer,
  profileImageText,
  profileImageTextContainer,
} from './InputProfileImage.style';

const InputProfileImage = ({
  setImageFileId,
  imgSrc,
}: InputProfileImageProps) => {
  const { imageSrc, isError, getRootProps, handleDefaultImage } =
    useCheckProfileImage({ setImageFileId, imgSrc });

  const [defaultProfileModalOpen, setDefaultProfileModalOpen] =
    useState<boolean>(false);

  const handleSelectDefaultImage = (selectedImage: string | null) => {
    if (selectedImage) {
      handleDefaultImage(selectedImage);
    }
    setDefaultProfileModalOpen(false);
  };
  return (
    <div css={profileImageSelectContainer}>
      <Label>프로필 사진(선택)</Label>
      <ProfileSetting
        isSetting={!!imageSrc}
        src={imageSrc}
        {...getRootProps()}
      />
      <div css={profileImageTextContainer}>
        <button
          type="button"
          css={profileDefaultText}
          onClick={() => setDefaultProfileModalOpen(true)}
        >
          기본 이미지로 프로필 설정하기
        </button>
        <span css={profileImageText(isError)}>
          3MB 이하의 사진만 가능합니다.
        </span>
      </div>
      <div css={defaultProfileModalcenterStyling}>
        <DefaultProfileModal
          isOpen={defaultProfileModalOpen}
          onSelect={handleSelectDefaultImage}
          onClose={() => setDefaultProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default InputProfileImage;
