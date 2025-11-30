import React from 'react';
import { Trash2 } from 'lucide-react';
import * as S from './styled';

export interface CourseListCardProps {
  id: number;
  code: string;
  name: string;
  description: string;
  onDelete: (id: number) => void;
}

const CourseListCard: React.FC<CourseListCardProps> = ({
  id,
  code,
  name,
  description,
  onDelete,
}) => {
  return (
    <S.Card>
      <S.Header>
        <S.Code>{code}</S.Code>
        <S.DeleteButton onClick={() => onDelete(id)} title="Deletar curso">
          <Trash2 size={18} />
        </S.DeleteButton>
      </S.Header>
      <S.Title>{name}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Card>
  );
};

export default CourseListCard;
