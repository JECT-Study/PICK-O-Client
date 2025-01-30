/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Label from '@/components/atoms/Label/Label';
import ProfileSetting from '@/components/atoms/ProfileSetting/ProfileSetting';
import MobileProfileSetting from '@/components/mobile/atoms/ProfileSetting/ProfileSetting';
import {
  ProfileImageProps,
  useCheckProfileImage,
} from '@/hooks/common/inputsUserInfo/useCheckProfileImage';
import DefaultProfileModal from '@/components/molecules/DefaultProfileModal/DefaultProfileModal';
import MobileDefaultProfileModal from '@/components/mobile/molecules/DefaultProfileModal/DefaultProfileModal';
import * as S from './InputProfileImage.style';

export interface InputProfileImageProps extends ProfileImageProps {
  isMobile?: boolean;
}

const InputProfileImage = ({
  isMobile = false,
  setImageFileId,
  imgSrc,
  setIsImageChanged,
}: InputProfileImageProps) => {
  const {
    imageSrc,
    isError,
    getRootProps,
    friendsImageList,
    handleDefaultImage,
  } = useCheckProfileImage({ setImageFileId, imgSrc, setIsImageChanged });

  const [defaultProfileModalOpen, setDefaultProfileModalOpen] =
    useState<boolean>(false);

  const handleSelectDefaultImage = (selectedImage: string | null) => {
    if (selectedImage) {
      handleDefaultImage(selectedImage);
    }
    setDefaultProfileModalOpen(false);
  };

  return isMobile ? (
    <div css={S.profileImageSelectContainer}>
      <MobileProfileSetting
        isSetting={!!imageSrc}
        src={imageSrc}
        {...getRootProps()}
      />
      <div css={S.profileImageTextContainer}>
        <button
          type="button"
          css={S.mobileProfileDefaultText}
          onClick={() => setDefaultProfileModalOpen(true)}
        >
          기본 이미지로 프로필 설정하기
        </button>
        <span css={S.mobileProfileImageText(isError)}>
          3MB 이하의 사진만 가능합니다.
        </span>
      </div>
      <div css={S.defaultProfileModalcenterStyling}>
        <MobileDefaultProfileModal
          isOpen={defaultProfileModalOpen}
          imgList={friendsImageList ?? []}
          onSelect={handleSelectDefaultImage}
          onClose={() => setDefaultProfileModalOpen(false)}
        />
      </div>
    </div>
  ) : (
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
