import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileBookmarkDF, MobileShare } from '@/assets';
import InteractionMiniButton from '@/components/mobile/atoms/InteractionMiniButton/InteractionMiniButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/InteractionMiniButton',
  component: InteractionMiniButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['BookmarkDF', 'Share'],
      mapping: {
        BookmarkDF: <MobileBookmarkDF />,
        Share: <MobileShare />,
      },
      defaultValue: 'BookmarkDF',
    },
  },
  args: {
    icon: 'BookmarkDF',
  },
} satisfies Meta<typeof InteractionMiniButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <MobileBookmarkDF />,
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>북마크 버튼</h3>
        <InteractionMiniButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>공유 버튼</h3>
        <InteractionMiniButton icon={<MobileShare />} />
      </li>
    </ul>
  ),
};
