import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';

const meta: Meta<typeof BalanceGameCreation> = {
  title: 'organisms/BalanceGameCreation',
  component: BalanceGameCreation,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onTitleChange: { action: '제목 수정' },
    onDescriptionChange: { action: '설명 수정' },
    handleCompleteClick: { action: '완료 클릭' },
    onDraftLoad: { action: '임시 저장 로드' },
    onStageChange: { action: '스테이지 변경' },
    onGamesUpdate: { action: '게임 세트 업데이트' },
    onImageChange: { action: '이미지 변경' },
  },
};

export default meta;

type Story = StoryObj<typeof BalanceGameCreation>;

export const Default: Story = {
  args: {
    title: '밸런스 게임 제목',
    description: '밸런스 게임 설명',
    onTitleChange: (e) => console.log('제목 변경:', e.target.value),
    onDescriptionChange: (desc) => console.log('설명 변경:', desc),
    handleCompleteClick: () => console.log('게임 완료'),
    onDraftLoad: () => console.log('임시 저장 로드'),
    onStageChange: (stage) => console.log('스테이지 변경:', stage),
    onGamesUpdate: (games) => console.log('게임 세트 업데이트:', games),
    onImageChange: (stageIndex, optionIndex, file) =>
      console.log('이미지 변경:', { stageIndex, optionIndex, file }),
  },
};
