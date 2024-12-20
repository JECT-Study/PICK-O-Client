import type { Meta, StoryObj } from '@storybook/react';
import GameTagChip from '@/components/mobile/atoms/GameTagChip/GameTagChip';

const meta = {
  title: 'mobile/atoms/GameTagChip',
  component: GameTagChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tag: { control: { type: 'text' } },
  },
  args: {
    tag: '태그',
  },
} satisfies Meta<typeof GameTagChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
