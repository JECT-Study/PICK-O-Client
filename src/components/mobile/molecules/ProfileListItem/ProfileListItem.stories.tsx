import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProfileListItem from '@/components/mobile/molecules/ProfileListItem/ProfileListItem';
import { ProfileInfoSample } from '@/assets';
import { MemoryRouter } from 'react-router-dom';
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
    to: {
      control: 'text',
      description: '이동할 경로',
      defaultValue: '/talkpick/1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목제목제목제목',
    imgUrl: ProfileInfoSample,
    to: '/talkpick/1',
  },
  render: (args) => (
    <MemoryRouter>
      <ProfileListItem {...args} />
    </MemoryRouter>
  ),
};

export const All: Story = {
  render: (args) => (
    <MemoryRouter>
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <ProfileListItem
            {...args}
            title="제목1"
            imgUrl={ProfileInfoSample}
            to="/talkpick/1"
          />
          <ProfileListItem
            {...args}
            title="제목2"
            imgUrl={ProfileInfoSample}
            to="/talkpick/2"
          />
          <ProfileListItem
            {...args}
            title="제목3"
            imgUrl={ProfileInfoSample}
            to="/talkpick/3"
          />
          <ProfileListItem
            {...args}
            title="제목제목제목제목제목"
            imgUrl={ProfileInfoSample}
            to="/talkpick/4"
          />
        </li>
      </ul>
    </MemoryRouter>
  ),
};
