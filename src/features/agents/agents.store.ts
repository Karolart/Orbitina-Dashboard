"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AgentGroup, AgentInstance } from "./agent.types";

function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString()
  );
}

type AgentsState = {
  agents: AgentGroup[];

  createGroup: (data: {
    name: string;
    description: string;
    type: AgentGroup["type"];
    personality: string;
    quantity: number;
    color: string;
  }) => string;

  deleteGroup: (groupId: string) => void;
  deleteInstance: (groupId: string, instanceId: string) => void;

  updateInstance: (
    groupId: string,
    instanceId: string,
    data: Partial<Pick<AgentInstance, "status" | "nickname">>
  ) => void;
};

export const useAgentsStore = create<AgentsState>()(
  persist(
    (set, get) => ({
      agents: [],

      createGroup: (data) => {
        const groupId = generateId();

        const instances: AgentInstance[] = Array.from(
          { length: data.quantity },
          (_, i) => ({
            id: generateId(),
            number: i + 1,
            createdAt: new Date().toISOString(),
            status: "active",
            nickname: "",
          })
        );

        const newGroup: AgentGroup = {
          id: groupId,
          name: data.name,
          description: data.description,
          type: data.type,
          personality: data.personality,
          color: data.color,
          instances,
        };

        set((state) => ({
          agents: [...state.agents, newGroup],
        }));

        return groupId;
      },

      deleteGroup: (groupId) => {
        set((state) => ({
          agents: state.agents.filter(
            (g) => g.id !== groupId
          ),
        }));
      },

      deleteInstance: (groupId, instanceId) => {
        set((state) => ({
          agents: state.agents.map((group) =>
            group.id !== groupId
              ? group
              : {
                  ...group,
                  instances: group.instances.filter(
                    (inst) => inst.id !== instanceId
                  ),
                }
          ),
        }));
      },

      updateInstance: (groupId, instanceId, data) => {
        set((state) => ({
          agents: state.agents.map((group) =>
            group.id !== groupId
              ? group
              : {
                  ...group,
                  instances: group.instances.map((inst) =>
                    inst.id === instanceId
                      ? { ...inst, ...data }
                      : inst
                  ),
                }
          ),
        }));
      },
    }),
    {
      name: "orbitina_agents",
    }
  )
);