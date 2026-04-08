import { useState } from "react";
import { Sparkles, Loader2, FileText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { mockAiSummary, type Appointment } from "@/lib/mock-data";

interface ClinicalNoteModalProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClinicalNoteModal({ appointment, open, onOpenChange }: ClinicalNoteModalProps) {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<typeof mockAiSummary | null>(null);

  const handleGenerate = () => {
    if (!notes.trim()) return;
    setLoading(true);
    setSummary(null);
    setTimeout(() => {
      setSummary(mockAiSummary);
      setLoading(false);
    }, 2000);
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setNotes("");
      setSummary(null);
      setLoading(false);
    }
    onOpenChange(val);
  };

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Prontuário — {appointment.patientName}
          </DialogTitle>
          <DialogDescription>
            Consulta em {appointment.date} às {appointment.time}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Textarea
            placeholder="Digite suas anotações clínicas aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[160px] resize-none"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading || !notes.trim()}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Gerando resumo…" : "Gerar Resumo com IA"}
          </Button>

          {summary && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4 rounded-lg border bg-muted/40 p-5">
              <SummarySection title="Queixa Principal" content={summary.queixaPrincipal} />
              <Separator />
              <SummarySection title="Observações" content={summary.observacoes} />
              <Separator />
              <SummarySection title="Plano de Ação" content={summary.planoDeAcao} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SummarySection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{content}</p>
    </div>
  );
}
