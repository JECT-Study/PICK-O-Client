import React, { useState } from 'react';
import Label from '@/components/atoms/Label/Label';
import ProfileSetting from '@/components/atoms/ProfileSetting/ProfileSetting';
import {
  InputProfileImageProps,
  useCheckProfileImage,
} from '@/hooks/common/inputsUserInfo/useCheckProfileImage';
import DefaultProfileModal from '../DefaultProfileModal/DefaultProfileModal';
import * as S from './InputProfileImage.style';

const InputProfileImage = ({
  setImageFileId,
  imgSrc,
  setIsImgChanged,
}: InputProfileImageProps) => {
  const {
    imageSrc,
    isError,
    getRootProps,
    friendsImageList,
    handleDefaultImage,
  } = useCheckProfileImage({ setImageFileId, imgSrc, setIsImgChanged });

  const [defaultProfileModalOpen, setDefaultProfileModalOpen] =
    useState<boolean>(false);

  const handleSelectDefaultImage = (selectedImage: string | null) => {
    if (selectedImage) {
      handleDefaultImage(selectedImage);
    }
    setDefaultProfileModalOpen(false);
  };

  return (
    <div css={S.profileImageSelectContainer}>
      <Label>프로필 사진(선택)</Label>
      <ProfileSetting
        isSetting={!!imageSrc}
        src={imageSrc}
        {...getRootProps()}
      />
      <div css={S.profileImageTextContainer}>
        <button
          type="button"
          css={S.profileDefaultText}
          onClick={() => setDefaultProfileModalOpen(true)}
        >
          기본 이미지로 프로필 설정하기
        </button>
        <span css={S.profileImageText(isError)}>
          3MB 이하의 사진만 가능합니다.
        </span>
      </div>
      <div css={S.defaultProfileModalcenterStyling}>
        <DefaultProfileModal
          isOpen={defaultProfileModalOpen}
          imgList={friendsImageList ?? []}
          onSelect={handleSelectDefaultImage}
          onClose={() => setDefaultProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default InputProfileImage;
