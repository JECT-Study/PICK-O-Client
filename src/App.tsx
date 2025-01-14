/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { Route, Routes } from 'react-router-dom';
import MyPage from '@/pages/MyPage/MyPage';
import SearchGamePage from '@/pages/SearchResultsPage/SearchGamePage';
import SearchTalkPickPage from '@/pages/SearchResultsPage/SearchTalkPickPage';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { PATH } from './constants/path';
import { useTokenRefresh } from './hooks/common/useTokenRefresh';
import { Layout, LayoutNoFooter } from './layout/layout';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChangeUserInfoPage from './pages/ChangeUserInfoPage/ChangeUserInfoPage';
import TalkPickPage from './pages/TalkPickPage/TalkPickPage';
import TalkPickPlacePage from './pages/TalkPickPlacePage/TalkPickPlacePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import BalanceGamePage from './pages/BalanceGamePage/BalanceGamePage';
import BalanceGameMobilePage from './pages/mobile/BalanceGameMobilePage/BalanceGameMobilePage';
import BalanceGameCreationPage from './pages/BalanceGameCreationPage/BalanceGameCreationPage';
// import NotAuthRoutes from './components/Routes/NotAuthRoutes';
// import { useMemberQuery } from './hooks/api/member/useMemberQuery';
// import { useParseJwt } from './hooks/common/useParseJwt';
// import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
// import TodayTalkPickPage from './pages/TodayTalkPickPage/TodayTalkPickPage';
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
import { getCookie } from './utils/cookie';
import { axiosInstance } from './api/interceptor';
import { useNewDispatch } from './store';
import { tokenActions } from './store/auth';
import useIsMobile from './hooks/common/useIsMobile';

const App: React.FC = () => {
  const dispatch = useNewDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', 'refreshToken');

      dispatch(tokenActions.setToken(token));
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [dispatch]);

  // const accessToken = useNewSelector(selectAccessToken);
  // const { member } = useMemberQuery(useParseJwt(accessToken).memberId);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  useTokenRefresh();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.CHANGE.PASSWORD} element={<ChangePasswordPage />} />
          <Route path={PATH.TODAY_TALKPICK} element={<TalkPickPage />} />
          <Route path={PATH.TALKPICK_PLACE} element={<TalkPickPlacePage />} />
          <Route path={PATH.TALKPICK()} element={<TalkPickPage />} />
          <Route
            path={PATH.BALANCEGAME()}
            element={isMobile ? <BalanceGameMobilePage /> : <BalanceGamePage />}
          />

          {/* <Route path="/search" element={<SearchResultsPage />} /> */}
          {/* <Route path="posts" element={<PostList />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="searchResult" element={<SearchResultPage />} />
          <Route element={<ProtectedRoutes member={member} />}>
            <Route path="post/create" element={<CreatePostPage />} />
          </Route> */}
        </Route>

        <Route path={`/${PATH.RESULT}`} element={<LayoutNoFooter />}>
          <Route index element={<SearchResultsPage />} />
          <Route path={PATH.SEARCH.ALL} element={<SearchResultsPage />} />
          <Route path={PATH.SEARCH.TALKPICK} element={<SearchTalkPickPage />} />
          <Route path={PATH.SEARCH.GAME} element={<SearchGamePage />} />
        </Route>

        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path={PATH.MYPAGE} element={<LayoutNoFooter />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path={PATH.CREATE.TALK_PICK} element={<CreatePostPage />} />
            <Route
              path={PATH.CREATE.GAME}
              element={<BalanceGameCreationPage />}
            />
            <Route
              path={PATH.CHANGE.PROFILE}
              element={<ChangeUserInfoPage />}
            />
          </Route>
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
