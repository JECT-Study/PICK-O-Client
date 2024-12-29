import React from 'react';
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
import * as S from './IconButtonArea.style';

export interface IconButtonAreaProps {
  activeTab: 'talkPick' | 'balanceGame';
  onButtonClick: (id: string) => void;
  activeButton: string | null;
}

const IconButtonArea = ({
  activeTab,
  onButtonClick,
  activeButton,
}: IconButtonAreaProps) => {
  const allButtons = [
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

  const filteredButtons = allButtons.filter(({ showIn }) =>
    showIn.includes(activeTab),
  );

  return (
    <div css={S.iconButtonArea(activeTab)}>
      {filteredButtons.map(({ id, label, activeIcon, inactiveIcon }) => (
        <IconButton
          key={id}
          activeIcon={activeIcon}
          inactiveIcon={inactiveIcon}
          label={label[activeTab]}
          isActive={activeButton === id}
          onClick={() => onButtonClick(id)}
        />
      ))}
    </div>
  );
};

export default IconButtonArea;
