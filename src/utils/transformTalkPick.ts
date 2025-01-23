import {
  BookmarkInfoItemResponse,
  MyContentItem,
  WrittenInfoItemResponse,
} from '@/types/mypages';

export const transformBookmarkItem = (
  item: BookmarkInfoItemResponse,
): MyContentItem => {
  return {
    id: item.id,
    title: item.title,
    bookmarks: item.bookmarks,
    commentCount: item.commentCount,
    editedAt: item.editedAt,
    bookmarked: item.bookmarked,
    showBookmark: true,
  };
};

export const transformWrittenItem = (
  item: WrittenInfoItemResponse,
): MyContentItem => {
  return {
    id: item.id,
    title: item.title,
    bookmarks: item.bookmarks,
    commentCount: item.commentCount,
    editedAt: item.editedAt,
    bookmarked: item.bookmarked,
    showBookmark: false,
  };
};

// export const transformVoteItem = (
//   item: VoteInfoItemResponse,
// ): MyContentItem => {
//   return {
//     id: item.id,
//     title: item.title,
//     bookmarks: item.bookmarks,
//     commentCount: item.commentCount,
//     editedAt: item.editedAt,
//     bookmarked: item.bookmarked,
//     showBookmark: false,
//   };
// };
