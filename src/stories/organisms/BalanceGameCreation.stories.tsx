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
    handleCompleteClick: { action: '완료 클릭' },
    onDraftLoad: { action: '임시 저장 로드' },
    onGamesUpdate: { action: '게임 세트 업데이트' },
    onImageChange: { action: '이미지 변경' },
    onImageDelete: { action: '이미지 삭제' },
  },
};

export default meta;

type Story = StoryObj<typeof BalanceGameCreation>;

export const Default: Story = {
  args: {
    title: '밸런스 게임 제목',
    onTitleChange: () => {},
    handleCompleteClick: () => {},
    onDraftLoad: () => {},
    onGamesUpdate: () => {},
    onImageChange: () => {},
    onImageDelete: () => {},
  },
};
