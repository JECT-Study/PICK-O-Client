import React, { forwardRef } from 'react';
import { DefaultPerson, Plus } from '@/assets';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import * as S from './ProfileSetting.style';

export interface ProfileSettingProps extends ComponentPropsWithoutRef<'img'> {
  isSetting?: boolean;
}

const ProfileSetting = (
  { isSetting = false, ...attributes }: ProfileSettingProps,
  ref: ForwardedRef<HTMLImageElement>,
) => {
  return (
    <div css={S.profileSettingContainer}>
      {isSetting ? (
        <>
          <div css={S.profileSettingInnerContainer}>
            <img
              alt="프로필 이미지"
              {...attributes}
              ref={ref}
              css={S.profileImageWrapper}
            />
          </div>
          <div css={S.profilePlusWrapper} {...attributes}>
            <Plus />
          </div>
        </>
      ) : (
        <>
          <div
            css={[S.profileSettingInnerContainer, S.profilePlusImageWrapper]}
            {...attributes}
            ref={ref}
          >
            <DefaultPerson />
          </div>
          <div css={S.profilePlusWrapper} {...attributes}>
            <Plus />
          </div>
        </>
      )}
    </div>
  );
};

export default forwardRef(ProfileSetting);
