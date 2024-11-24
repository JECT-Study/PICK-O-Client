/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  AngleSmallUp,
  AngleSmallDown,
  BookmarkRR,
  BookmarkSR,
  Share,
} from '@/assets';
import { useNavigate } from 'react-router-dom';
import { TalkPickDetail } from '@/types/talk-pick';
import { ERROR, SUCCESS } from '@/constants/message';
import { formatDate, formatNumber } from '@/utils/formatData';
import Button from '@/components/atoms/Button/Button';
import SummaryBox from '@/components/molecules/SummaryBox/SummaryBox';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import VotePrototype from '@/components/molecules/VotePrototype/VotePrototype';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import TextModal from '@/components/molecules/TextModal/TextModal';
import ShareModal from '@/components/molecules/ShareModal/ShareModal';
import ReportModal from '@/components/molecules/ReportModal/ReportModal';
import { useCreateTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useCreateTalkPickBookmarkMutation';
import { useDeleteTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useDeleteTalkPickBookmarkMutation';
import { useDeleteTalkPickMutation } from '@/hooks/api/talk-pick/useDeleteTalkPickMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './TalkPickSection.style';

export interface TalkPickProps {
  talkPick?: TalkPickDetail;
  myTalkPick: boolean;
  isTodayTalkPick: boolean;
}

const TalkPickSection = ({
  talkPick,
  myTalkPick,
  isTodayTalkPick,
}: TalkPickProps) => {
  const currentURL: string = window.location.href;
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [activeModal, setActiveModal] = useState<
    'reportTalkPick' | 'reportText' | 'deleteText' | 'share' | 'none'
  >('none');

  const onCloseModal = () => {
    setActiveModal('none');
  };

  const copyTalkPickLink = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log('톡픽 링크 복사 완료!');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { mutate: createBookmark } = useCreateTalkPickBookmarkMutation(
    talkPick?.id ?? 0,
  );

  const { mutate: deleteBookmark } = useDeleteTalkPickBookmarkMutation(
    talkPick?.id ?? 0,
  );

  const handleBookmarkClick = () => {
    if (!talkPick) return;

    if (myTalkPick) {
      showToastModal(ERROR.BOOKMARK.MY_TALKPICK);
      return;
    }

    if (talkPick.myBookmark) {
      deleteBookmark();
    } else {
      createBookmark();
    }
  };

  const handleContentToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const myTalkPickItem: MenuItem[] = [
    {
      label: '수정',
      onClick: () => {
        navigate('/post/create', { state: { talkPick } });
      },
    },
    {
      label: '삭제',
      onClick: () => {
        setActiveModal('deleteText');
      },
    },
  ];
  const otherTalkPickItem: MenuItem[] = [
    {
      label: '신고',
      onClick: () => {
        setActiveModal('reportText');
      },
    },
  ];

  const { mutate: deleteTalkPick } = useDeleteTalkPickMutation(
    talkPick?.id ?? 0,
  );

  const handleDeleteButton = () => {
    deleteTalkPick();
    onCloseModal();
  };

  const handleCopyButton = (link: string) => {
    copyTalkPickLink(link);
    onCloseModal();
    showToastModal(SUCCESS.COPY.LINK);
  };

  return (
    <div css={S.todayTalkPickStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          link={currentURL}
          isOpen={activeModal === 'share'}
          onConfirm={() => handleCopyButton(currentURL)}
          onClose={onCloseModal}
        />
        <TextModal
          text="해당 게시글을 삭제하시겠습니까?"
          isOpen={activeModal === 'deleteText'}
          onConfirm={handleDeleteButton}
          onClose={onCloseModal}
        />
        <TextModal
          text="해당 게시글을 신고하시겠습니까?"
          isOpen={activeModal === 'reportText'}
          onConfirm={() => {
            setActiveModal('reportTalkPick');
          }}
          onClose={onCloseModal}
        />
        <ReportModal
          isOpen={activeModal === 'reportTalkPick'}
          onConfirm={() => {}}
          onClose={onCloseModal}
        />
      </div>
      <div css={S.talkPickTitle}> {isTodayTalkPick && '오늘의 톡픽'}</div>
      <div css={S.talkPickWrapper}>
        <div css={S.talkPickTopStyling}>
          <div css={S.talkPickDetailWrapper}>
            <div css={S.talkPickTitle}>{talkPick?.baseFields.title}</div>
            <MenuTap
              menuData={myTalkPick ? myTalkPickItem : otherTalkPickItem}
            />
          </div>
          <div css={S.talkPickDetailWrapper}>
            <div>
              <span css={S.talkPickDetail}>{talkPick?.writer}</span>
              <span css={S.talkPickDate}>
                {formatDate(talkPick?.createdAt ?? '')}
              </span>
              {talkPick?.isEdited && (
                <span css={S.talkPickDetail}>(수정됨)</span>
              )}
            </div>
            <div css={S.talkPickDetail}>
              조회
              <span css={S.talkPickView}>
                {formatNumber(talkPick?.views ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div css={S.talkPickContentWrapper}>
          <SummaryBox summary={talkPick?.summary} />
          {isExpanded && (
            <div css={S.talkPickContent}>
              <p>{talkPick?.baseFields.content}</p>
              {talkPick?.imgUrls.length !== 0 && (
                <div css={S.talkPickImageWrapper}>
                  {talkPick?.imgUrls.map((url, idx) => (
                    <img src={url} key={url} alt={`image ${idx + 1}`} />
                  ))}
                </div>
              )}
            </div>
          )}
          <Button
            variant="outlineShadow"
            size="large"
            iconRight={isExpanded ? <AngleSmallUp /> : <AngleSmallDown />}
            css={S.contentBtnStyling}
            onClick={handleContentToggle}
          >
            {isExpanded ? '요약하기' : '전체 글 보기'}
          </Button>
        </div>
        <div css={S.voteBarWrapper}>
          <VotePrototype
            talkPickId={talkPick?.id ?? 3}
            leftButtonText={talkPick?.baseFields.optionA ?? ''}
            rightButtonText={talkPick?.baseFields.optionB ?? ''}
            leftVotes={talkPick?.votesCountOfOptionA ?? 0}
            rightVotes={talkPick?.votesCountOfOptionB ?? 0}
            selectedVote={talkPick?.votedOption ?? null}
          />
        </div>
      </div>
      <div css={S.talkPickBtnWrapper}>
        <Button
          variant="outlineShadow"
          size="medium"
          iconLeft={talkPick?.myBookmark ? <BookmarkSR /> : <BookmarkRR />}
          onClick={handleBookmarkClick}
        >
          {talkPick?.bookmarks}
        </Button>
        <Button
          variant="outlineShadow"
          size="medium"
          iconLeft={<Share />}
          css={S.shareBtnStyling}
          onClick={() => {
            setActiveModal('share');
          }}
        >
          공유하기
        </Button>
      </div>
    </div>
  );
};

export default TalkPickSection;
