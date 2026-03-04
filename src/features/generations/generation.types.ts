export type GenerationParameters = {
  type?: "creative" | "analytical" | "support" | "general";
  seed?: string;
  quantity: number;
};

export type GenerationRun = {
  id: string;
  createdAt: string;
  parameters: GenerationParameters;
  status: "success" | "error";
  generatedGroupIds: string[];
};