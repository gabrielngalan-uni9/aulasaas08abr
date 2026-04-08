import { addDays, setHours, setMinutes, format } from "date-fns";

const today = new Date();

export const professionalProfile = {
  name: "Dra. Maria Silva",
  specialty: "Psicóloga Clínica — CRP 06/123456",
  bio: "Especialista em terapia cognitivo-comportamental com mais de 10 anos de experiência. Meu objetivo é oferecer um espaço seguro e acolhedor para o seu desenvolvimento pessoal.",
  avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
};

export const availableSlots: Record<string, string[]> = {
  [format(addDays(today, 1), "yyyy-MM-dd")]: ["09:00", "10:00", "14:00", "15:30"],
  [format(addDays(today, 2), "yyyy-MM-dd")]: ["08:30", "11:00", "14:00"],
  [format(addDays(today, 3), "yyyy-MM-dd")]: ["09:00", "10:30", "16:00"],
  [format(addDays(today, 5), "yyyy-MM-dd")]: ["08:00", "13:00", "15:00", "17:00"],
  [format(addDays(today, 7), "yyyy-MM-dd")]: ["09:30", "11:00"],
};

export const availableDates = Object.keys(availableSlots).map((d) => new Date(d + "T12:00:00"));

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: "paid" | "pending";
  date: string;
}

export const todayAppointments: Appointment[] = [
  { id: "1", patientName: "João Pedro Almeida", time: "08:00", status: "paid", date: format(today, "dd/MM/yyyy") },
  { id: "2", patientName: "Ana Carolina Souza", time: "09:30", status: "paid", date: format(today, "dd/MM/yyyy") },
  { id: "3", patientName: "Lucas Ferreira", time: "11:00", status: "pending", date: format(today, "dd/MM/yyyy") },
  { id: "4", patientName: "Mariana Costa", time: "14:00", status: "pending", date: format(today, "dd/MM/yyyy") },
];

export const mockAiSummary = {
  queixaPrincipal: "Paciente relata aumento significativo de ansiedade nas últimas duas semanas, especialmente em situações sociais no ambiente de trabalho. Dificuldade para dormir e sensação constante de preocupação.",
  observacoes: "Paciente apresenta-se colaborativo, com discurso coerente. Nota-se tensão muscular e inquietação motora. Relata uso de técnicas de respiração aprendidas na sessão anterior com resultados parciais. Vínculo terapêutico bem estabelecido.",
  planoDeAcao: "1. Introduzir técnica de reestruturação cognitiva para pensamentos catastróficos.\n2. Manter diário de pensamentos automáticos durante a semana.\n3. Praticar exercício de relaxamento muscular progressivo antes de dormir.\n4. Retorno em 7 dias para reavaliação.",
};
