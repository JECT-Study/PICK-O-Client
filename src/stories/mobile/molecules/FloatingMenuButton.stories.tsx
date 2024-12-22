import React from 'react';
import store from '@/store';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FloatingMenuButton from '@/components/mobile/molecules/FloatingMenuButton/FloatingMenuButton';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Provider } from 'react-redux';

const meta = {
  title: 'mobile/molecules/FloatingMenuButton',
  component: FloatingMenuButton,
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
} satisfies Meta<typeof FloatingMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
