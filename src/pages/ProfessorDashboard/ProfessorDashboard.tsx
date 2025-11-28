import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CourseCardProfessor from '../../components/CourseCardProfessor/CourseCardProfessor';
import StudentListModal, { type Student } from '../../components/StudentListModal/StudentListModal';
import * as S from './styled';

// Mock data for professor's courses
const MOCK_PROFESSOR_COURSES = [
  {
    id: 1,
    code: 'COMP101',
    name: 'Introdução à Programação',
    schedule: '2ª e 4ª, 08h–10h',
    enrolledCount: 12,
  },
  {
    id: 4,
    code: 'COMP204',
    name: 'Estrutura de Dados',
    schedule: '3ª e 5ª, 16h–18h',
    enrolledCount: 20,
  },
];

// Mock data for students
const MOCK_STUDENTS: Record<number, Student[]> = {
  1: [
    { id: 101, name: 'João Silva', email: 'joao@ufrj.br', matricula: '2023001' },
    { id: 102, name: 'Maria Oliveira', email: 'maria@ufrj.br', matricula: '2023002' },
    { id: 103, name: 'Pedro Santos', email: 'pedro@ufrj.br', matricula: '2023003' },
  ],
  4: [
    { id: 104, name: 'Ana Costa', email: 'ana@ufrj.br', matricula: '2022001' },
    { id: 105, name: 'Lucas Pereira', email: 'lucas@ufrj.br', matricula: '2022002' },
    { id: 106, name: 'Carla Souza', email: 'carla@ufrj.br', matricula: '2022003' },
    { id: 107, name: 'Marcos Lima', email: 'marcos@ufrj.br', matricula: '2022004' },
  ],
};

const ProfessorDashboard: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewStudents = (courseId: number) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  const selectedCourse = MOCK_PROFESSOR_COURSES.find(c => c.id === selectedCourseId);
  const students = selectedCourseId ? MOCK_STUDENTS[selectedCourseId] || [] : [];

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Professor</S.Title>
          <S.Subtitle>Gerencie suas turmas e acompanhe os alunos inscritos.</S.Subtitle>
        </S.Header>

        {MOCK_PROFESSOR_COURSES.length > 0 ? (
          <S.Grid>
            {MOCK_PROFESSOR_COURSES.map((course) => (
              <CourseCardProfessor
                key={course.id}
                {...course}
                onViewStudents={handleViewStudents}
              />
            ))}
          </S.Grid>
        ) : (
          <S.EmptyState>
            <p>Você não possui disciplinas cadastradas.</p>
          </S.EmptyState>
        )}
      </S.Main>
      <Footer />

      <StudentListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseName={selectedCourse?.name || ''}
        students={students}
      />
    </S.Page>
  );
};

export default ProfessorDashboard;
