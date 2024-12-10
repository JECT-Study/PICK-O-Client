/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DraftSaveButton from '@/components/mobile/atoms/DraftSaveButton/DraftSaveButton';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof DraftSaveButton> = {
  title: 'mobile/DraftSaveButton',
  component: DraftSaveButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: () => console.log('clicked'),
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
