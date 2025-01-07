import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MobileProfileImage from '@/components/mobile/atoms/MobileProfileImage/MobileProfileImage';
import { ProfileInfoSample } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof MobileProfileImage> = {
  title: 'mobile/atoms/MobileProfileImage',
  component: MobileProfileImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['lg', 'sm'],
    },
    imgUrl: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileProfileImage>;

export const Default: Story = {
  args: {
    size: 'lg',
    imgUrl: '',
    alt: '기본 프로필 이미지',
  },
};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3> 이미지 url이 없을 때</h3>
        <MobileProfileImage size="lg" alt="기본 프로필 이미지 (Large)" />
        <MobileProfileImage size="sm" alt="기본 프로필 이미지 (Small)" />
        <h3> 이미지 url이 존재할 때</h3>
        <MobileProfileImage
          imgUrl={ProfileInfoSample}
          size="lg"
          alt="사용자 프로필 이미지 (Large)"
        />
        <MobileProfileImage
          imgUrl={ProfileInfoSample}
          size="sm"
          alt="사용자 프로필 이미지 (Small)"
        />
      </li>
    </ul>
  ),
};
