import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LabelCountBox from '@/components/mobile/molecules/LabelCountBox/LabelCountBox';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof LabelCountBox> = {
  title: 'mobile/molecules/LabelCountBox',
  component: LabelCountBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
    },
    count: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '작성',
    count: 12,
  },
};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <LabelCountBox label="작성" count={12} />
        <LabelCountBox label="저장" count={34} />
      </li>
    </ul>
  ),
};
