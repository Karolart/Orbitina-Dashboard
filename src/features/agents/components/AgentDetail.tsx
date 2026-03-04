"use client";

import { useParams, useRouter } from "next/navigation";
import { Bot, ArrowLeft, Zap, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useAgentsStore } from "@/features/agents/agents.store";

export default function AgentDetail() {
  const params = useParams();
  const router = useRouter();

  const id =
    Array.isArray(params.groupId)
      ? params.groupId[0]
      : (params.groupId as string);

  // ✅ Selector directo al group (esto fuerza re-render correcto)
  const group = useAgentsStore((state) =>
    state.agents.find((g) => g.id === id)
  );

  if (!group) {
    return (
      <div className="text-center py-20 text-slate-400">
        Agent group not found
      </div>
    );
  }

  const stats = [
    {
      label: "Total Instances",
      value: group.instances.length,
      icon: Zap,
    },
    {
      label: "Type",
      value: group.type,
      icon: TrendingUp,
    },
    {
      label: "Personality",
      value: group.personality,
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8 p-8">

      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-purple-500">

        <button
          onClick={() => router.push("/agents")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-6">

          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: group.color }}
          >
            <Bot className="w-10 h-10" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              {group.name}
            </h1>
            <p className="text-slate-400 mt-2">
              {group.description}
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-slate-400">
                  {stat.label}
                </span>
              </div>

              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* INSTANCES */}
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-pink-500">
        <h2 className="text-2xl font-bold text-white mb-6">
          Instances
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {group.instances.map((instance) => (
            <div
              key={instance.id}
              className="group p-4 rounded-xl bg-black/60 border border-slate-700 text-white transition hover:border-cyan-400"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    #{instance.number}
                    {instance.nickname && (
                      <span className="ml-2 text-sm text-purple-300">
                        ({instance.nickname})
                      </span>
                    )}
                  </p>

                  <p className="text-xs text-slate-400">
                    Created {new Date(instance.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    instance.status === "active"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {instance.status}
                </span>
              </div>

              <div className="mt-3 flex gap-4 opacity-0 group-hover:opacity-100 transition text-sm">
                <button
                  onClick={() =>
                    router.push(`/agents/${group.id}/${instance.id}`)
                  }
                  className="text-cyan-400 hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}