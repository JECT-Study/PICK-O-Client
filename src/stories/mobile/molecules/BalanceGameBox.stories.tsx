import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { GameOption } from '@/types/game';
import BalanceGameBox from '@/components/mobile/molecules/BalanceGameBox/BalanceGameBox';
import { SampleWhole } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const exampleOptions: GameOption[] = [
  {
    id: 0,
    name: '제목은글자제한30자제목은글자제한30자제목은글자제한30자',
    imgUrl: SampleWhole,
    description:
      '상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50',
    optionType: 'A',
  },
  {
    id: 0,
    name: '제목은글자제한30자제목은글자제한30자제목은글자제한30자',
    imgUrl: SampleWhole,
    description:
      '상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50상황설명글자제한50',
    optionType: 'B',
  },
];

const meta = {
  title: 'mobile/molecules/BalanceGameBox',
  component: BalanceGameBox,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#f1f1f1',
        },
      ],
    },
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
    handleGuestGameVote: () => {},
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
    </ul>
  ),
};
