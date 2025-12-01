# Klass - Sistema de Gestão Acadêmica

## Integrantes do Grupo

- **João Victor da Silva Francisco**
- **Bernardo Vieira Santos**

---

## Escopo do Projeto

O **Klass** é um sistema web de gestão acadêmica desenvolvido para facilitar a interação entre alunos, professores e a administração de uma instituição de ensino. O objetivo principal é permitir que professores gerenciem suas disciplinas e turmas, e que alunos possam consultar ofertas, montar suas grades horárias e realizar inscrições.

### Principais Funcionalidades

- **Autenticação e Autorização**: Login seguro com diferentes níveis de acesso (Aluno, Professor, Admin).
- **Gerenciamento de Usuários**: Cadastro e edição de senhas.
- **Recuperação de Senha**: Fluxo de "Esqueci minha senha" implementado.
- **Gestão de Disciplinas**: Professores podem criar e gerenciar disciplinas e turmas.
- **Matrícula**: Alunos podem visualizar turmas disponíveis e realizar inscrições.
- **Grade Horária**: Visualização gráfica do horário semanal do aluno.
- **Dashboards Personalizados**: Interfaces específicas para cada perfil de usuário.

---

## Manual do Usuário

### Instalação e Execução

Para rodar o projeto localmente, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse `http://localhost:5173` no seu navegador.

### Navegação e Uso

#### 1. Autenticação

- **Login**: Acesse a página de login e entre com suas credenciais.
  - _Nota_: Como o backend é simulado, você pode criar uma conta nova na tela de **Registro** ou usar as credenciais de teste se houver.
- **Registro**: Crie uma conta de Aluno ou Professor.
- **Recuperação de Senha**: Fluxo de "Esqueci minha senha" implementado.

#### 2. Perfil de Aluno

- **Dashboard**: Ao logar como aluno, você verá sua grade horária e atalhos.
- **Buscar Disciplinas**: Utilize a barra de pesquisa para encontrar matérias.
- **Inscrição**: Clique em uma disciplina para ver detalhes e se inscrever em uma turma.

#### 3. Perfil de Professor

- **Dashboard**: Visualize suas turmas ativas.
- **Criar Disciplina/Turma**: Utilize os botões de ação para cadastrar novas ofertas no sistema.
- **Lista de Alunos**: Veja quem está inscrito em suas turmas.

#### 4. Perfil de Admin

- Acesso a uma visão geral do sistema (funcionalidade simplificada para demonstração).

---

## Relatório de Desenvolvimento

### O que foi desenvolvido e FUNCIONA ✅

1.  **Frontend Moderno**: Interface construída com React, TypeScript e Styled Components.
2.  **Roteamento**: Configuração completa de rotas com `react-router-dom`, incluindo proteção de rotas privadas e redirecionamento baseado em role.
3.  **Autenticação Completa**:
    - Login e Registro com validação de formulários.
    - Persistência de sessão (simulada com `localStorage`).
    - Logout.
4.  **Fluxo de Senha**:
    - Solicitação de reset de senha.
    - Página de redefinição de senha (com validação de token simulada).
5.  **Dashboards**:
    - **Aluno**: Visualização de grade horária (componente complexo de calendário), busca de disciplinas.
    - **Professor**: Listagem de turmas, modais para criação de cursos e seções.
---

## Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- Styled Components
- React Router DOM
- Lucide React (Ícones)
- HTML5
- CSS3
