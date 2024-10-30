import type { Meta, StoryObj } from '@storybook/react';
import SearchResultCardSkeleton from '@/components/atoms/SearchResultCardSkeleton/SearchResultCardSkeleton';

const meta = {
  title: 'atoms/SearchResultCardSkeleton',
  component: SearchResultCardSkeleton,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof SearchResultCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
