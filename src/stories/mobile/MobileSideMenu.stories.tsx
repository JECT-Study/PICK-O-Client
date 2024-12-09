/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MobileSideMenu from '@/components/mobile/atom/MobileSideMenu/MobileSideMenu';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof MobileSideMenu> = {
  title: 'mobile/MobileSideMenu',
  component: MobileSideMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    accessToken: 'true',
    handleLoginButton: () => console.log('로그인 버튼 클릭'),
    setIsOpen: (isOpen: boolean) =>
      console.log(`setIsOpen called with: ${isOpen}`),
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
