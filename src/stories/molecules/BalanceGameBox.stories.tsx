import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { GameOption } from '@/types/game';
import BalanceGameBox from '@/components/molecules/BalanceGameBox/BalanceGameBox';
import { SampleWhole } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const exampleOptions: GameOption[] = [
  {
    id: 0,
    name: '1000억 부자 유병재',
    imgUrl: SampleWhole,
    description: '어쩌고 저쩌고 저쩌고 어쩌고저쩌고 더미글',
    optionType: 'A',
  },
  {
    id: 0,
    name: '1000억 빚 거지 차은우',
    imgUrl: SampleWhole,
    description: '어쩌고 저쩌고 저쩌고 어쩌고저쩌고 더미글',
    optionType: 'B',
  },
];

const exampleTextImageOptions: GameOption[] = [
  {
    id: 0,
    name: '1000억 부자 유병재',
    imgUrl: null,
    description: '어쩌고 저쩌고 저쩌고 어쩌고저쩌고 더미글',
    optionType: 'A',
  },
  {
    id: 0,
    name: '1000억 빚 거지 차은우',
    imgUrl: null,
    description: '어쩌고 저쩌고 저쩌고 어쩌고저쩌고 더미글',
    optionType: 'B',
  },
];

const meta = {
  title: 'molecules/BalanceGameBox',
  component: BalanceGameBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedVote: {
      options: ['A', 'B', null],
      control: { type: 'radio' },
    },
  },
  args: {
    gameSetId: 0,
    gameId: 0,
    options: exampleOptions,
    selectedVote: null,
    handleNextStage: () => {},
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
} satisfies Meta<typeof BalanceGameBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>not selected</h3>
        <BalanceGameBox {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>A selected</h3>
        <BalanceGameBox {...args} selectedVote="A" />
      </li>
      <li css={storyInnerContainer}>
        <h3>B selected</h3>
        <BalanceGameBox {...args} selectedVote="B" />
      </li>
      <li css={storyInnerContainer}>
        <h3>No Image</h3>
        <BalanceGameBox
          {...args}
          options={exampleTextImageOptions}
          selectedVote={null}
        />
      </li>
    </ul>
  ),
};
