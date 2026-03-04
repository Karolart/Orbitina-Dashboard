// ===============================
// MODELS
// ===============================

export interface Assistant {
  id: string;
  name: string;
  baseName: string; // 👈 para agrupar (Astro, Rosie, etc.)
  description: string;
  type: "creative" | "analytical" | "support" | "general";
  status: "active" | "idle" | "training";
  tasksCompleted: number;
  createdAt: string;
  color: string;
  runId?: string; // 👈 para saber de qué generación masiva vino
}

export interface Generation {
  id: string;
  assistantId: string;
  assistantName: string;
  prompt: string;
  output: string;
  timestamp: string;
  duration: number;
}

export interface GenerationRun {
  id: string;
  createdAt: string;
  parameters: {
    category: string;
    template: string;
    quantity: number;
    seed?: number;
  };
  generatedCount: number;
  status: "success" | "failed";
}


// ===============================
// MOCK DATA
// ===============================

export const mockAssistants: Assistant[] = [
  {
    id: "1",
    name: "Rosie",
    baseName: "Rosie",
    description: "Your helpful creative companion for brainstorming and content creation",
    type: "creative",
    status: "active",
    tasksCompleted: 156,
    createdAt: "2026-01-15",
    color: "#C77DFF",
    runId: "seed",
  },
  {
    id: "2",
    name: "Astro",
    baseName: "Astro",
    description: "Data analysis expert who turns complex numbers into insights",
    type: "analytical",
    status: "active",
    tasksCompleted: 89,
    createdAt: "2026-02-01",
    color: "#00D9FF",
    runId: "seed",
  },
  {
    id: "3",
    name: "Elroy",
    baseName: "Elroy",
    description: "Customer support specialist with a friendly robotic charm",
    type: "support",
    status: "idle",
    tasksCompleted: 234,
    createdAt: "2025-12-20",
    color: "#FF9F1C",
    runId: "seed",
  },
  {
    id: "4",
    name: "Orbit",
    baseName: "Orbit",
    description: "General-purpose assistant ready for any task",
    type: "general",
    status: "training",
    tasksCompleted: 45,
    createdAt: "2026-02-20",
    color: "#7FE9DE",
    runId: "seed",
  },
];


export const mockGenerations: Generation[] = [
  {
    id: "g1",
    assistantId: "1",
    assistantName: "Rosie",
    prompt: "Create a catchy tagline for a futuristic coffee shop",
    output: "Brew the Future, One Cup at a Time ☕",
    timestamp: "2026-02-27T10:30:00",
    duration: 2.3,
  },
  {
    id: "g2",
    assistantId: "2",
    assistantName: "Astro",
    prompt: "Analyze Q1 sales data trends",
    output: "Q1 shows 23% growth with peak performance in February. Key driver: increased mobile engagement.",
    timestamp: "2026-02-27T09:15:00",
    duration: 4.7,
  },
  {
    id: "g3",
    assistantId: "1",
    assistantName: "Rosie",
    prompt: "Write a welcome message for new users",
    output: "Welcome aboard! We're thrilled to have you join our community of innovators and dreamers.",
    timestamp: "2026-02-26T16:45:00",
    duration: 1.8,
  },
  {
    id: "g4",
    assistantId: "3",
    assistantName: "Elroy",
    prompt: "Draft a response to a delayed shipment inquiry",
    output: "We sincerely apologize for the delay. Your package is now expedited and will arrive by tomorrow. Thank you for your patience!",
    timestamp: "2026-02-26T14:20:00",
    duration: 3.2,
  },
  {
    id: "g5",
    assistantId: "2",
    assistantName: "Astro",
    prompt: "Summarize user feedback from this week",
    output: "85% positive sentiment. Top request: dark mode. Users love the new dashboard design.",
    timestamp: "2026-02-25T11:00:00",
    duration: 5.1,
  },
];


export const mockGenerationRuns: GenerationRun[] = [
  {
    id: "run-1",
    createdAt: "2026-02-27T02:14:00",
    parameters: {
      category: "education",
      template: "math-tutor",
      quantity: 50,
      seed: 1234,
    },
    generatedCount: 50,
    status: "success",
  },
  {
    id: "run-2",
    createdAt: "2026-02-26T18:30:00",
    parameters: {
      category: "finance",
      template: "budget-advisor",
      quantity: 120,
    },
    generatedCount: 0,
    status: "failed",
  },
];