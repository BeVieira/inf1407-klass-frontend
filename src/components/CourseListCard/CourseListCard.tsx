import React from 'react';
import * as S from './styled';

export interface CourseListCardProps {
  id: number;
  code: string;
  name: string;
  description: string;
}

const CourseListCard: React.FC<CourseListCardProps> = ({
  code,
  name,
  description,
}) => {
  return (
    <S.Card>
      <S.Header>
        <S.Code>{code}</S.Code>
      </S.Header>
      <S.Title>{name}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Card>
  );
};

export default CourseListCard;
