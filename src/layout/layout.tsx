import React from 'react';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';
// import Sidebar from '../pages/MyPage/sections/Sidebar/Sidebar';

export const Layout = () => {
  return (
    <>
      <Header />
      <main
        css={css({
          paddingTop: '100px',
        })}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export const LayoutNoSearch = () => {
  return (
    <>
      <Header />
      <main
        css={css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          paddingTop: '100px',
        })}
      >
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export const LayoutMypage = () => {
  return (
    <>
      <Header />
      <div css={css({ display: 'flex', height: '100%' })}>
        {/* <Sidebar /> */}
        <main
          css={css({
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          })}
        >
          <Outlet />
          {/* <Footer/> */}
        </main>
      </div>
    </>
  );
};
