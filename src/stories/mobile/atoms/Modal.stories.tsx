import React, { useState } from 'react';
import Modal from '@/components/mobile/atoms/Modal/Modal';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    action: {
      options: ['text', 'share', 'tag', 'tempGame'],
      control: { type: 'radio' },
    },
    isOpen: { control: { type: 'boolean' } },
    hasCloseButton: { control: { type: 'boolean' } },
    children: { control: { type: 'text' } },
  },
  args: {
    isOpen: true,
    children: 'Modal',
    hasCloseButton: true,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    action: 'share',
    hasCloseButton: true,
  },
};

export const All: Story = {
  render: (args) => {
    const [modalOpen, setModalOpen] = useState<boolean>(true);
    const handleCloseModal = () => setModalOpen(!modalOpen);

    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>Close Modal</h3>
          <Modal isOpen={modalOpen} onClose={handleCloseModal} hasCloseButton>
            Close Modal
          </Modal>
        </li>
        <li css={storyInnerContainer}>
          <h3>Text</h3>
          <Modal {...args} action="text">
            Text Modal
          </Modal>
          <h3>Share</h3>
          <Modal {...args} action="share">
            Share Modal
          </Modal>
          <h3>Tag</h3>
          <Modal {...args} action="tag">
            Tag Modal
          </Modal>
          <h3>TempGame</h3>
          <Modal {...args} action="tempGame">
            TempGame Modal
          </Modal>
        </li>
      </ul>
    );
  },
};
