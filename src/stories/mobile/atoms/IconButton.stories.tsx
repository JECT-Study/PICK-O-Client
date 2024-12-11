import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MobileBookmarkDF, MobileShare } from '@/assets';
import IconButton from '@/components/mobile/atoms/IconButton/IconButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/IconButton',
  component: IconButton,
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
} satisfies Meta<typeof IconButton>;

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
        <IconButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>공유 버튼</h3>
        <IconButton icon={<MobileShare />} />
      </li>
    </ul>
  ),
};
