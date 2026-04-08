import { useState } from "react";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClinicalNoteModal } from "@/components/ClinicalNoteModal";
import { todayAppointments, type Appointment } from "@/lib/mock-data";

const Dashboard = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openNote = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setModalOpen(true);
  };

  const paidCount = todayAppointments.filter((a) => a.status === "paid").length;
  const pendingCount = todayAppointments.filter((a) => a.status === "pending").length;

  return (
    <>
      <h1 className="text-xl font-semibold text-foreground mb-1">Minha Agenda</h1>
      <p className="text-sm text-muted-foreground mb-6">Consultas de hoje</p>

      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" /> {paidCount} pago{paidCount !== 1 && "s"}
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5" /> {pendingCount} pendente{pendingCount !== 1 && "s"}
        </div>
      </div>

      <div className="space-y-3">
        {todayAppointments.map((apt) => (
          <Card key={apt.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 text-primary shrink-0">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">{apt.time}</span>
                </div>
                <span className="text-sm text-foreground truncate">{apt.patientName}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={apt.status === "paid" ? "default" : "secondary"} className="text-xs">
                  {apt.status === "paid" ? "Pago" : "Pendente"}
                </Badge>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openNote(apt)}>
                  <FileText className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Prontuário</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClinicalNoteModal
        appointment={selectedAppointment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default Dashboard;
