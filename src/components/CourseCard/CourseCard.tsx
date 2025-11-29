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
  isEnrolled?: boolean;
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
  isEnrolled = false,
  onEnroll,
}) => {
  const isFull = spots >= totalSpots;
  const canEnroll = !isFull && !isEnrolled;

  return (
    <S.Card>
      <div>
        <S.Header>
          <S.Code>{code}</S.Code>
          {isEnrolled && (
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, backgroundColor: '#d1fae5', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' }}>
              Inscrito
            </span>
          )}
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
        <S.EnrollButton 
          onClick={() => onEnroll(id)} 
          disabled={!canEnroll && !isEnrolled}
          $isEnrolled={isEnrolled}
        >
          {isEnrolled ? 'Cancelar inscrição' : isFull ? 'Lotado' : 'Inscrever-se'}
        </S.EnrollButton>
      </S.Footer>
    </S.Card>
  );
};

export default CourseCard;
