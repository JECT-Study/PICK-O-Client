import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import BalanceGameEndingSection from '@/components/organisms/BalanceGameEndingSection/BalanceGameEndingSection';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof BalanceGameEndingSection> = {
  title: 'organisms/BalanceGameEndingSection',
  component: BalanceGameEndingSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: '결정사 상대방 고르기',
    gameSetId: 0,
    isMyEndBookmark: false,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <BalanceGameEndingSection {...args} />
      </div>
    </div>
  ),
};
