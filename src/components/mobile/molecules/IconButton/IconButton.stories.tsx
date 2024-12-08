import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  IcMobileBookmark,
  IcMobileBookmarkDF,
  IcMobileComment,
  IcMobileCommentDF,
} from '@/assets';
import IconButton from '@/components/mobile/molecules/IconButton/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'mobile/molecules/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeIcon: <IcMobileBookmark />,
    inactiveIcon: <IcMobileBookmarkDF />,
    label: 'Bookmark',
    isActive: false,
  },
};

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <IconButton
        {...args}
        activeIcon={<IcMobileBookmark />}
        inactiveIcon={<IcMobileBookmarkDF />}
        label="내가 저장한"
        isActive={false}
      />
      <IconButton
        {...args}
        activeIcon={<IcMobileBookmark />}
        inactiveIcon={<IcMobileBookmarkDF />}
        label="내가 저장한"
        isActive
      />
      <IconButton
        {...args}
        activeIcon={<IcMobileComment />}
        inactiveIcon={<IcMobileCommentDF />}
        label="내가 댓글단"
        isActive={false}
      />
      <IconButton
        {...args}
        activeIcon={<IcMobileComment />}
        inactiveIcon={<IcMobileCommentDF />}
        label="내가 댓글단"
        isActive
      />
    </div>
  ),
};
