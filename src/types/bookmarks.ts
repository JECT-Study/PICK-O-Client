import { GameContent } from '@/types/game';
import { MyContentItem } from '@/components/organisms/MyContentList/MyContentList';
import { MyBalanceGameItem } from '@/components/organisms/MyBalanceGameList/MyBalanceGameList';
import { InfoItem } from '@/components/organisms/InfoList/InfoList';

/**
 * 여러 배열 타입을 “유니온”으로 묶어서,
 * 낙관적 업데이트 컨텍스트에서 어떤 리스트든 저장 가능.
 */
export type BookmarkData =
  | GameContent[]
  | MyContentItem[]
  | MyBalanceGameItem[]
  | InfoItem[];

/**
 * 확장성 있는 Record:
 *  key = string (예: 'bestGames', 'latestGames', 'myBookmarks', 'gameVotes', 등)
 *  value = BookmarkData | undefined
 */
export interface BookmarkContext
  extends Record<string, BookmarkData | undefined> {}
