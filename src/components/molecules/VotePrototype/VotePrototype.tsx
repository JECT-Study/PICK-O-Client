import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTICE } from '@/constants/message';
import { PATH } from '@/constants/path';
import { VoteOption, MyVoteOption } from '@/types/vote';
import Button from '@/components/atoms/Button/Button';
import VoteBar from '@/components/atoms/VoteBar/VoteBar';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { useNewSelector } from '@/store';
import { selectAccessToken } from '@/store/auth';
import { useCreateTalkPickVoteMutation } from '@/hooks/api/vote/useCreateTalkPickVoteMutation';
import { useEditTalkPickVoteMutation } from '@/hooks/api/vote/useEditTalkPickVoteMutation';
import { useDeleteTalkPickVoteMutation } from '@/hooks/api/vote/useDeleteTalkPickVoteMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './VotePrototype.style';

interface VotePrototypeProps {
  talkPickId: number;
  leftButtonText: string;
  rightButtonText: string;
  leftVotes: number;
  rightVotes: number;
  selectedVote: MyVoteOption;
}

const VotePrototype: React.FC<VotePrototypeProps> = ({
  talkPickId,
  leftButtonText,
  rightButtonText,
  leftVotes,
  rightVotes,
  selectedVote,
}) => {
  const navigate = useNavigate();
  const accessToken = useNewSelector(selectAccessToken);
  const [loggedOutVoteOption, setLoggedOutVoteOption] =
    useState<MyVoteOption>(null);

  const totalVotes: number = leftVotes + rightVotes;
  const leftPercentage: string = ((leftVotes / totalVotes) * 100).toFixed(1);
  const rightPercentage: string = ((rightVotes / totalVotes) * 100).toFixed(1);
  const currnetOption: MyVoteOption = accessToken
    ? selectedVote
    : loggedOutVoteOption;

  const { isVisible, modalText, showToastModal } = useToastModal();

  const { mutate: createTalkPickVote } =
    useCreateTalkPickVoteMutation(talkPickId);

  const { mutate: editTalkPickVote } = useEditTalkPickVoteMutation(talkPickId);

  const { mutate: deleteTalkPickVote } =
    useDeleteTalkPickVoteMutation(talkPickId);

  useEffect(() => {
    if (!accessToken) {
      const savedVote = localStorage.getItem(`talkpick_${talkPickId}`);

      if (savedVote === 'A' || savedVote === 'B') {
        setLoggedOutVoteOption(savedVote);
      }
    }
  }, [accessToken, talkPickId]);

  const handleLoggedOutTalkPickVote = (voteOption: VoteOption) => {
    if (loggedOutVoteOption === voteOption) {
      setLoggedOutVoteOption(null);
      localStorage.removeItem(`talkpick_${talkPickId}`);
    } else {
      setLoggedOutVoteOption(voteOption);
      localStorage.setItem(`talkpick_${talkPickId}`, voteOption);

      showToastModal(NOTICE.REQUIRED.LOGIN, () => {
        navigate(`/${PATH.LOGIN}`, { state: { talkPickId } });
      });
    }
  };

  const handleTalkPickVote = (
    selectedOption: MyVoteOption,
    voteOption: VoteOption,
  ) => {
    if (selectedOption === null) {
      createTalkPickVote(voteOption);
    } else if (selectedOption === voteOption) {
      deleteTalkPickVote();
    } else {
      editTalkPickVote(voteOption);
    }
  };

  const handleVoteButtonClick = (voteOption: VoteOption) => {
    if (accessToken) {
      handleTalkPickVote(selectedVote, voteOption);
    } else {
      handleLoggedOutTalkPickVote(voteOption);
    }
  };

  return (
    <div css={S.votePrototypeStyle}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.buttonContainerStyle}>
        <Button
          variant="outlineHighlightR"
          size="large"
          onClick={() => {
            handleVoteButtonClick('A');
          }}
          css={S.getButtonStyle('A', currnetOption)}
        >
          {leftButtonText}
        </Button>
        <div css={S.voteTextStyle}>VS</div>
        <Button
          variant="outlineHighlightB"
          size="large"
          onClick={() => {
            handleVoteButtonClick('B');
          }}
          css={S.getButtonStyle('B', currnetOption)}
        >
          {rightButtonText}
        </Button>
      </div>
      <VoteBar
        leftPercentage={parseFloat(leftPercentage)}
        rightPercentage={parseFloat(rightPercentage)}
        leftVotes={leftVotes}
        rightVotes={rightVotes}
        selectedBar={selectedVote}
      />
      {!accessToken && <div css={S.loggedOutContainerStyling} />}
    </div>
  );
};

export default VotePrototype;
