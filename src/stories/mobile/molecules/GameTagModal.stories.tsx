/* eslint-disable no-console */
import GameTagModal from '@/components/mobile/molecules/GameTagModal/GameTagModal';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'mobile/molecules/GameTagModal',
  component: GameTagModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onTagSubmit: { action: 'tagSubmit' },
  },
} satisfies Meta<typeof GameTagModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onTagSubmit: (mainTag: string, subTag: string) => {
      console.log(`메인 태그 : ${mainTag}, 서브 태그 : ${subTag}`);
    },
  },
};
