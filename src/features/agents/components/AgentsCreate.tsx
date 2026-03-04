"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAgentsStore } from "@/features/agents/agents.store";
import { saveGenerationRun } from "@/features/generations/generation.service";

type AgentType =
  | "creative"
  | "analytical"
  | "support"
  | "general";

interface FormState {
  name: string;
  description: string;
  type: AgentType;
  personality: string;
}

const AGENT_TYPES: {
  value: AgentType;
  label: string;
  color: string;
}[] = [
    { value: "creative", label: "Creative", color: "#C77DFF" },
    { value: "analytical", label: "Analytical", color: "#00D9FF" },
    { value: "support", label: "Support", color: "#FF9F1C" },
    { value: "general", label: "General", color: "#7FE9DE" },
  ];

export default function AgentsCreate() {
  const router = useRouter();
  const createGroup = useAgentsStore((s) => s.createGroup);

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    type: "general",
    personality: "friendly",
  });

  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedColor = useMemo(() => {
    return (
      AGENT_TYPES.find((t) => t.value === form.type)?.color ??
      "#00D9FF"
    );
  }, [form.type]);

  const isValid =
    form.name.trim().length > 0 &&
    form.description.trim().length > 0 &&
    quantity > 0 &&
    !isSubmitting;

  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((res) => setTimeout(res, 600));

      const groupId = createGroup({
        name: form.name.trim(),
        description: form.description.trim(),
        type: form.type,
        personality: form.personality,
        quantity,
        color: selectedColor,
      });

      saveGenerationRun({
        parameters: {
          type: form.type,
          quantity,
        },
        status: "success",
        generatedGroupIds: [groupId],
      });

      router.push("/agents");
    } catch (err) {
      saveGenerationRun({
        parameters: {
          type: form.type,
          quantity,
        },
        status: "error",
        generatedGroupIds: [],
      });

      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-black/40 p-8 rounded-3xl border border-cyan-500/40 backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold">
          Create Agent Group
        </h1>

        {error && (
          <div className="text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="text-sm text-slate-400">
            Agent Name
          </label>
          <input
            value={form.name}
            onChange={(e) =>
              handleChange("name", e.target.value)
            }
            className="w-full p-3 mt-1 rounded-xl bg-black/30 border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-slate-400">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            className="w-full p-3 mt-1 rounded-xl bg-black/30 border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition"
          />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm text-slate-400">
            Agent Type
          </label>

          <select
            value={form.type}
            onChange={(e) =>
              handleChange(
                "type",
                e.target.value as AgentType
              )
            }
            className="
      w-full p-3 mt-1 rounded-xl
      bg-black/30
      border border-slate-600
      text-white
      outline-none
      transition-all duration-300

      focus:border-pink-500
      focus:ring-2
      focus:ring-pink-500/60
      focus:shadow-[0_0_18px_rgba(236,72,153,0.6)]
    "
          >
            {AGENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Personality */}
        <div>
          <label className="text-sm text-slate-400">
            Personality
          </label>
          <input
            value={form.personality}
            onChange={(e) =>
              handleChange("personality", e.target.value)
            }
            className="w-full p-3 mt-1 rounded-xl bg-black/30 border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="text-sm text-slate-400">
            Number of Instances
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value)))
            }
            className="w-full p-3 mt-1 rounded-xl bg-black/30 border border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isValid}
          className={`
            w-full p-3 rounded-xl font-semibold
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isValid
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] active:scale-[0.98]"
              : "bg-slate-700 cursor-not-allowed"
            }
          `}
        >
          {isSubmitting && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {isSubmitting
            ? "Generating..."
            : "Create Agent Group"}
        </button>
      </form>
    </div>
  );
}