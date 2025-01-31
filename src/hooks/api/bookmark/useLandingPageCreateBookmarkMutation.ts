import { postDoneGameBookmark } from '@/api/bookmarks';
import { useLandingPageBookmarkMutation } from './useLandingPageBookmarkMutation';

export const useLandingPageCreateBookmarkMutation = (activeTab: string) => {
  return useLandingPageBookmarkMutation(activeTab, postDoneGameBookmark, true);
};
