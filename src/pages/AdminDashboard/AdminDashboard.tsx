import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/Search/SearchBar';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import AdminCourseCard from '../../components/AdminCourseCard/AdminCourseCard';
import StudentListModal, { type Student } from '../../components/StudentListModal/StudentListModal';
import * as S from './styled';

// Mock data for all courses
const MOCK_ALL_COURSES = [
  {
    id: 1,
    code: 'COMP101',
    name: 'Introdução à Programação',
    professor: 'Dr. Alan Turing',
    schedule: '2ª e 4ª, 08h–10h',
    spots: 12,
    totalSpots: 20,
    enrolledCount: 8,
  },
  {
    id: 2,
    code: 'MAT202',
    name: 'Cálculo II',
    professor: 'Dra. Ada Lovelace',
    schedule: '3ª e 5ª, 10h–12h',
    spots: 18,
    totalSpots: 20,
    enrolledCount: 2,
  },
  {
    id: 3,
    code: 'FIS303',
    name: 'Física Clássica',
    professor: 'Dr. Isaac Newton',
    schedule: '2ª, 4ª e 6ª, 14h–16h',
    spots: 5,
    totalSpots: 30,
    enrolledCount: 25,
  },
  {
    id: 4,
    code: 'COMP204',
    name: 'Estrutura de Dados',
    professor: 'Dr. Grace Hopper',
    schedule: '3ª e 5ª, 16h–18h',
    spots: 20,
    totalSpots: 20,
    enrolledCount: 0,
  },
  {
    id: 5,
    code: 'EST405',
    name: 'Probabilidade e Estatística',
    professor: 'Dr. Andrey Kolmogorov',
    schedule: '6ª, 08h–12h',
    spots: 10,
    totalSpots: 25,
    enrolledCount: 15,
  },
  {
    id: 6,
    code: 'COMP306',
    name: 'Banco de Dados',
    professor: 'Dr. Edgar Codd',
    schedule: '2ª e 4ª, 18h–20h',
    spots: 15,
    totalSpots: 20,
    enrolledCount: 5,
  },
];

// Mock data for students (reusing some from professor dashboard + extras)
const MOCK_STUDENTS: Record<number, Student[]> = {
  1: [
    { id: 101, name: 'João Silva', email: 'joao@ufrj.br', matricula: '2023001' },
    { id: 102, name: 'Maria Oliveira', email: 'maria@ufrj.br', matricula: '2023002' },
  ],
  3: [
    { id: 103, name: 'Pedro Santos', email: 'pedro@ufrj.br', matricula: '2023003' },
  ],
  5: [
    { id: 104, name: 'Ana Costa', email: 'ana@ufrj.br', matricula: '2022001' },
  ],
};

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (courseId: number) => {
    setSelectedCourseId(courseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };

  const selectedCourse = MOCK_ALL_COURSES.find(c => c.id === selectedCourseId);
  const students = selectedCourseId ? MOCK_STUDENTS[selectedCourseId] || [] : [];

  const filteredCourses = MOCK_ALL_COURSES
    .filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.professor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (activeTab === 'Por horário') {
        return a.schedule.localeCompare(b.schedule);
      }
      if (activeTab === 'Por professor') {
        return a.professor.localeCompare(b.professor);
      }
      if (activeTab === 'Por curso') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Administrador</S.Title>
          <S.Subtitle>Visão geral de todas as disciplinas e inscrições do sistema.</S.Subtitle>
        </S.Header>

        <S.Controls>
          <FilterTabs
            tabs={['Todos', 'Por professor', 'Por horário', 'Por curso']}
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
              <AdminCourseCard
                key={course.id}
                {...course}
                onViewDetails={handleViewDetails}
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

      <StudentListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseName={selectedCourse?.name || ''}
        students={students}
      />
    </S.Page>
  );
};

export default AdminDashboard;
