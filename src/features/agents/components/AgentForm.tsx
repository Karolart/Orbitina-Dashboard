"use client";

import { useState, useEffect } from "react";
import { AgentGroup } from "../agent.types";

type AgentType = AgentGroup["type"];

type FormData = {
  name: string;
  description: string;
  type: AgentType;
  personality: string;
  color: string;
};

type Props = {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  submitLabel: string;
};

export default function AgentForm({
  initialData,
  onSubmit,
  submitLabel,
}: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    type: "general",
    personality: "friendly",
    color: "#7FE9DE",
  });

  // 🔥 Esto sincroniza cuando initialData cambia
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "type" ? (value as AgentType) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) return;

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Agent Name"
        className="w-full p-3 rounded-xl bg-black/30 border border-cyan-400 text-white"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-3 rounded-xl bg-black/30 border border-cyan-400 text-white"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-black/30 border border-cyan-400 text-white"
      >
        <option value="creative">Creative</option>
        <option value="analytical">Analytical</option>
        <option value="support">Support</option>
        <option value="general">General</option>
      </select>

      <input
        type="color"
        name="color"
        value={form.color}
        onChange={handleChange}
        className="w-full h-12 rounded-xl bg-black/30 border border-cyan-400"
      />

      <button
        type="submit"
        className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}