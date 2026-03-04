"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useAgentsStore } from "@/features/agents/agents.store";

export default function AgentInstanceDetail() {
  const params = useParams();
  const router = useRouter();

  const groupId = params.groupId as string;
  const instanceId = params.instanceId as string;

  const agents = useAgentsStore((s) => s.agents);
  const updateInstance = useAgentsStore((s) => s.updateInstance);
  const deleteInstance = useAgentsStore((s) => s.deleteInstance);

  const group = agents.find((g) => g.id === groupId);
  const instance = group?.instances.find((i) => i.id === instanceId);

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [status, setStatus] = useState<"active" | "paused">("active");

  useEffect(() => {
    if (instance) {
      setNickname(instance.nickname ?? "");
      setStatus(instance.status ?? "active");
    }
  }, [instance]);

  if (!group || !instance) {
    return (
      <div className="p-10 text-white text-center">
        Agent not found
      </div>
    );
  }

  const handleSave = () => {
    updateInstance(groupId, instanceId, { nickname, status });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this instance?")) return;
    deleteInstance(groupId, instanceId);
    router.push(`/agents/${groupId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-10 space-y-8 text-white">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* HEADER */}
      <div className="bg-black/40 p-8 rounded-3xl border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        
        {/* ICONO ROBOTINA */}
        <div className="w-20 h-20 mx-auto mb-4 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-20 h-20 text-white mx-auto"
            fill="currentColor"
          >
            <rect x="12" y="16" width="40" height="32" rx="6" ry="6" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="22" cy="28" r="4" fill="white"/>
            <circle cx="42" cy="28" r="4" fill="white"/>
            <rect x="22" y="38" width="20" height="4" rx="2" ry="2" fill="white"/>
            <line x1="32" y1="16" x2="32" y2="8" stroke="white" strokeWidth="2"/>
            <circle cx="32" cy="6" r="2" fill="white"/>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{group.name} #{instance.number}</h1>
          {instance.nickname && <p className="text-purple-300 mb-2">({instance.nickname})</p>}
          <p className="text-slate-400">{group.description}</p>
          <div className="mt-3 text-cyan-400 font-semibold">
            Status: <span className={status === "active" ? "text-emerald-400" : "text-orange-400"}>{status}</span>
          </div>
          <div className="mt-1 text-slate-400 text-sm">
            Created {new Date(instance.createdAt).toLocaleString()}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => setIsEditing(prev => !prev)}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-200 transition"
          >
            <Pencil className="w-5 h-5" /> {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-400 hover:text-red-200 transition"
          >
            <Trash2 className="w-5 h-5" /> Delete
          </button>
        </div>

        {/* EDIT FORM */}
        {isEditing && (
          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm text-slate-400">Nickname</label>
              <input
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="w-full mt-2 p-3 rounded-2xl bg-black/30 border border-cyan-400 focus:border-cyan-300 outline-none shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as "active" | "paused")}
                className="w-full mt-2 p-3 rounded-2xl bg-black/30 border border-cyan-400 focus:border-cyan-300 outline-none shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <button
              onClick={handleSave}
              className="w-full p-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}