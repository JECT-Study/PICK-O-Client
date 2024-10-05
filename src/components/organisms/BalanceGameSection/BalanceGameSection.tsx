/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { BookmarkDF, BookmarkPR, NextArrow, PrevArrow, Share } from '@/assets';
import { GameDetail } from '@/types/game';
import Chips from '@/components/atoms/Chips/Chips';
import Divider from '@/components/atoms/Divider/Divider';
import { SubTag } from '@/components/atoms/SubTag/SubTag';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import GameStageBar from '@/components/atoms/GameStageBar/GameStageBar';
import InteractionButton from '@/components/atoms/InteractionButton/InteractionButton';
import BalanceGameBox from '@/components/molecules/BalanceGameBox/BalanceGameBox';
import * as S from './BalanceGameSection.style';

export interface BalanceGameSectionProps {
  game?: GameDetail[];
}

const defaultGameDetail: GameDetail = {
  id: 0,
  title: '',
  description: '',
  gameOptions: [],
  votesCountOfOptionA: 0,
  votesCountOfOptionB: 0,
  myBookmark: false,
  votedOption: null,
};

const BalanceGameSection = ({ game }: BalanceGameSectionProps) => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const currentGame: GameDetail = game?.[currentStage] ?? defaultGameDetail;

  const otherGameItem: MenuItem[] = [{ label: '신고' }];

  return (
    <div css={S.balanceGameStyling}>
      <div css={S.balanceGameContainer}>
        <div css={S.balanceGameWrapper}>
          <div css={S.balanceGameTitleWrapper}>
            <div css={S.balanceGameInfoWrapper}>
              <div css={S.titleWrapper}>
                <Chips variant="roundOutline">커플</Chips>
                <div css={S.balanceGameTitle}>{currentGame.title}</div>
              </div>
              <SubTag tag="연예인" />
            </div>
            <div css={S.balanceGameMenuWrapper}>
              <div css={S.textWrapper}>
                <span css={S.nicknameStyling}>닉네임593</span>
                <span css={S.dateStyling}>2024.07.10</span>
              </div>
              <MenuTap menuData={otherGameItem} />
            </div>
          </div>
          <div css={S.balanceGameSubTitle}>{currentGame.description}</div>
        </div>
        <Divider orientation="width" length={1095} />
        <BalanceGameBox
          options={currentGame.gameOptions}
          selectedOption={currentGame.votedOption}
        />
        <div css={S.stageBarWrapper}>
          <button
            type="button"
            css={[
              S.buttonStyling,
              S.getButtonStyling(false),
              S.getButtonVisibility(currentStage),
            ]}
            onClick={() => {
              setCurrentStage((stage) => (stage > 0 ? stage - 1 : stage));
            }}
          >
            <PrevArrow css={S.getIconStyling(false)} />
            이전 질문
          </button>
          <GameStageBar stage={currentStage} />
          <button
            type="button"
            css={[S.buttonStyling, S.getButtonStyling(true)]}
            onClick={() => {
              setCurrentStage((stage) => (stage < 9 ? stage + 1 : stage));
            }}
          >
            다음 질문
            <NextArrow css={S.getIconStyling(true)} />
          </button>
        </div>
      </div>
      <div css={S.buttonWrapper}>
        <InteractionButton
          buttonLabel="다른 사람들은 어떤 선택을 할까?"
          icon={<Share />}
          iconLabel="공유하기"
          onClick={() => {}}
        />
        <InteractionButton
          buttonLabel="이 게임 제법 폼이 좋아?"
          icon={currentGame.myBookmark ? <BookmarkPR /> : <BookmarkDF />}
          iconLabel="저장하기"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default BalanceGameSection;
