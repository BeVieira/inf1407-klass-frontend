import React from 'react';
import { User, Users } from 'lucide-react';
import ScheduleTag from '../ScheduleTag/ScheduleTag';
import * as S from './styled';

export interface CourseCardProps {
  id: number;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  spots: number;
  totalSpots: number;
  onEnroll: (id: number) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  code,
  name,
  professor,
  schedule,
  spots,
  totalSpots,
  onEnroll,
}) => {
  const isFull = spots >= totalSpots;

  return (
    <S.Card>
      <div>
        <S.Header>
          <S.Code>{code}</S.Code>
        </S.Header>
        <S.Title>{name}</S.Title>
        <S.Professor>
          <User size={16} />
          {professor}
        </S.Professor>
      </div>

      <ScheduleTag schedule={schedule} />

      <S.Footer>
        <S.Spots>
          <Users size={16} />
          {spots}/{totalSpots} vagas
        </S.Spots>
        <S.EnrollButton onClick={() => onEnroll(id)} disabled={isFull}>
          {isFull ? 'Lotado' : 'Inscrever-se'}
        </S.EnrollButton>
      </S.Footer>
    </S.Card>
  );
};

export default CourseCard;
