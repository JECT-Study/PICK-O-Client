import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameCreation from '@/components/organisms/BalanceGameCreation/BalanceGameCreation';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { BalanceGameSet } from '@/types/game';

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
    onGamesChange: { action: '게임 세트 업데이트' },
    onImageChange: { action: '이미지 변경' },
    onImageDelete: { action: '이미지 삭제' },
    handleTagEditClick: { action: '태그 수정 클릭' },
  },
};

export default meta;

type Story = StoryObj<typeof BalanceGameCreation>;

const dummyGames: BalanceGameSet[] = [
  {
    description: '첫 번째 스테이지 설명',
    gameOptions: [
      { id: 1, name: '옵션 A', imgUrl: '', description: '', optionType: 'A' },
      { id: 2, name: '옵션 B', imgUrl: '', description: '', optionType: 'B' },
    ],
  },
  {
    description: '두 번째 스테이지 설명',
    gameOptions: [
      { id: 3, name: '옵션 A2', imgUrl: '', description: '', optionType: 'A' },
      { id: 4, name: '옵션 B2', imgUrl: '', description: '', optionType: 'B' },
    ],
  },
];

export const All: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <h3>일반 생성</h3>
        <BalanceGameCreation
          {...args}
          onDraftLoad={() => alert('임시저장 불러오기 클릭')}
          handleTagEditClick={undefined}
        />
      </div>
      <div css={storyInnerContainer}>
        <h3>수정 시</h3>
        <BalanceGameCreation
          {...args}
          onDraftLoad={undefined}
          handleTagEditClick={() => alert('태그 수정 클릭')}
        />
      </div>
    </div>
  ),
  args: {
    title: '밸런스 게임 제목',
    onTitleChange: () => {},
    handleCompleteClick: () => {},
    onGamesChange: () => {},
    onImageChange: async () => true,
    onImageDelete: () => {},
    games: dummyGames,
  },
};
