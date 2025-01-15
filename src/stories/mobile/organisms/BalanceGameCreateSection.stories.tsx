import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import BalanceGameCreateSection from '@/components/mobile/organisms/BalanceGameCreateSection/BalanceGameCreateSection';

const meta = {
  title: 'mobile/organisms/BalanceGameCreateSection',
  component: BalanceGameCreateSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
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
} satisfies Meta<typeof BalanceGameCreateSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
