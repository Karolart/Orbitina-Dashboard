export type AgentInstance = {
  id: string;
  number: number;
  createdAt: string;
  status: "active" | "paused";
  nickname: string;
};

export type AgentGroup = {
  id: string;
  name: string;
  description: string;
  type: "creative" | "analytical" | "support" | "general";
  personality: string;
  color: string;
  instances: AgentInstance[];
};