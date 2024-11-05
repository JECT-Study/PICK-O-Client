import TagModal from '@/components/molecules/TagModal/TagModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'molecules/TagModal',
  component: TagModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: { action: 'close' },
    onTagSubmit: { action: 'tagSubmit' },
  },
} satisfies Meta<typeof TagModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onTagSubmit: (mainTag: string, subTag: string) => {
      console.log(`메인 태그 : ${mainTag}, 서브 태그 : ${subTag}`);
    },
  },
};
