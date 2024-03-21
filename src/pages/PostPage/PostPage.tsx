import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoginModal from '@/components/common/Modal/LoginModal';
import BalanceOptionCardsSection from './BalanceOptionCardsSection/BalanceOptionCardsSection';
import CommentsSection from './CommentsSection/CommentsSection';
import { getPost } from '../../api/posts/posts';
import CreatorSection from './CreatorSection/CreatorSection';
import UserUtilitySection from './UserUtilitySection/UserUtilitySection';
import TitleSection from './TitleSection/TitleSection';
import { NPost } from '../../types/post';
import {
  ButtonSectionWrapper,
  ButtonStyleWrapper,
  PostPageWrapper,
  UserSectionWrapper,
} from './PostPage.style';

const PostPage = () => {
  const postId = Number(useParams().id);
  const [isOpened, setIsOpened] = useState(false);
  const { isLoading, data: post } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPost(postId),
    select: (data: { data: NPost }) => data?.data,
  });

  const [IsLoginModalOpen, setIsLoginModalOpoen] = useState(true);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div css={PostPageWrapper}>
      <TitleSection
        title={post?.title || 'title'}
        views={post?.views || 0}
        likesCount={post?.likesCount || 0}
        postTags={post?.postTags || []}
        totalVoteCount={post?.totalVoteCount || 0}
      />
      <BalanceOptionCardsSection
        id={post?.id || 0}
        balanceOptions={post?.balanceOptions || []}
        selectedOptionId={post?.selectedOptionId}
      />

      <div css={UserSectionWrapper}>
        {post && (
          <CreatorSection
            createdBy={post?.createdBy}
            createdAt={post?.createdAt}
          />
        )}
        <UserUtilitySection
          likesCount={post?.likesCount || 0}
          myBookmark={post?.myBookmark || false}
          myLike={post?.myLike || false}
        />
      </div>

      <div css={ButtonSectionWrapper}>
        <button
          css={ButtonStyleWrapper}
          type="button"
          onClick={() => setIsOpened(!isOpened)}
        >
          {`댓글 ${isOpened ? '접기' : '확인하기'}`}
        </button>
      </div>
      {isOpened && (
        <CommentsSection
          postId={postId}
          selectedOptionId={post?.selectedOptionId}
        />
      )}
      {IsLoginModalOpen && (
        <LoginModal handleModal={setIsLoginModalOpoen} postId={postId} />
      )}
    </div>
  );
};

export default PostPage;
