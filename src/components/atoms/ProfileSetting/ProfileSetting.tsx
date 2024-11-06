import React, { forwardRef } from 'react';
import { Plus } from '@/assets';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import {
  profileImageWrapper,
  profilePlusImageWrapper,
  profilePlusWrapper,
  profileSettingContainer,
  profileSettingInnerContainer,
} from './ProfileSetting.style';

export interface ProfileSettingProps extends ComponentPropsWithoutRef<'img'> {
  isSetting?: boolean;
}

const ProfileSetting = (
  { isSetting = false, ...attributes }: ProfileSettingProps,
  ref: ForwardedRef<HTMLImageElement>,
) => {
  return (
    <div css={profileSettingContainer}>
      {isSetting ? (
        <>
          <div css={profileSettingInnerContainer}>
            <img
              alt="프로필 이미지"
              {...attributes}
              ref={ref}
              css={profileImageWrapper}
            />
          </div>
          <div css={profilePlusWrapper} {...attributes}>
            <Plus />
          </div>
        </>
      ) : (
        <div
          css={[profileSettingInnerContainer, profilePlusImageWrapper]}
          {...attributes}
          ref={ref}
        >
          <Plus />
        </div>
      )}
    </div>
  );
};

export default forwardRef(ProfileSetting);
