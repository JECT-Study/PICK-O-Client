import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameCreateSection from '@/components/mobile/organisms/BalanceGameCreateSection/BalanceGameCreateSection';

const meta = {
  title: 'mobile/organisms/BalanceGameCreateSection',
  component: BalanceGameCreateSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BalanceGameCreateSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
