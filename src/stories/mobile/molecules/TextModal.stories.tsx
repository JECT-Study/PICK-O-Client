import TextModal from '@/components/mobile/molecules/TextModal/TextModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/TextModal',
  component: TextModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    text: 'TextModal',
    isOpen: true,
  },
} satisfies Meta<typeof TextModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
