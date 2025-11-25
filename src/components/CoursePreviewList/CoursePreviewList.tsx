import React, { useState } from 'react';
import { User, Clock } from 'lucide-react';
import type { Disciplina } from '../../types/Disciplina';
import SearchBar from '../Search/SearchBar';
import * as S from './styled';

const MOCK_COURSES: Disciplina[] = [
  {
    id: 1,
    codigo: 'COMP101',
    nome: 'Introdução à Programação',
    professor: 'Dr. Alan Turing',
    horariosResumo: '2ª e 4ª, 08h–10h',
  },
  {
    id: 2,
    codigo: 'MAT202',
    nome: 'Cálculo II',
    professor: 'Dra. Ada Lovelace',
    horariosResumo: '3ª e 5ª, 10h–12h',
  },
  {
    id: 3,
    codigo: 'FIS303',
    nome: 'Física Clássica',
    professor: 'Dr. Isaac Newton',
    horariosResumo: '2ª, 4ª e 6ª, 14h–16h',
  },
  {
    id: 4,
    codigo: 'COMP204',
    nome: 'Estrutura de Dados',
    professor: 'Dr. Grace Hopper',
    horariosResumo: '3ª e 5ª, 16h–18h',
  },
  {
    id: 5,
    codigo: 'EST405',
    nome: 'Probabilidade e Estatística',
    professor: 'Dr. Andrey Kolmogorov',
    horariosResumo: '6ª, 08h–12h',
  },
  {
    id: 6,
    codigo: 'COMP306',
    nome: 'Banco de Dados',
    professor: 'Dr. Edgar Codd',
    horariosResumo: '2ª e 4ª, 18h–20h',
  },
];

const CoursePreviewList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = MOCK_COURSES.filter(
    (course) =>
      course.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.codigo.toLowerCase().includes(searchTerm.toLowerCase())
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
                <S.CourseCode>{course.codigo}</S.CourseCode>
              </S.CardHeader>
              <S.CourseName>{course.nome}</S.CourseName>
              <S.CardBody>
                <S.InfoRow>
                  <User size={16} />
                  <span>{course.professor}</span>
                </S.InfoRow>
                <S.InfoRow>
                  <Clock size={16} />
                  <span>{course.horariosResumo}</span>
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
