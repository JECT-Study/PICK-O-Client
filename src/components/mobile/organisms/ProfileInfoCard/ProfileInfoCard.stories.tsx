import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProfileInfoCard from '@/components/mobile/organisms/ProfileInfoCard/ProfileInfoCard';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { ProfileInfoSample } from '@/assets';

const meta: Meta<typeof ProfileInfoCard> = {
  title: 'mobile/organisms/ProfileInfoCard',
  component: ProfileInfoCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    username: {
      control: 'text',
    },
    postCount: {
      control: 'number',
    },
    bookmarkCount: {
      control: 'number',
    },
    imgUrl: {
      control: 'text',
    },
    menuData: {
      table: {
        category: 'Actions',
      },
      description: 'Menu items for the menu tap',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imgUrl: ProfileInfoSample,
    username: 'Aycho',
    postCount: 12,
    bookmarkCount: 34,
    menuData: [
      {
        label: '회원정보 수정',
        onClick: () => console.log('회원정보 수정 클릭됨'),
      },
    ],
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <ProfileInfoCard
          {...args}
          imgUrl={ProfileInfoSample}
          username="Aycho"
          postCount={12}
          bookmarkCount={34}
          menuData={[
            {
              label: '회원정보 수정',
              onClick: () => console.log('Aycho 회원정보 수정 클릭됨'),
            },
          ]}
        />
      </li>
      <li css={storyInnerContainer}>
        <ProfileInfoCard
          {...args}
          imgUrl={ProfileInfoSample}
          username="김안녕"
          postCount={8}
          bookmarkCount={22}
          menuData={[
            {
              label: '회원정보 수정',
              onClick: () => console.log('김안녕 회원정보 수정 클릭됨'),
            },
          ]}
        />
      </li>
    </ul>
  ),
};
