import React from 'react';
import { Users, Trash2 } from 'lucide-react';
import ScheduleTag from '../ScheduleTag/ScheduleTag';
import * as S from './styled';

export interface CourseCardProfessorProps {
  id: number;
  code: string;
  name: string;
  schedule: string;
  days: string;
  enrolledCount: number;
  onViewStudents: (id: number) => void;
  onDelete: (id: number) => void;
}

const CourseCardProfessor: React.FC<CourseCardProfessorProps> = ({
  id,
  code,
  name,
  schedule,
  days,
  enrolledCount,
  onViewStudents,
  onDelete,
}) => {
  return (
    <S.Card>
      <div>
        <S.Header>
          <S.Code>{code}</S.Code>
          <S.DeleteButton onClick={() => onDelete(id)} title="Deletar turma">
            <Trash2 size={18} />
          </S.DeleteButton>
        </S.Header>
        <S.Title>{name}</S.Title>
      </div>

      <ScheduleTag days={days} schedule={schedule}/>

      <S.Footer>
        <S.EnrolledCount>
          <Users size={16} />
          {enrolledCount} alunos inscritos
        </S.EnrolledCount>
        <S.ViewButton onClick={() => onViewStudents(id)}>
          Ver inscritos
        </S.ViewButton>
      </S.Footer>
    </S.Card>
  );
};

export default CourseCardProfessor;
