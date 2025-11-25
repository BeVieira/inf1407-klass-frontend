import React from 'react';
import { Search } from 'lucide-react';
import * as S from './styled';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Buscar...' }) => {
  return (
    <S.Container>
      <S.IconWrapper>
        <Search size={20} />
      </S.IconWrapper>
      <S.Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </S.Container>
  );
};

export default SearchBar;
