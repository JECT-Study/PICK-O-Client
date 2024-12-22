import React from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from '@/components/atoms/CategoryButton/CategoryButton';
import { categoryBoxStyling } from './CategoryBox.style';

interface CategoryBoxProps {
  isMobile?: boolean;
  handleService: () => void;
}

const CategoryBox = ({ handleService, isMobile = false }: CategoryBoxProps) => {
  return isMobile ? (
    <div css={categoryBoxStyling}>
      <Link to="/talkpickplace">
        <CategoryButton isMobile imageType="PickVote" label="톡&픽 플레이스" />
      </Link>
      <CategoryButton
        isMobile
        imageType="RandomGame"
        label="랜덤 밸런스 게임"
        onClick={handleService}
      />
    </div>
  ) : (
    <div css={categoryBoxStyling}>
      <Link to="/talkpickplace">
        <CategoryButton imageType="PickVote" label="톡&픽 플레이스" />
      </Link>
      <CategoryButton
        imageType="TodayPick"
        label="오늘의 톡픽 모음.zip"
        onClick={handleService}
      />
      <CategoryButton
        imageType="RandomGame"
        label="랜덤 밸런스 게임"
        onClick={handleService}
      />
    </div>
  );
};

export default CategoryBox;
