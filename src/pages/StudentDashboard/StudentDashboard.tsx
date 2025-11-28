import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/Search/SearchBar';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import CourseCard from '../../components/CourseCard/CourseCard';
import * as S from './styled';

// Mock data for courses
const MOCK_COURSES = [
  {
    id: 1,
    code: 'COMP101',
    name: 'Introdução à Programação',
    professor: 'Dr. Alan Turing',
    schedule: '2ª e 4ª, 08h–10h',
    spots: 12,
    totalSpots: 20,
  },
  {
    id: 2,
    code: 'MAT202',
    name: 'Cálculo II',
    professor: 'Dra. Ada Lovelace',
    schedule: '3ª e 5ª, 10h–12h',
    spots: 18,
    totalSpots: 20,
  },
  {
    id: 3,
    code: 'FIS303',
    name: 'Física Clássica',
    professor: 'Dr. Isaac Newton',
    schedule: '2ª, 4ª e 6ª, 14h–16h',
    spots: 5,
    totalSpots: 30,
  },
  {
    id: 4,
    code: 'COMP204',
    name: 'Estrutura de Dados',
    professor: 'Dr. Grace Hopper',
    schedule: '3ª e 5ª, 16h–18h',
    spots: 20,
    totalSpots: 20, // Full
  },
  {
    id: 5,
    code: 'EST405',
    name: 'Probabilidade e Estatística',
    professor: 'Dr. Andrey Kolmogorov',
    schedule: '6ª, 08h–12h',
    spots: 10,
    totalSpots: 25,
  },
  {
    id: 6,
    code: 'COMP306',
    name: 'Banco de Dados',
    professor: 'Dr. Edgar Codd',
    schedule: '2ª e 4ª, 18h–20h',
    spots: 15,
    totalSpots: 20,
  },
];

const StudentDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [courses, setCourses] = useState(MOCK_COURSES);

  const handleEnroll = (id: number) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...course, spots: course.spots + 1 } : course
      )
    );
    alert('Inscrição realizada com sucesso!');
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase());

    // Basic tab filtering logic (can be expanded)
    if (activeTab === 'Todos') return matchesSearch;
    // For now, other tabs just show the same list filtered by search, 
    // but in a real app they might sort or group differently.
    return matchesSearch;
  });

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Estudante</S.Title>
          <S.Subtitle>Gerencie suas inscrições e visualize as disciplinas disponíveis.</S.Subtitle>
        </S.Header>

        <S.Controls>
          <FilterTabs
            tabs={['Todos', 'Por horário', 'Por professor']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por disciplina, código ou professor..."
          />
        </S.Controls>

        {filteredCourses.length > 0 ? (
          <S.Grid>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                onEnroll={handleEnroll}
              />
            ))}
          </S.Grid>
        ) : (
          <S.EmptyState>
            <p>Nenhuma disciplina encontrada.</p>
          </S.EmptyState>
        )}
      </S.Main>
      <Footer />
    </S.Page>
  );
};

export default StudentDashboard;
