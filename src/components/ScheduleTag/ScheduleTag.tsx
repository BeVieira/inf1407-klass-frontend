import React from 'react';
import { Clock } from 'lucide-react';
import * as S from './styled';

interface ScheduleTagProps {
  schedule: string;
  days: string;
}

const ScheduleTag: React.FC<ScheduleTagProps> = ({ schedule, days }) => {
  return (
    <S.Container>
      <Clock size={14} />
      <span>{days}</span>
      {(() => {
        const [a, b] = schedule.split('-').map(s => s.trim());
        if (a && b) {
          const fmt = (s: string) => (s.includes(':') ? s : `${s}:00`);
          return <span>{`${fmt(a)} - ${fmt(b)}`}</span>;
        }
        return <span>{schedule}</span>;
      })()}
    </S.Container>
  );
};

export default ScheduleTag;
