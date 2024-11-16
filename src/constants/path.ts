export const PATH = {
  LOGIN: 'login',
  PW: 'findPassword',
  SIGN_UP: 'signup',
  MYPAGE: 'mypage',
  SEARCH: {
    MAIN: 'search/all',
    ALL: 'search/all',
    TALKPICK: 'search/talkpick',
    GAME: 'search/game',
  },
  HISTORY: {
    MAIN: 'history',
    POSTS: 'posts',
    COMMENTS: 'comments',
    VOTED_POSTS: 'votedPosts',
    BOOKMARKS: 'bookMarks',
  },
  UPDATE: 'update',
  DELETE: 'delete',
  CREATE: {
    TALK_PICK: 'talkpick/create',
    GAME: 'balancegame/create',
  },
} as const;
