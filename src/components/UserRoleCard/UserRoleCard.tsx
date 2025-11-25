import React from 'react';
import type { LucideIcon } from 'lucide-react';
import * as S from './styled';

interface UserRoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const UserRoleCard: React.FC<UserRoleCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <S.Card>
      <S.IconContainer>
        <Icon size={32} />
      </S.IconContainer>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Card>
  );
};

export default UserRoleCard;
