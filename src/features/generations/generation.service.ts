import { GenerationRun } from "./generation.types";

const STORAGE_KEY = "orbitina_generations";

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now();
}

export function getGenerationRuns(): GenerationRun[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveGenerationRun(
  data: Omit<GenerationRun, "id" | "createdAt">
) {
  if (typeof window === "undefined") return;

  const runs = getGenerationRuns();

  const newRun: GenerationRun = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newRun, ...runs])
  );
}