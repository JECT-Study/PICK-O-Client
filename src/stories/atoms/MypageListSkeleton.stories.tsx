import type { Meta, StoryObj } from '@storybook/react';
import MypageListSkeleton from '@/components/atoms/MypageListSkeleton/MypageListSkeleton';

const meta = {
  title: 'atoms/MypageListSkeleton',
  component: MypageListSkeleton,
  parameters: {},
} satisfies Meta<typeof MypageListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
