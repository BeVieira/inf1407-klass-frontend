import React from 'react';
import { X } from 'lucide-react';
import * as S from './styled';

export interface Student {
  id: number;
  name: string;
  email: string;
  matricula: string;
}

interface StudentListModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  students: Student[];
}

const StudentListModal: React.FC<StudentListModalProps> = ({
  isOpen,
  onClose,
  courseName,
  students,
}) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Alunos inscritos em {courseName}</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.Header>
        <S.Content>
          {students.length > 0 ? (
            <S.StudentList>
              {students.map((student) => (
                <S.StudentItem key={student.id}>
                  <S.Avatar>
                    {student.name.charAt(0).toUpperCase()}
                  </S.Avatar>
                  <S.Info>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <S.Name>{student.name}</S.Name>
                      <S.Matricula>{student.matricula}</S.Matricula>
                    </div>
                    <S.Email>{student.email}</S.Email>
                  </S.Info>
                </S.StudentItem>
              ))}
            </S.StudentList>
          ) : (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>
              Nenhum aluno inscrito nesta disciplina.
            </p>
          )}
        </S.Content>
      </S.Modal>
    </S.Overlay>
  );
};

export default StudentListModal;
