import React from 'react';
import {
  Popular,
  Couple,
  Taste,
  Worldcup,
  PopularSmall,
  CoupleSmall,
  TasteSmall,
  WorldcupSmall,
} from '@/assets';
import * as S from './CategoryBar.style';
import BalanceGameCategoryButton from '../../atoms/BalanceGameCategoryButton/BalanceGameCategoryButton';

export interface CategoryBarProps {
  activeTab: '' | '커플' | '취향' | '월드컵';
  setActiveTab: React.Dispatch<
    React.SetStateAction<'' | '커플' | '취향' | '월드컵'>
  >;
  isMobile?: boolean;
}

const CategoryBar = ({
  activeTab,
  setActiveTab,
  isMobile = false,
}: CategoryBarProps) => {
  const getBadgeText = (tab: '' | '커플' | '취향' | '월드컵') => {
    switch (tab) {
      case '':
        return '화제의 중심';
      case '커플':
        return '알아가 볼까';
      case '취향':
        return '얼마나 맞나';
      case '월드컵':
        return '다 준비했어';
      default:
        return '';
    }
  };

  return (
    <div css={S.containerStyle}>
      <BalanceGameCategoryButton
        label="인기"
        icon={isMobile ? <PopularSmall /> : <Popular />}
        active={activeTab === ''}
        badgeText={getBadgeText('')}
        onClick={() => setActiveTab('')}
      />
      <BalanceGameCategoryButton
        label="커플"
        icon={isMobile ? <CoupleSmall /> : <Couple />}
        active={activeTab === '커플'}
        badgeText={getBadgeText('커플')}
        onClick={() => setActiveTab('커플')}
      />
      <BalanceGameCategoryButton
        label="취향"
        icon={isMobile ? <TasteSmall /> : <Taste />}
        active={activeTab === '취향'}
        badgeText={getBadgeText('취향')}
        onClick={() => setActiveTab('취향')}
      />
      <BalanceGameCategoryButton
        label="월드컵"
        icon={isMobile ? <WorldcupSmall /> : <Worldcup />}
        active={activeTab === '월드컵'}
        badgeText={getBadgeText('월드컵')}
        onClick={() => setActiveTab('월드컵')}
      />
    </div>
  );
};

export default CategoryBar;
