import { MobileReportModal } from '@/components/mobile/molecules/MobileReportModal/MobileReportModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/MobileReportModal',
  component: MobileReportModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    isOpen: true,
    onConfirm: () => {},
    onClose: () => {},
  },
} satisfies Meta<typeof MobileReportModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
