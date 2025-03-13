import React, { ReactElement } from 'react';
import IconButton from '@/components/mobile/molecules/IconButton/IconButton';
import {
  IcMobileBookmark,
  IcMobileBookmarkDF,
  IcMobileComment,
  IcMobileCommentDF,
  IcMobileVote,
  IcMobileVoteDF,
  IcMobileWritten,
  IcMobileWrittenDF,
} from '@/assets';
import { ButtonType, TabType } from '@/types/mypages';
import * as S from './IconButtonArea.style';

export interface IconButtonConfig {
  id: ButtonType;
  label: Record<TabType, string>;
  activeIcon: ReactElement;
  inactiveIcon: ReactElement;
  showIn: TabType[];
}

export interface IconButtonAreaProps {
  activeTab: TabType;
  activeButton: ButtonType | null;
  onButtonClick: (id: ButtonType) => void;
}

const allButtons: IconButtonConfig[] = [
  {
    id: 'saved',
    label: { talkPick: '내가 저장한', balanceGame: '내가 저장한' },
    activeIcon: <IcMobileBookmark />,
    inactiveIcon: <IcMobileBookmarkDF />,
    showIn: ['talkPick', 'balanceGame'],
  },
  {
    id: 'voted',
    label: { talkPick: '내가 투표한', balanceGame: '내가 투표한' },
    activeIcon: <IcMobileVote />,
    inactiveIcon: <IcMobileVoteDF />,
    showIn: ['talkPick', 'balanceGame'],
  },
  {
    id: 'commented',
    label: { talkPick: '내가 댓글 단', balanceGame: '' },
    activeIcon: <IcMobileComment />,
    inactiveIcon: <IcMobileCommentDF />,
    showIn: ['talkPick'],
  },
  {
    id: 'created',
    label: { talkPick: '내가 작성한', balanceGame: '내가 만든' },
    activeIcon: <IcMobileWritten />,
    inactiveIcon: <IcMobileWrittenDF />,
    showIn: ['talkPick', 'balanceGame'],
  },
];

const IconButtonArea = ({
  activeTab,
  onButtonClick,
  activeButton,
}: IconButtonAreaProps) => {
  const filteredButtons = allButtons.filter(({ showIn }) =>
    showIn.includes(activeTab),
  );

  return (
    <div css={S.iconButtonArea(activeTab)}>
      {filteredButtons.map(({ id, label, activeIcon, inactiveIcon }) => {
        const isActive = activeButton === id;
        return (
          <IconButton
            key={id}
            activeIcon={activeIcon}
            inactiveIcon={inactiveIcon}
            label={label[activeTab]}
            isActive={isActive}
            onClick={() => onButtonClick(id)}
          />
        );
      })}
    </div>
  );
};

export default IconButtonArea;
