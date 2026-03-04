import { z } from "zod";

export const agentSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  description: z.string().min(5, "Description too short"),
  type: z.enum(["creative", "analytical", "support", "general"]),
  personality: z.string(),
  quantity: z.number().min(1).max(100),
  color: z.string(),
});

export type AgentInput = z.infer<typeof agentSchema>;