"use client";

import { useParams, useRouter } from "next/navigation";
import { useAgentsStore } from "@/features/agents/agents.store";
import AgentForm from "@/features/agents/components/AgentForm";
import { AgentGroup } from "@/features/agents/agent.types";

export default function EditAgentPage() {
  const params = useParams();
  const router = useRouter();

  const agents = useAgentsStore((s) => s.agents);
  const updateGroup = useAgentsStore((s) => s.updateGroup);

  const rawId = params.groupId;

  const groupId =
    typeof rawId === "string"
      ? rawId
      : Array.isArray(rawId)
      ? rawId[0]
      : undefined;

  if (!groupId) return <div className="p-8">Invalid ID</div>;

  const group = agents.find((g) => g.id === groupId);
  if (!group) return <div className="p-8">Agent not found</div>;

  const handleUpdate = (data: {
    name: string;
    description: string;
    type: AgentGroup["type"];
    personality: string;
    color: string;
  }) => {
    updateGroup(groupId, data);
    router.push("/agents");
  };

  return (
    <AgentForm
      initialData={{
        name: group.name,
        description: group.description,
        type: group.type,
        personality: group.personality,
        color: group.color,
      }}
      onSubmit={handleUpdate}
      submitLabel="Save Changes"
    />
  );
}