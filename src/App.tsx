/* eslint-disable @typescript-eslint/no-unused-vars */
import MyPage from '@/pages/MyPage/MyPage';
import SearchGamePage from '@/pages/SearchResultsPage/SearchGamePage';
import SearchTalkPickPage from '@/pages/SearchResultsPage/SearchTalkPickPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import { PATH } from './constants/path';
import { useTokenRefresh } from './hooks/common/useTokenRefresh';
import { Layout, LayoutNoFooter } from './layout/layout';
import BalanceGameCreationPage from './pages/BalanceGameCreationPage/BalanceGameCreationPage';
import BalanceGamePage from './pages/BalanceGamePage/BalanceGamePage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ChangeUserInfoPage from './pages/ChangeUserInfoPage/ChangeUserInfoPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TalkPickPage from './pages/TalkPickPage/TalkPickPage';
import TalkPickPlacePage from './pages/TalkPickPlacePage/TalkPickPlacePage';

const App: React.FC = () => {
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
          <Route path={PATH.BALANCEGAME()} element={<BalanceGamePage />} />
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
      </Routes>
    </LocalizationProvider>
  );
};

export default App;
