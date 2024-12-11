import TempGameModal from '@/components/mobile/molecules/TempGameModal/TempGameModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/TempGameModal',
  component: TempGameModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: { type: 'boolean' } },
  },
  args: {
    isOpen: true,
    onGetGame: () => {},
    onSaveGame: () => {},
  },
} satisfies Meta<typeof TempGameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
