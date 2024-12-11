import ShareModal from '@/components/mobile/molecules/ShareModal/ShareModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/ShareModal',
  component: ShareModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof ShareModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
