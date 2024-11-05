import { Meta, StoryObj } from '@storybook/react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';

const meta: Meta<typeof BalanceGameCreation> = {
  title: 'organisms/BalanceGameCreation',
  component: BalanceGameCreation,
  argTypes: {
    onTitleChange: { action: '제목이 수정됨' },
    onDescriptionChange: { action: '설명이 수정됨' },
    handleCompleteClick: { action: '완료 버튼이 클릭됨' },
    onDraftLoad: { action: '임시 저장 불러오기' },
    onStageChange: { action: '스테이지 이동' },
    onGamesUpdate: { action: '게임세트가 업데이트됨' },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceGameCreation>;

export const Default: Story = {
  args: {
    title: '',
    description: '',
    onTitleChange: (e) => console.log('제목이 바뀜:', e.target.value),
    onDescriptionChange: (e) => console.log('설명이 바뀜:', e.target.value),
    handleCompleteClick: () => console.log('완료 버튼 클릭'),
    onDraftLoad: () => console.log('임시 저장 불러오기 클릭'),
    onStageChange: (stage) => console.log('스테이지 바뀜:', stage),
    onGamesUpdate: (games) => console.log('게임이 저장됨:', games),
  },
};
