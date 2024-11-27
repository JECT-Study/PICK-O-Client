/* eslint-disable no-console */
import React from 'react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import PostInputForm from '@/components/organisms/PostInputForm/PostInputForm';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'organisms/PostInputForm',
  component: PostInputForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
} satisfies Meta<typeof PostInputForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
