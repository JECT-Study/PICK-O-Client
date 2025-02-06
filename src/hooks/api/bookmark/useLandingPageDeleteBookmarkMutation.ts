import { deleteDoneGameBookmark } from '@/api/bookmarks';
import { useLandingPageBookmarkMutation } from './useLandingPageBookmarkMutation';

export const useLandingPageDeleteBookmarkMutation = (activeTab: string) => {
  return useLandingPageBookmarkMutation(
    activeTab,
    deleteDoneGameBookmark,
    false,
  );
};
