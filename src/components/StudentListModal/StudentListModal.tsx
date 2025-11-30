import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fetchEnrollments, fetchUserProfile } from '../../utils/api';
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
  sectionId: number | null;
  accessToken: string | null;
}

const StudentListModal: React.FC<StudentListModalProps> = ({
  isOpen,
  onClose,
  courseName,
  sectionId,
  accessToken,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !sectionId || !accessToken) {
      setStudents([]);
      return;
    }

    const loadStudents = async () => {
      setLoading(true);
      try {
        const allEnrollments = await fetchEnrollments(accessToken);
        
        // Filtrar enrollments pela section_id
        const enrollments = allEnrollments.filter(enrollment => enrollment.section === sectionId);

        // Buscar dados dos alunos para cada enrollment
        const studentsData: Student[] = await Promise.all(
          enrollments.map(async (enrollment) => {
            // Se student_detail já vier populado, usar ele
            if (enrollment.student_detail) {
              return {
                id: enrollment.student_detail.id,
                name: enrollment.student_detail.username,
                email: enrollment.student_detail.email,
                matricula: enrollment.student_detail.registration,
              };
            }

            // Caso contrário, buscar os dados do usuário
            if (enrollment.student) {
              try {
                const userProfile = await fetchUserProfile(enrollment.student, accessToken);
                return {
                  id: userProfile.id,
                  name: userProfile.username,
                  email: userProfile.email,
                  matricula: userProfile.registration,
                };
              } catch (error) {
                console.error(`Erro ao buscar dados do aluno ${enrollment.student}:`, error);
                return {
                  id: enrollment.student,
                  name: 'Estudante inscrito',
                  email: 'E-mail não informado',
                  matricula: 'Matrícula não informada',
                };
              }
            }

            // Fallback se não houver student nem student_detail
            return {
              id: enrollment.id,
              name: 'Estudante inscrito',
              email: 'E-mail não informado',
              matricula: 'Matrícula não informada',
            };
          })
        );

        setStudents(studentsData);
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [isOpen, sectionId, accessToken]);

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
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>
              Carregando alunos...
            </p>
          ) : students.length > 0 ? (
            <S.StudentList>
              {students.map((student, index) => (
                <S.StudentItem key={`${student.id}-${index}`}>
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
