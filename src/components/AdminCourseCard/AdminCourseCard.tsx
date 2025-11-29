import React from 'react';
import { User, Users, Calendar } from 'lucide-react';
import ScheduleTag from '../ScheduleTag/ScheduleTag';
import * as S from './styled';

export interface AdminCourseCardProps {
  id: number;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  spots: number;
  totalSpots: number;
  enrolledCount: number;
  onViewDetails: (id: number) => void;
}

const AdminCourseCard: React.FC<AdminCourseCardProps> = ({
  id,
  code,
  name,
  professor,
  schedule,
  spots,
  totalSpots,
  enrolledCount,
  onViewDetails,
}) => {
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

      <S.StatsGrid>
        <S.Stat>
          <S.StatLabel>Vagas Restantes</S.StatLabel>
          <S.StatValue>
            <Calendar size={14} />
            {totalSpots - spots} / {totalSpots}
          </S.StatValue>
        </S.Stat>
        <S.Stat>
          <S.StatLabel>Total Inscritos</S.StatLabel>
          <S.StatValue>
            <Users size={14} />
            {enrolledCount}
          </S.StatValue>
        </S.Stat>
      </S.StatsGrid>

      <S.Footer>
        <S.DetailsButton onClick={() => onViewDetails(id)}>
          Detalhes
        </S.DetailsButton>
      </S.Footer>
    </S.Card>
  );
};

export default AdminCourseCard;
