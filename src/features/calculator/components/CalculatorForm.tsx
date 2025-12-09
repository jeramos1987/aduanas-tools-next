"use client";

import { FormEvent, useState } from "react";
import type { CalculatorFormValues } from "../types";
import { calculateCustomsValue } from "@/domain/customs/value";
import type { CustomsInput } from "@/domain/customs/types";

type Props = {
  onSubmit: (values: CalculatorFormValues) => void;
};

export function CalculatorForm({ onSubmit }: Props) {
  const [fob, setFob] = useState("1000");
  const [freight, setFreight] = useState("200");
  const [insurance, setInsurance] = useState("50");
  const [otherCosts, setOtherCosts] = useState("0");
  const [dutyRate, setDutyRate] = useState("0.06");
  const [igvRate, setIgvRate] = useState("0.18");

  // 1️⃣ Construimos un objeto de entrada compatible con CustomsInput
  const previewInput: CustomsInput = {
    fob: Number(fob) || 0,
    freight: Number(freight) || 0,
    insurance: Number(insurance) || 0,
    otherCosts: Number(otherCosts) || 0,
    dutyRate: Number(dutyRate) || 0, // aunque esta función no lo use, el tipo lo pide
    igvRate: Number(igvRate) || 0,
  };

  // 2️⃣ Usamos la lógica de negocio para calcular el VA
  const customsValue = calculateCustomsValue(previewInput);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(previewInput); // ya tenemos el objeto listo
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* campos... */}
      <Field label="FOB (USD)" value={fob} onChange={setFob} />
      <Field label="Flete (USD)" value={freight} onChange={setFreight} />
      <Field label="Seguro (USD)" value={insurance} onChange={setInsurance} />
      <Field label="Otros costos (USD)" value={otherCosts} onChange={setOtherCosts} />

      {/* 🔥 Valor en Aduana usando domain */}
      <div className="p-3 border rounded bg-gray-50">
        <p className="text-sm text-gray-600">Valor en Aduana (VA):</p>
        <p className="text-xl font-bold">USD {customsValue.toFixed(2)}</p>
      </div>

      <Field label="Tasa ad valorem (ej. 0.06)" value={dutyRate} onChange={setDutyRate} />
      <Field label="Tasa IGV (ej. 0.18)" value={igvRate} onChange={setIgvRate} />

      <button type="submit" className="border rounded px-4 py-2 mt-2">
        Calcular tributos
      </button>
    </form>
  );
}
type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <input
        className="border rounded px-2 py-1 w-full"
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}