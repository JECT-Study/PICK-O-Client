import type { Meta, StoryObj } from '@storybook/react';
import SearchResultListSkeleton from '@/components/atoms/SearchResultListSkeleton/SearchResultListSkeleton';

const meta = {
  title: 'atoms/SearchResultListSkeleton',
  component: SearchResultListSkeleton,
  parameters: {},
  argTypes: {
    length: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof SearchResultListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 10,
  },
};
