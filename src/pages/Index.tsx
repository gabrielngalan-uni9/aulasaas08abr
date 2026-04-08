import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock, UserRound, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { professionalProfile, availableSlots, availableDates } from "@/lib/mock-data";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const slots = dateKey ? availableSlots[dateKey] || [] : [];

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Por favor, selecione uma data e horário.");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    toast.success("Agendamento solicitado com sucesso!", {
      description: `${format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} às ${selectedTime}`,
    });
    setFormData({ name: "", email: "", phone: "" });
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-end px-4 py-3 sm:px-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
            <LogIn className="h-4 w-4" />
            Área do Profissional
          </Button>
        </Link>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-16 pt-4 sm:pt-8">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
            <AvatarImage src={professionalProfile.avatarUrl} alt={professionalProfile.name} />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold text-foreground">{professionalProfile.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{professionalProfile.specialty}</p>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
            {professionalProfile.bio}
          </p>
        </div>

        {/* Calendar */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium text-foreground">Escolha uma data</h2>
          </div>
          <Card>
            <CardContent className="p-3 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
                disabled={(date) => !isDateAvailable(date)}
                locale={ptBR}
                className="pointer-events-auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Time slots */}
        {selectedDate && slots.length > 0 && (
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">
                Horários em {format(selectedDate, "dd/MM")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(slot)}
                  className="min-w-[72px]"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </section>
        )}

        {/* Booking form */}
        {selectedTime && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 mb-4">
              <UserRound className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium text-foreground">Seus dados</h2>
            </div>
            <Card>
              <CardContent className="p-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <Button type="submit" className="w-full mt-2" size="lg">
                    Agende sua experiência
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
