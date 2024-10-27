import { Id } from '@/types/api';

export const HTTP_STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const END_POINT = {
  // member API
  SIGN_UP: '/members/join',
  LOGIN: '/members/login',
  LOGOUT: '/members/logout',
  REFRESH: '/members/reissue',
  ALL_MEMBERS: '/members',
  MEMBER: (id: number) => `/members/${id}`,
  MEMBER_PROFILE: (id: number) => `/members/${id}/profile`,
  MEMBER_IMAGE: '/members/image',
  MEMBER_NICKNAME: '/members/nickname',
  MEMBER_PASSWORD: '/members/password',
  NICKNAME_VERIFY: '/members/duplicate',

  // email API
  EMAIL_VERIFY: '/email/verify',
  EMAIL_REQUEST: '/email/request',
  FIND_PW: '/email/password',

  // mypage API
  MYPAGE_POSTS: '/myPage/history/posts',
  MYPAGE_COMMENTS: '/myPage/history/comments',
  MYPAGE_VOTEDPOSTS: '/myPage/history/votedPosts',
  MYPAGE_BOOKMARKS: '/myPage/history/bookmarks',

  // mypages API
  MYPAGES_TALKS_WRITTEN: (page: number, size: number) =>
    `/my/talks/written?page=${page}&size=${size}`,
  MYPAGES_TALKS_VOTES: (page: number, size: number) =>
    `/my/talks/votes?page=${page}&size=${size}`,
  MYPAGES_TALKS_COMMENTS: (page: number, size: number) =>
    `/my/talks/comments?page=${page}&size=${size}`,
  MYPAGES_TALKS_BOOKMARKS: (page: number, size: number) =>
    `/my/talks/bookmarks?page=${page}&size=${size}`,
  MYPAGES_GAMES_WRITTEN: (page: number, size: number) =>
    `/my/games/written?page=${page}&size=${size}`,
  MYPAGES_GAMES_VOTES: (page: number, size: number) =>
    `/my/games/votes?page=${page}&size=${size}`,
  MYPAGES_GAMES_BOOKMARKS: (page: number, size: number) =>
    `/my/games/bookmarks?page=${page}&size=${size}`,

  // file API
  FILE_UPLOAD: '/images',
  FILE_DELETE: (storedName: string) => `/images/${storedName}`,

  // talk pick API
  TALKPICK: (talkPickId: Id) => `/talks/${talkPickId}`,
  CREATE_TALKPICK: '/talks',
  TALKPICK_LIST: '/talks',
  TALKPICK_SUMMARY: (talkPickId: Id) => `/talks/${talkPickId}/summary`,
  TODAY_TALKPICK: '/talks/today',
  TEMP_TALKPICK: '/talks/temp',
  BEST_TALKPICK: '/talks/best',

  // vote API
  VOTE_TALK: (talkPickId: Id) => `/votes/talks/${talkPickId}`,
  VOTE_GAME: (gameId: Id) => `/votes/games/${gameId}`,

  // comment API
  COMMENTS: (talkPickId: Id) => `/talks/${talkPickId}/comments`,
  BEST_COMMENT: (talkPickId: Id) => `talks/${talkPickId}/comments/best`,
  CREATE_COMMENT: (talkPickId: Id) => `/talks/${talkPickId}/comments`,
  EDIT_COMMENT: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}`,
  DELETE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `talks/${talkPickId}/comments/${commentId}`,
  LIKE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/likes/talks/${talkPickId}/comments/${commentId}`,
  DELETE_LIKE_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/likes/talks/${talkPickId}/comments/${commentId}`,
  CREATE_REPLY: (commentId: Id) => `talks/comments/${commentId}/replies`,

  // bookmark API
  BOOKMARK_TALKPICK: (talkPickId: Id) => `/bookmarks/talks/${talkPickId}`,
  BOOKMARK_GAME: (gameId: Id) => `/bookmarks/games/${gameId}`,

  // game API
  CREATE_GAME: '/games',
  NEW_GAME: '/games/new',
  BEST_GAME: '/games/best',
  LATEST_GAME: '/games/latest',
  GAME: (gameId: Id) => `/games/${gameId}`,
  EDIT_GAME: (gameId: Id) => `/games/${gameId}`,
  DELETE_GAME: (gameId: Id) => `/games/${gameId}`,

  // report API
  REPORT_COMMENT: (talkPickId: Id, commentId: Id) =>
    `/reports/talks/${talkPickId}/comments/${commentId}`,

  // notification API
  NOTIFICATON: 'notifications',
  READ_NOTIFICATION: (msgId: Id) => `/notifications/${msgId}/read`,
};

export const AXIOS = {
  TIMEOUT: 5000,
};
