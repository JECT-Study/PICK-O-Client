import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InteractionButton from '@/components/mobile/atoms/InteractionButton/InteractionButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { MobileBookmarkDF, MobileShare } from '@/assets';

const meta = {
  title: 'mobile/atoms/InteractionButton',
  component: InteractionButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonLabel: {
      control: { type: 'text' },
      defaultValue: '이 게임 제법 폼이 좋아?',
    },
    icon: {
      control: { type: 'select' },
      options: ['BookmarkDF', 'Share'],
      mapping: {
        BookmarkDF: <MobileBookmarkDF />,
        Share: <MobileShare />,
      },
      defaultValue: 'BookmarkDF',
    },
    iconLabel: { control: { type: 'text' }, defaultValue: '저장하기' },
  },
} satisfies Meta<typeof InteractionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonLabel: '이 게임 제법 폼이 좋아?',
    icon: <MobileBookmarkDF />,
    iconLabel: '저장하기',
  },
};

export const All: Story = {
  args: {
    buttonLabel: '이 게임 제법 폼이 좋아?',
    icon: <MobileBookmarkDF />,
    iconLabel: '저장하기',
  },
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>저장하기 버튼</h3>
        <InteractionButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>공유하기 버튼</h3>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<MobileShare />}
          iconLabel="공유하기"
        />
      </li>
    </ul>
  ),
};
