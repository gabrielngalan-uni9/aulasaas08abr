

## Adicionar Páginas de Pacientes e Configurações

### Resumo
Criar duas novas páginas dentro do dashboard — **Pacientes** e **Configurações** — reutilizando o layout existente (sidebar + header) e dados mockados.

### Arquitetura

A abordagem atual tem o layout do dashboard (SidebarProvider, AppSidebar, header) duplicado dentro de `Dashboard.tsx`. Para evitar repetir esse layout em 3 páginas, vou criar um **DashboardLayout** compartilhado e usar rotas aninhadas.

```text
/dashboard          → DashboardLayout > Agenda (conteúdo atual)
/dashboard/patients → DashboardLayout > Patients
/dashboard/settings → DashboardLayout > Settings
```

### Arquivos

**1. `src/components/DashboardLayout.tsx`** (novo)
- Extrai o shell do Dashboard atual: SidebarProvider, AppSidebar, header com trigger e botão Sair
- Renderiza `<Outlet />` no main

**2. `src/pages/Dashboard.tsx`** (refatorar)
- Manter apenas o conteúdo da agenda (chips + lista de cards + modal)
- Remover o layout wrapper

**3. `src/pages/Patients.tsx`** (novo)
- Título "Pacientes" + subtítulo
- Tabela com dados mockados: Nome, E-mail, Telefone, Última Consulta, Total de Sessões
- 6 pacientes mockados (incluindo os 4 já existentes nos appointments)
- Campo de busca simples (filtro local por nome)
- Badge de status (Ativo/Inativo)

**4. `src/pages/Settings.tsx`** (novo)
- Título "Configurações" + subtítulo
- Card "Perfil Profissional": campos Nome, Especialidade, Bio (preenchidos com dados do mock), botão Salvar → toast
- Card "Horários de Atendimento": checkboxes dos dias da semana + horário início/fim, botão Salvar → toast
- Card "Valores": campo Valor da Consulta (R$), botão Salvar → toast

**5. `src/lib/mock-data.ts`** (atualizar)
- Adicionar array `mockPatients` com 6 pacientes

**6. `src/App.tsx`** (atualizar rotas)
- `/dashboard` como rota pai com DashboardLayout
- Rotas filhas: index (agenda), `patients`, `settings`

### Componentes UI utilizados
- Table, Input, Label, Card, Button, Badge, Switch/Checkbox — todos já disponíveis no projeto

