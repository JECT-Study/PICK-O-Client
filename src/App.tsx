/* eslint-disable @typescript-eslint/no-unused-vars */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyPage from '@/pages/MyPage/MyPage';
// import NotAuthRoutes from './components/Routes/NotAuthRoutes';
// import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { PATH } from './constants/path';
import { useMemberQuery } from './hooks/api/member/useMemberQuery';
import { useParseJwt } from './hooks/common/useParseJwt';
import { useTokenRefresh } from './hooks/common/useTokenRefresh';
import { Layout, LayoutMypage, LayoutNoSearch } from './layout/layout';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
// import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import TalkPickPage from './pages/TalkPickPage/TalkPickPage';
// import DeletePage from './pages/MyPage/DeletePage/DeletePage';
// import HistoryPage from './pages/MyPage/HistoryPage/HistoryPage';
// import BookmarksPage from './pages/MyPage/HistoryPage/TabPage/BookmarksPage/BookmarksPage';
// import CommentsPage from './pages/MyPage/HistoryPage/TabPage/CommentsPage';
// import PostsPage from './pages/MyPage/HistoryPage/TabPage/PostsPage';
// import VotedPostsPage from './pages/MyPage/HistoryPage/TabPage/VotedPostsPage';
// import UpdatePage from './pages/MyPage/UpdatePage/UpdatePage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import PostList from './pages/PostListPage/PostListPage';
// import PostPage from './pages/PostPage/PostPage';
// import SearchResultPage from './pages/SearchResultPage/SearchResultPage';
// import SignUpPage from './pages/SignUpPage/SignUpPage';
import { useNewSelector } from './store';
import { selectAccessToken } from './store/auth';
import TalkPickPlacePage from './pages/TalkPickPlacePage/TalkPickPlacePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import BalanceGamePage from './pages/BalanceGamePage/BalanceGamePage';

const App: React.FC = () => {
  const accessToken = useNewSelector(selectAccessToken);
  const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  useTokenRefresh();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todaytalkpick" element={<TalkPickPage />} />
          <Route path="/talkpick/:talkPickId" element={<TalkPickPage />} />
          <Route path="/talkpickplace" element={<TalkPickPlacePage />} />
          <Route path="/post/create" element={<CreatePostPage />} />
          <Route path="/balancegame/:setId" element={<BalanceGamePage />} />
          {/* <Route path="posts" element={<PostList />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="searchResult" element={<SearchResultPage />} />
          <Route element={<ProtectedRoutes member={member} />}>
            <Route path="post/create" element={<CreatePostPage />} />
          </Route> */}
        </Route>
        <Route path="/mypage" element={<LayoutMypage />}>
          <Route index element={<MyPage />} />
        </Route>
        {/* <Route element={<NotAuthRoutes member={member} />}>
          <Route element={<LayoutNoSearch />}>
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.PW} element={<FindPasswordPage />} />
            <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes member={member} />}>
          <Route path={PATH.MYPAGE} element={<LayoutMypage />}>
            <Route path={PATH.HISTORY.MAIN} element={<HistoryPage />}>
              <Route path={PATH.HISTORY.POSTS} element={<PostsPage />} />
              <Route path={PATH.HISTORY.COMMENTS} element={<CommentsPage />} />
              <Route
                path={PATH.HISTORY.VOTED_POSTS}
                element={<VotedPostsPage />}
              />
              <Route
                path={PATH.HISTORY.BOOKMARKS}
                element={<BookmarksPage />}
              />
            </Route>
            <Route path={PATH.UPDATE} element={<UpdatePage />} />
            <Route path={PATH.DELETE} element={<DeletePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </LocalizationProvider>
  );
};

export default App;
