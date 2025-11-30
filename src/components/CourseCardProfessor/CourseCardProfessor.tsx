import React from 'react';
import { Users, Trash2, Edit } from 'lucide-react';
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
  onEdit: (id: number) => void;
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
  onEdit,
}) => {
  return (
    <S.Card>
      <div>
        <S.Header>
          <S.Code>{code}</S.Code>
          <S.ActionButtons>
            <S.EditButton onClick={() => onEdit(id)} title="Editar turma">
              <Edit size={18} />
            </S.EditButton>
            <S.DeleteButton onClick={() => onDelete(id)} title="Deletar turma">
              <Trash2 size={18} />
            </S.DeleteButton>
          </S.ActionButtons>
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
