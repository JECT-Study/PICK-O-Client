import type { Meta, StoryObj } from '@storybook/react';
import GameTag from '@/components/mobile/atoms/GameTag/GameTag';

const meta = {
  title: 'mobile/atoms/GameTag',
  component: GameTag,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tag: { control: { type: 'text' } },
  },
  args: {
    tag: '커플',
  },
} satisfies Meta<typeof GameTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
