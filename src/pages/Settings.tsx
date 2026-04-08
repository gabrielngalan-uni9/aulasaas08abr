import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { professionalProfile } from "@/lib/mock-data";

const weekDays = [
  { id: "seg", label: "Seg" },
  { id: "ter", label: "Ter" },
  { id: "qua", label: "Qua" },
  { id: "qui", label: "Qui" },
  { id: "sex", label: "Sex" },
  { id: "sab", label: "Sáb" },
];

const Settings = () => {
  const [name, setName] = useState(professionalProfile.name);
  const [specialty, setSpecialty] = useState(professionalProfile.specialty);
  const [bio, setBio] = useState(professionalProfile.bio);
  const [selectedDays, setSelectedDays] = useState<string[]>(["seg", "ter", "qua", "qui", "sex"]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [price, setPrice] = useState("200");

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const handleSave = (section: string) => {
    toast.success(`${section} salvo com sucesso!`);
  };

  return (
    <>
      <h1 className="text-xl font-semibold text-foreground mb-1">Configurações</h1>
      <p className="text-sm text-muted-foreground mb-6">Gerencie seu perfil e preferências</p>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Perfil Profissional</CardTitle>
            <CardDescription>Informações exibidas na sua página pública</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
            </div>
            <Button onClick={() => handleSave("Perfil")}>Salvar Perfil</Button>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Horários de Atendimento</CardTitle>
            <CardDescription>Defina os dias e horários disponíveis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Dias da semana</Label>
              <div className="flex flex-wrap gap-4">
                {weekDays.map((day) => (
                  <label key={day.id} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={() => toggleDay(day.id)}
                    />
                    {day.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="start">Início</Label>
                <Input id="start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="end">Fim</Label>
                <Input id="end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
            <Button onClick={() => handleSave("Horários")}>Salvar Horários</Button>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Valores</CardTitle>
            <CardDescription>Configure o valor da consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Valor da Consulta (R$)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <Button onClick={() => handleSave("Valores")}>Salvar Valores</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Settings;
