"use client";

import { useRouter } from "next/navigation";
import { useAgentsStore } from "@/features/agents/agents.store";
import AgentForm from "@/features/agents/components/AgentForm";
import { AgentGroup } from "@/features/agents/agent.types";

type CreateAgentInput = {
  name: string;
  description: string;
  type: AgentGroup["type"];
  personality: string;
  color: string;
  quantity?: number;
};

export default function CreateAgentPage() {
  const router = useRouter();
  const createGroup = useAgentsStore((s) => s.createGroup);

  function handleCreate(data: CreateAgentInput) {
    const groupId = createGroup({
      ...data,
      quantity: data.quantity ?? 1,
    });

    router.push(`/agents/${groupId}`);
  }

  return (
    <AgentForm
      onSubmit={handleCreate}
      submitLabel="Create Agent Group"
    />
  );
}