/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import {
  AngleSmallUp,
  AngleSmallDown,
  MobileBookmarkDF,
  MobileBookmarkPR,
  MobileShare,
  PickIcon,
} from '@/assets';
import { useNavigate } from 'react-router-dom';
import { TalkPickDetail } from '@/types/talk-pick';
import { PATH } from '@/constants/path';
import { ERROR } from '@/constants/message';
import { formatDate, formatNumber } from '@/utils/formatData';
import Button from '@/components/atoms/Button/Button';
import SummaryBox from '@/components/mobile/molecules/SummaryBox/SummaryBox';
import ProfileIcon from '@/components/atoms/ProfileIcon/ProfileIcon';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import VoteToggle from '@/components/mobile/molecules/VoteToggle/VoteToggle';
import MenuTap, { MenuItem } from '@/components/atoms/MenuTap/MenuTap';
import TextModal from '@/components/mobile/molecules/TextModal/TextModal';
import ShareModal from '@/components/mobile/molecules/ShareModal/ShareModal';
import ReportModal from '@/components/mobile/molecules/ReportModal/ReportModal';
import { useCreateTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useCreateTalkPickBookmarkMutation';
import { useDeleteTalkPickBookmarkMutation } from '@/hooks/api/bookmark/useDeleteTalkPickBookmarkMutation';
import { useDeleteTalkPickMutation } from '@/hooks/api/talk-pick/useDeleteTalkPickMutation';
import useToastModal from '@/hooks/modal/useToastModal';
import * as S from './TalkPickSection.style';
import IconButton from '../../atoms/IconButton/IconButton';

export interface TalkPickProps {
  talkPick: TalkPickDetail;
  myTalkPick: boolean;
  isTodayTalkPick: boolean;
}

const TalkPickSection = ({
  talkPick,
  myTalkPick,
  isTodayTalkPick,
}: TalkPickProps) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isVisible, modalText, showToastModal } = useToastModal();

  const [activeModal, setActiveModal] = useState<
    'reportTalkPick' | 'reportText' | 'deleteText' | 'share' | 'none'
  >('none');

  const onCloseModal = () => {
    setActiveModal('none');
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
        navigate(`/${PATH.CREATE.TALK_PICK}`, { state: { talkPick } });
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

  return (
    <div css={S.talkPickStyling}>
      {isVisible && (
        <div css={S.toastModalStyling}>
          <ToastModal>{modalText}</ToastModal>
        </div>
      )}
      <div css={S.centerStyling}>
        <ShareModal
          isOpen={activeModal === 'share'}
          onConfirm={() => {}}
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
      <div css={S.talkPickTopWrapper}>
        <div css={S.talkPickTitle}>
          {isTodayTalkPick ? '오늘의 톡픽' : '톡픽'}
          <PickIcon />
        </div>
        <div css={S.buttonWrapper}>
          <IconButton
            icon={<MobileShare />}
            onClick={() => setActiveModal('share')}
          />
          <IconButton
            icon={
              talkPick?.myBookmark ? <MobileBookmarkPR /> : <MobileBookmarkDF />
            }
            onClick={handleBookmarkClick}
          />
        </div>
      </div>
      <div css={S.talkPickWrapper}>
        <div css={S.talkPickInfoWrapper}>
          <div css={S.talkPickInfoTopWrapper}>
            <div css={S.talkPickTitleStyling}>{talkPick?.baseFields.title}</div>
            <MenuTap
              menuData={myTalkPick ? myTalkPickItem : otherTalkPickItem}
            />
          </div>
          <div css={S.talkPickInfoBottomWrapper}>
            <div css={S.talkPickWriterInfoWrapper}>
              <ProfileIcon
                interaction={
                  talkPick?.writerProfileImgUrl ? 'custom' : 'default'
                }
                imgUrl={talkPick?.writerProfileImgUrl ?? ''}
                size="extraSmall"
              />
              <div css={S.talkPickWriterWrapper}>
                <div css={S.talkPickWriterStyling}>{talkPick?.writer}</div>
                <div css={S.talkPickDateStyling}>•</div>
                <div css={S.talkPickDateStyling}>
                  {formatDate(talkPick?.createdAt ?? '')}
                </div>
              </div>
            </div>
            <div css={S.talkPickViewStyling}>
              조회 <span>{formatNumber(talkPick?.views ?? '')}</span>
            </div>
          </div>
        </div>
        <div css={S.talkPickContentWrapper}>
          <SummaryBox
            summary={talkPick?.summary}
            summaryStatus={talkPick?.summaryStatus}
          />
          {isExpanded && (
            <div css={S.talkPickContent}>
              <div css={S.talkPickContentTextStyling}>
                {talkPick?.baseFields.content}
              </div>
              {talkPick?.imgUrls.length !== 0 && (
                <div css={S.talkPickImageWrapper}>
                  {talkPick?.imgUrls.map((url, idx) => (
                    <img src={url} alt={`image ${idx + 1}`} />
                  ))}
                </div>
              )}
            </div>
          )}
          <Button
            variant="outlineShadow"
            size="small"
            iconRight={isExpanded ? <AngleSmallUp /> : <AngleSmallDown />}
            css={S.contentBtnStyling}
            onClick={handleContentToggle}
          >
            {isExpanded ? '요약하기' : '전체 글 보기'}
          </Button>
        </div>
        <div css={S.voteToggleWrapper}>
          <VoteToggle
            talkPickId={talkPick?.id ?? 0}
            leftButtonText={talkPick?.baseFields.optionA ?? ''}
            rightButtonText={talkPick?.baseFields.optionB ?? ''}
            selectedVote={talkPick?.votedOption ?? null}
          />
        </div>
      </div>
    </div>
  );
};

export default TalkPickSection;
