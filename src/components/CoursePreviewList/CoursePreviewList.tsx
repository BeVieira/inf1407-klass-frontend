import React, { useState } from 'react';
import { User, BookOpen } from 'lucide-react';
import type { Course } from '../../types/Course';
import SearchBar from '../Search/SearchBar';
import * as S from './styled';

const MOCK_COURSES: Course[] = [
  {
    id: 1,
    code: 'COMP101',
    name: 'Introdução à Programação',
    professor: 'Dr. Alan Turing',
    description: 'Fundamentos de algoritmos e lógica de programação.',
  },
  {
    id: 2,
    code: 'MAT202',
    name: 'Cálculo II',
    professor: 'Dra. Ada Lovelace',
    description: 'Estudo de integrais, séries e equações diferenciais.',
  },
  {
    id: 3,
    code: 'FIS303',
    name: 'Física Clássica',
    professor: 'Dr. Isaac Newton',
    description: 'Leis do movimento, energia e gravitação.',
  },
  {
    id: 4,
    code: 'COMP204',
    name: 'Estrutura de Dados',
    professor: 'Dr. Grace Hopper',
    description: 'Listas, pilhas, filas, árvores e grafos.',
  },
  {
    id: 5,
    code: 'EST405',
    name: 'Probabilidade e Estatística',
    professor: 'Dr. Andrey Kolmogorov',
    description: 'Análise de dados, probabilidade e inferência estatística.',
  },
  {
    id: 6,
    code: 'COMP306',
    name: 'Banco de Dados',
    professor: 'Dr. Edgar Codd',
    description: 'Modelagem de dados, SQL e sistemas gerenciadores.',
  },
];

const CoursePreviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = MOCK_COURSES.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <S.Container>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar disciplina por nome ou código..."
      />

      {filteredCourses.length > 0 ? (
        <S.Grid>
          {filteredCourses.map((course) => (
            <S.Card key={course.id}>
              <S.CardHeader>
                <S.CourseCode>{course.code}</S.CourseCode>
              </S.CardHeader>
              <S.CourseName>{course.name}</S.CourseName>
              <S.CardBody>
                <S.InfoRow>
                  <User size={16} />
                  <span>{course.professor}</span>
                </S.InfoRow>
                <S.InfoRow>
                  <BookOpen size={16} />
                  <span>{course.description}</span>
                </S.InfoRow>
              </S.CardBody>
            </S.Card>
          ))}
        </S.Grid>
      ) : (
        <S.EmptyState>
          <p>Nenhuma disciplina encontrada para "{searchTerm}".</p>
        </S.EmptyState>
      )}

      <S.ViewAllButton>Ver todas as disciplinas</S.ViewAllButton>
    </S.Container>
  );
};

export default CoursePreviewList;
