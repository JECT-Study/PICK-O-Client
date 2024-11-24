import React, { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';
import { NormalProfile } from '@/assets';
import { profileWrapper, profileImage } from './ProfileIcon.style';

export interface ProfileProps extends ComponentPropsWithRef<'button'> {
  interaction: 'default' | 'custom';
  imgUrl?: string;
  size?: 'small' | 'large';
}

interface ProfilePropsWithImage extends ComponentPropsWithRef<'button'> {
  interaction: 'custom';
  imgUrl: string;
  size?: 'small' | 'large';
}

const ProfileIcon = (
  {
    interaction = 'default',
    imgUrl,
    size = 'small',
    ...props
  }: ProfileProps | ProfilePropsWithImage,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const profileComponents = {
    normal: (
      <button type="button" ref={ref} css={profileWrapper(size)} {...props}>
        <NormalProfile css={profileImage} />
      </button>
    ),
    settings: (
      <button type="button" ref={ref} css={profileWrapper(size)} {...props}>
        <img css={profileImage} src={imgUrl} alt="profile" />
      </button>
    ),
  };

  return interaction === 'custom'
    ? profileComponents.settings
    : profileComponents.normal;
};

export default forwardRef(ProfileIcon);
