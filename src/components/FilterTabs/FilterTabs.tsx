import React from 'react';
import * as S from './styled';

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <S.Container>
      {tabs.map((tab) => (
        <S.Tab
          key={tab}
          $active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </S.Tab>
      ))}
    </S.Container>
  );
};

export default FilterTabs;
