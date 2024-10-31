import type { Meta, StoryObj } from '@storybook/react';
import MypageCardSkeleton from '@/components/atoms/MypageCardSkeleton/MypageCardSkeleton';

const meta = {
  title: 'atoms/MypageCardSkeleton',
  component: MypageCardSkeleton,
  parameters: {},
} satisfies Meta<typeof MypageCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
