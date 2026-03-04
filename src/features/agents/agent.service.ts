import { AgentGroup } from "./agent.types";

export function createAgentGroup(data: {
  name: string;
  description: string;
  type: AgentGroup["type"];
  personality: string;
  quantity: number;
  color: string;
}): AgentGroup {

  const instances = Array.from({ length: data.quantity }, (_, i) => ({
    id: Math.random().toString(36).substring(2),
    number: i + 1,
    createdAt: new Date().toISOString(),
  }));

  return {
    id: Math.random().toString(36).substring(2),
    name: data.name,
    description: data.description,
    type: data.type,
    personality: data.personality,
    color: data.color,
    instances,
  };
}