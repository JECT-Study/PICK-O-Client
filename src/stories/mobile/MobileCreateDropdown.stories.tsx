import React from 'react';
import store from '@/store';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MobileCreateDropdown from '@/components/mobile/MobileCreateDropdown/MobileCreateDropdown';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Provider } from 'react-redux';

const meta = {
  title: 'mobile/MobileCreateDropdown',
  component: MobileCreateDropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Router>
            <Story />
          </Router>
        </ReactQueryProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof MobileCreateDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
