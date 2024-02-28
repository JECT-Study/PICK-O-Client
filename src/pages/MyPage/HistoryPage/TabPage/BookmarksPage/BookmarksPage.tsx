import React, { useState } from 'react';
import PageNavigation from '../../../../../components/common/Paginavigation/Paginavigation';
import CheckBox from '../../../../../components/design/CheckBox/CheckBox';
import Button from '../../../../../components/design/Button/Button';
import { bookmarksBtnContainer } from './BookmarksPage.style';
import List from '../../../../../components/mypage/List/List';
import ItemBookmarks from '../../../../../components/mypage/ListItem/ItemBookmarks';

const BookmarksPage = () => {
  const items = [
    {
      id: 1,
      title: '북마크한 게시글 제목입니다.',
      date: '~ 2024.02.23',
    },
  ];
  const [selectedPage, setSelectedPage] = useState(1);
  const pages: number[] = [1];
  return (
    <>
      <div css={bookmarksBtnContainer}>
        <CheckBox label="전체 선택" />
        <Button size="xSmall">북마크 해제</Button>
      </div>

      <List>
        {items.map((item) => {
          return <ItemBookmarks key={item.id} item={item} />;
        })}
      </List>
      <PageNavigation
        pages={pages}
        selected={selectedPage}
        maxPage={pages.length}
        onChangeNavigate={(page: number) => {
          setSelectedPage(page);
        }}
      />
    </>
  );
};

export default BookmarksPage;