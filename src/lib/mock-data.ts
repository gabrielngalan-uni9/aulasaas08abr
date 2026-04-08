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

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastAppointment: string;
  totalSessions: number;
  status: "active" | "inactive";
}

export const mockPatients: Patient[] = [
  { id: "p1", name: "João Pedro Almeida", email: "joao@email.com", phone: "(11) 99999-0001", lastAppointment: format(today, "dd/MM/yyyy"), totalSessions: 12, status: "active" },
  { id: "p2", name: "Ana Carolina Souza", email: "ana@email.com", phone: "(11) 99999-0002", lastAppointment: format(today, "dd/MM/yyyy"), totalSessions: 8, status: "active" },
  { id: "p3", name: "Lucas Ferreira", email: "lucas@email.com", phone: "(11) 99999-0003", lastAppointment: format(today, "dd/MM/yyyy"), totalSessions: 3, status: "active" },
  { id: "p4", name: "Mariana Costa", email: "mariana@email.com", phone: "(11) 99999-0004", lastAppointment: format(today, "dd/MM/yyyy"), totalSessions: 5, status: "active" },
  { id: "p5", name: "Roberto Santos", email: "roberto@email.com", phone: "(11) 99999-0005", lastAppointment: "15/03/2026", totalSessions: 20, status: "inactive" },
  { id: "p6", name: "Camila Oliveira", email: "camila@email.com", phone: "(11) 99999-0006", lastAppointment: "28/03/2026", totalSessions: 6, status: "active" },
];

export const mockAiSummary = {
  queixaPrincipal: "Paciente relata aumento significativo de ansiedade nas últimas duas semanas, especialmente em situações sociais no ambiente de trabalho. Dificuldade para dormir e sensação constante de preocupação.",
  observacoes: "Paciente apresenta-se colaborativo, com discurso coerente. Nota-se tensão muscular e inquietação motora. Relata uso de técnicas de respiração aprendidas na sessão anterior com resultados parciais. Vínculo terapêutico bem estabelecido.",
  planoDeAcao: "1. Introduzir técnica de reestruturação cognitiva para pensamentos catastróficos.\n2. Manter diário de pensamentos automáticos durante a semana.\n3. Praticar exercício de relaxamento muscular progressivo antes de dormir.\n4. Retorno em 7 dias para reavaliação.",
};
