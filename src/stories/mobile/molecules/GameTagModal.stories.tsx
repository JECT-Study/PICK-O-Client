/* eslint-disable no-console */
import GameTagModal from '@/components/mobile/molecules/GameTagModal/GameTagModal';
import { BalanceGame } from '@/types/game';
import { createInitialGameStages } from '@/utils/balanceGameUtils';
import type { Meta, StoryObj } from '@storybook/react';

const defaultGameOptions = createInitialGameStages(10);
const exampleGame: BalanceGame = {
  title: 'title',
  mainTag: 'mainTag',
  subTag: 'subTag',
  games: defaultGameOptions,
};

const meta = {
  title: 'mobile/molecules/GameTagModal',
  component: GameTagModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    form: exampleGame,
    setMainTagValue: () => {},
    setSubTagValue: () => {},
    submitGame: () => {},
  },
} satisfies Meta<typeof GameTagModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
