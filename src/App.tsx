import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import { useTokenRefresh } from './hooks/common/useTokenRefresh';
import { Layout, LayoutMypage, LayoutNoSearch } from './layout/layout';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DeletePage from './pages/MyPage/DeletePage/DeletePage';
import HistoryPage from './pages/MyPage/HistoryPage/HistoryPage';
import BookmarksPage from './pages/MyPage/HistoryPage/TabPage/BookmarksPage/BookmarksPage';
import CommentsPage from './pages/MyPage/HistoryPage/TabPage/CommentsPage';
import PostsPage from './pages/MyPage/HistoryPage/TabPage/PostsPage';
import VotedPostsPage from './pages/MyPage/HistoryPage/TabPage/VotedPostsPage';
import UpdatePage from './pages/MyPage/UpdatePage/UpdatePage';
import PostList from './pages/PostListPage/PostListPage';
import PostPage from './pages/PostPage/PostPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ReactQueryProvider from './providers/ReactQueryProvider';

const App: React.FC = () => {
  useTokenRefresh();
  return (
    <ReactQueryProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="posts" element={<PostList />} />
            <Route path="post/create" element={<CreatePostPage />} />
            <Route path="posts/:id" element={<PostPage />} />
          </Route>

          <Route element={<LayoutNoSearch />}>
            <Route path={PATH.LOGIN} element={<LoginPage />} />
            <Route path={PATH.PW} element={<FindPasswordPage />} />
            <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
          </Route>

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
        </Routes>
      </LocalizationProvider>
    </ReactQueryProvider>
  );
};

export default App;
