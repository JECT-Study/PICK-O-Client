import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import { Layout, LayoutNoSearch } from './layout/Layout';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import FindPasswordPage from './pages/FindPasswordPage/FindPasswordPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PostList from './pages/PostListPage/PostListPage';
import PostPage from './pages/PostPage/PostPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const App: React.FC = () => {
  return (
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
    </Routes>
  );
};

export default App;
