import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProfileListItem from '@/components/mobile/molecules/ProfileListItem/ProfileListItem';
import { ProfileInfoSample } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof ProfileListItem> = {
  title: 'mobile/molecules/ProfileListItem',
  component: ProfileListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '제목',
      defaultValue: '제목제목제목제목',
    },
    imgUrl: {
      control: 'text',
      description: '이미지 URL',
      defaultValue: ProfileInfoSample,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목제목제목제목',
    imgUrl: ProfileInfoSample,
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <ProfileListItem {...args} title="제목1" imgUrl={ProfileInfoSample} />
        <ProfileListItem {...args} title="제목2" imgUrl={ProfileInfoSample} />
        <ProfileListItem {...args} title="제목3" imgUrl={ProfileInfoSample} />
        <ProfileListItem
          {...args}
          title="제목제목제목제목제목"
          imgUrl={ProfileInfoSample}
        />
      </li>
    </ul>
  ),
};
