import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '@/components/organisms/SideBar/SideBar';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { ProfileInfoSample } from '@/assets';

const meta = {
  title: 'organisms/SideBar',
  component: SideBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    nickname: { control: { type: 'text' }, defaultValue: 'Aycho' },
    profileImageUrl: {
      control: { type: 'text' },
      defaultValue: ProfileInfoSample,
    },
    postsCount: { control: { type: 'number' }, defaultValue: 23 },
    bookmarkedPostsCount: { control: { type: 'number' }, defaultValue: 21 },
    isLoading: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nickname: 'Aycho',
    profileImageUrl: ProfileInfoSample,
    postsCount: 23,
    bookmarkedPostsCount: 21,
    isLoading: false,
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>기본 SideBar</h3>
        <SideBar {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>프로필 이미지 없는 경우(settings는 normal로 설정)</h3>
        <SideBar
          {...args}
          nickname="Aycho"
          profileImageUrl=""
          postsCount={0}
          bookmarkedPostsCount={0}
        />
      </li>
      <li css={storyInnerContainer}>
        <h3>게시글 카운트와 저장한 글 카운트 다른 경우</h3>
        <SideBar
          {...args}
          nickname="Aycho"
          profileImageUrl={ProfileInfoSample}
          postsCount={45}
          bookmarkedPostsCount={15}
        />
      </li>
      <li css={storyInnerContainer}>
        <h3>로딩중인 경우</h3>
        <SideBar
          {...args}
          nickname="Aycho"
          profileImageUrl={ProfileInfoSample}
          postsCount={45}
          bookmarkedPostsCount={15}
          isLoading
        />
      </li>
    </ul>
  ),
  args: {
    nickname: 'Aycho',
    profileImageUrl: ProfileInfoSample,
    postsCount: 23,
    bookmarkedPostsCount: 21,
    isLoading: false,
  },
};
