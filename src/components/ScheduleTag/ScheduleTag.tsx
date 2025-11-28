import React from 'react';
import { Clock } from 'lucide-react';
import * as S from './styled';

interface ScheduleTagProps {
  schedule: string;
}

const ScheduleTag: React.FC<ScheduleTagProps> = ({ schedule }) => {
  return (
    <S.Container>
      <Clock size={14} />
      <span>{schedule}</span>
    </S.Container>
  );
};

export default ScheduleTag;
