/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MobileSideMenu from '@/components/mobile/atoms/MobileSideMenu/MobileSideMenu';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof MobileSideMenu> = {
  title: 'mobile/atoms/MobileSideMenu',
  component: MobileSideMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { type: 'boolean' },
    accessToken: { type: 'string' },
    handleLoginButton: { action: 'button clicked' },
    setIsOpen: { action: 'setIsOpen called' },
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
