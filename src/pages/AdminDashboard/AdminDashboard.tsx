import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/Search/SearchBar';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import AdminCourseCard from '../../components/AdminCourseCard/AdminCourseCard';
import StudentListModal, { type Student } from '../../components/StudentListModal/StudentListModal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import {
  computeVacancies,
  fetchEnrollments,
  fetchSections,
  formatSchedule,
  resolveCourseData,
} from '../../utils/api';
import * as S from './styled';

const AdminDashboard: React.FC = () => {
  const { accessToken } = useAuth();
  const { addToast } = useToast();

  const [sectionCards, setSectionCards] = useState<Array<{ id: number; code: string; name: string; professor: string; schedule: string; spots: number; totalSpots: number; enrolledCount: number }>>([]);
  const [studentsBySection, setStudentsBySection] = useState<Record<number, Student[]>>({});
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');

useEffect(() => {
    if (!accessToken) return;

    const loadData = async () => {
      try {
        const allSections = await fetchSections(accessToken);

        const cards = allSections.map((section) => {
          const course = resolveCourseData(section);
          const { occupied, totalSpots } = computeVacancies(section);
          return {
            id: section.id,
            code: course.code || `DISC-${course.id}`,
            name: course.name || course.title || `Curso ${course.id}`,
            professor: course.professor_name || 'Professor responsável',
            schedule: formatSchedule(section),
            spots: occupied,
            totalSpots: totalSpots || occupied || 0,
            enrolledCount: occupied,
          };
        });
        setSectionCards(cards);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao carregar disciplinas.';
        addToast(message, 'error');
      }
    };

    loadData();
  }, [accessToken, addToast]);

  const handleViewStudents = async (sectionId: number) => {
    setSelectedSectionId(sectionId);
    setIsModalOpen(true);

    if (!accessToken) return;
    try {
      const enrollments = await fetchEnrollments(accessToken, sectionId);
      const students: Student[] = enrollments.map((enrollment) => ({
        id: enrollment.student_detail?.id || enrollment.student || enrollment.id,
        name: enrollment.student_detail?.username || 'Estudante inscrito',
        email: enrollment.student_detail?.email || 'E-mail não informado',
        matricula: enrollment.student_detail?.registration || 'Matrícula não informada',
      }));
      setStudentsBySection((prev) => ({ ...prev, [sectionId]: students }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar alunos.';
      addToast(message, 'error');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSectionId(null);
  };

 const filteredCards = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return sectionCards
      .filter((course) =>
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.professor.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        if (activeTab === 'Por horário') {
          return a.schedule.localeCompare(b.schedule);
        }
        if (activeTab === 'Por professor') {
          return a.professor.localeCompare(b.professor);
        }
        return 0;
      });
  }, [sectionCards, searchTerm, activeTab]);

  const students = selectedSectionId ? studentsBySection[selectedSectionId] || [] : [];

  return (
    <S.Page>
      <Header />
      <S.Main>
        <S.Header>
          <S.Title>Painel do Administrador</S.Title>
          <S.Subtitle>Visualize todas as disciplinas, turmas e matrículas.</S.Subtitle>
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

        {filteredCards.length > 0 ? (
          <S.Grid>
            {filteredCards.map((course) => (
              <AdminCourseCard
                key={course.id}
                {...course}
                onViewDetails={handleViewStudents}
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
        courseName={sectionCards.find((c) => c.id === selectedSectionId)?.name || 'Turma'}
        students={students}
      />
    </S.Page>
  );
};

export default AdminDashboard;
