import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CategoryButton from '@/components/atoms/CategoryButton/CategoryButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof CategoryButton> = {
  title: 'atoms/CategoryButton',
  component: CategoryButton,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'tablet' },
  },
  argTypes: {
    imageType: {
      options: ['PickVote', 'RandomGame', 'TodayPick'],
      control: { type: 'radio' },
    },
    label: { control: { type: 'text' } },
    isMobile: { control: { type: 'boolean' } },
  },
  args: {
    imageType: 'PickVote',
    label: 'Category Label',
    isMobile: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>톡&픽 플레이스</h3>
        <CategoryButton imageType="PickVote" label="톡&픽 플레이스" />
      </li>
      <li css={storyInnerContainer}>
        <h3>오늘의 톡픽 모음.zip</h3>
        <CategoryButton imageType="TodayPick" label="오늘의 톡픽 모음.zip" />
      </li>
      <li css={storyInnerContainer}>
        <h3>랜덤 밸런스 게임</h3>
        <CategoryButton imageType="RandomGame" label="랜덤 밸런스 게임" />
      </li>
    </ul>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>모바일 톡&픽 플레이스</h3>
        <CategoryButton imageType="PickVote" label="톡&픽 플레이스" isMobile />
      </li>
      <li css={storyInnerContainer}>
        <h3>모바일 랜덤 밸런스 게임</h3>
        <CategoryButton
          imageType="RandomGame"
          label="랜덤 밸런스 게임"
          isMobile
        />
      </li>
    </ul>
  ),
};
