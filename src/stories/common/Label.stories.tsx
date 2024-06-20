import Label from '@/components/common/Label/Label';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'commons/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    children: 'Label',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};