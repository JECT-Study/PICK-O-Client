import ReportModal from '@/components/mobile/molecules/ReportModal/ReportModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/ReportModal',
  component: ReportModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof ReportModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
