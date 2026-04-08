

## Hub de Integração e Faturamento para Profissionais de Saúde — MVP UI

### Design System
- Paleta: azul claro (#0EA5E9), verde água (#14B8A6), branco, cinza claro
- Mobile-first, minimalista, shadcn/ui + Tailwind
- Fontes clean, espaçamento generoso, foco na ação principal

### Páginas

**1. Landing Page Pública (`/`)**
- Header com foto, nome ("Dra. Maria Silva"), especialidade e bio curta
- Calendário interativo com horários disponíveis mockados
- Formulário pós-seleção: Nome, E-mail, Telefone
- Botão "Agende sua experiência" → toast de sucesso
- Design acolhedor, responsivo

**2. Dashboard do Profissional (`/dashboard`)**
- Sidebar com navegação: Minha Agenda, Pacientes, Configurações (colapsável em mobile)
- Home: resumo das consultas do dia em cards (horário, paciente, status Pago/Pendente com badges)
- Botão "Abrir Prontuário" em cada card → abre modal
- Link temporário na landing para acessar o dashboard (simulando login)

**3. Modal de Prontuário Clínico**
- Cabeçalho: nome do paciente + data
- Textarea grande para anotações livres
- Botão "Gerar Resumo com IA" com ícone sparkles → preenche resultado mockado após loading simulado
- Área estruturada read-only: Queixa Principal, Observações, Plano de Ação

### Dados Mockados
- 5 horários disponíveis no calendário para os próximos dias
- 4 consultas do dia no dashboard com status variados
- Resultado de IA pré-definido para demonstração

### Navegação
- Landing page com link "Área do Profissional" no canto superior
- Estado local para simular autenticação (sem Supabase)

