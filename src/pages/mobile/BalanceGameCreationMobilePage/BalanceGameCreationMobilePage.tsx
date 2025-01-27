import React from 'react';
import BalanceGameCreateSection from '@/components/mobile/organisms/BalanceGameCreateSection/BalanceGameCreateSection';
import * as S from './BalanceGameCreationMobilePage.style';

const BalanceGameCreationMobilePage = () => {
  return (
    <div css={S.pageStyle}>
      <BalanceGameCreateSection />
    </div>
  );
};

export default BalanceGameCreationMobilePage;
