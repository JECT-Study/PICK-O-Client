/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useMemberQuery } from '@/hooks/api/member/useMemberQuery';
import { CommentsPagination } from '@/types/comment';
import { generatePageNumbers } from '@/utils/pagination';
import ToastModal from '@/components/atoms/ToastModal/ToastModal';
import { COMMENT, NOTICE } from '@/constants/message';
import { useCreateCommentMutation } from '@/hooks/api/comment/useCreateCommentMutation';
import MobileCommentItem from '@/components/mobile/molecules/MobileCommentItem/MobileCommentItem';
import { CryEmoji } from '@/assets';
import * as S from './MobileCommentsSection.style';

export interface CommentsSectionProps {
  talkPickId: number;
  talkPickWriter: string;
  commentList?: CommentsPagination;
  selectedPage: number;
  voted: boolean;
}

const MobileCommentsSection = ({
  talkPickId,
  talkPickWriter,
  commentList,
  selectedPage,
  voted,
}: CommentsSectionProps) => {
  const { member } = useMemberQuery();
  const isMyTalkPick: boolean = talkPickWriter === member?.nickname;

  const totalPages = commentList?.totalPages ?? 0;
  const pages = generatePageNumbers(totalPages);

  return (
    <div css={S.commentsSectionContainer}>
      <div css={S.commentTopWrapper}>
        <span>댓글 {commentList?.totalElements ?? 0}</span>
      </div>
      <div css={S.loggedInBackground}>
        {!isMyTalkPick && !voted && (
          <div css={S.loggedOutBackground}>
            <div css={S.toastModalWrapper}>
              <ToastModal bgColor="black">{NOTICE.REQUIRED.VOTE}</ToastModal>
            </div>
          </div>
        )}
        {commentList?.totalElements === 0 ? (
          <div css={S.nonCommentsWrapper}>
            <span css={S.nonCommentsTopWrapper}>
              {COMMENT.NO_COMMENTS_YET}
              <CryEmoji />
            </span>
            <span>{COMMENT.FIRST_COMMENT_SUGGESTION}</span>
          </div>
        ) : (
          <div css={S.commentsWrapper}>
            {commentList?.content.map((commentData, idx) => (
              <MobileCommentItem
                idx={idx}
                totalElements={commentList.totalElements}
                key={commentData.id}
                comment={commentData}
                selectedPage={selectedPage}
                talkPickWriter={talkPickWriter}
              />
            ))}
          </div>
        )}
      </div>
      {/* <div css={S.paginationWrapper}>
        <Pagination
          pages={pages}
          selected={selectedPage}
          maxPage={totalPages}
          onChangeNavigate={handlePageChange}
        />
      </div> */}
    </div>
  );
};

export default MobileCommentsSection;
