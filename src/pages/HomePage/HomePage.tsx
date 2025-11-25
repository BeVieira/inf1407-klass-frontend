import React from 'react';
import { GraduationCap, BookOpen, ClipboardList, Search, CheckSquare, CalendarDays } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserRoleCard from '../../components/UserRoleCard/UserRoleCard';
import CoursePreviewList from '../../components/CoursePreviewList/CoursePreviewList';
import * as S from './styled';

const HomePage: React.FC = () => {
  return (
    <S.Page>
      <Header />
      
      <S.Main>
        <S.Hero>
          <S.HeroTitle>
            Organize suas disciplinas e grade em um só lugar
          </S.HeroTitle>
          <S.HeroSubtitle>
            O sistema definitivo para a gestão acadêmica. Professores cadastram suas turmas e alunos montam sua grade e consultam o microhorário sem complicações.
          </S.HeroSubtitle>
          <S.HeroButtons>
            <S.PrimaryButton href="#disciplinas">
              Ver disciplinas
            </S.PrimaryButton>
            <S.SecondaryButton to="/login">
              Entrar no sistema
            </S.SecondaryButton>
          </S.HeroButtons>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>Para quem é o sistema?</S.SectionTitle>
          <S.RolesGrid>
            <UserRoleCard
              title="Aluno"
              description="Pesquise disciplinas, visualize horários, monte seu microhorário ideal e realize sua inscrição de forma simples e rápida."
              icon={GraduationCap}
            />
            <UserRoleCard
              title="Professor"
              description="Cadastre suas disciplinas, defina horários, gerencie vagas e acompanhe os alunos inscritos em suas turmas."
              icon={BookOpen}
            />
          </S.RolesGrid>
        </S.Section>

        <S.Section id="disciplinas">
          <S.SectionTitle>Disciplinas Disponíveis</S.SectionTitle>
          <CoursePreviewList />
        </S.Section>

        <S.Section id="como-funciona">
          <S.SectionTitle>Como funciona</S.SectionTitle>
          <S.StepsGrid>
            <S.Step>
              <S.StepNumber>1</S.StepNumber>
              <S.StepTitle>
                <ClipboardList size={20} />
                Cadastro
              </S.StepTitle>
              <S.StepDescription>Professores cadastram as disciplinas e definem os horários das aulas.</S.StepDescription>
            </S.Step>
            <S.Step>
              <S.StepNumber>2</S.StepNumber>
              <S.StepTitle>
                <Search size={20} />
                Pesquisa
              </S.StepTitle>
              <S.StepDescription>Alunos pesquisam as disciplinas disponíveis por nome ou código.</S.StepDescription>
            </S.Step>
            <S.Step>
              <S.StepNumber>3</S.StepNumber>
              <S.StepTitle>
                <CheckSquare size={20} />
                Inscrição
              </S.StepTitle>
              <S.StepDescription>Alunos selecionam as turmas e realizam a inscrição no sistema.</S.StepDescription>
            </S.Step>
            <S.Step>
              <S.StepNumber>4</S.StepNumber>
              <S.StepTitle>
                <CalendarDays size={20} />
                Grade Horária
              </S.StepTitle>
              <S.StepDescription>O sistema gera automaticamente a grade horária do aluno.</S.StepDescription>
            </S.Step>
          </S.StepsGrid>
        </S.Section>
      </S.Main>

      <Footer />
    </S.Page>
  );
};

export default HomePage;
