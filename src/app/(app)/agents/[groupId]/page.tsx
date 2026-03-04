"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useAgentsStore } from "@/features/agents/agents.store";

// Límite de paginación
const LIMIT = 6;

export default function AgentGroupPage() {
  const params = useParams();
  const groupId = params.groupId as string;

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => setMounted(true), []);

  const group = useAgentsStore((state) =>
    state.agents.find((a) => a.id === groupId)
  );

  const deleteInstance = useAgentsStore((s) => s.deleteInstance);

  const filteredInstances = useMemo(() => {
    if (!group) return [];
    let data = [...group.instances];

    if (search) {
      data = data.filter((i) =>
        i.nickname?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((i) => i.status === statusFilter);
    }

    return data;
  }, [group, search, statusFilter]);

  const total = filteredInstances.length;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedInstances = useMemo(() => {
    const offset = (currentPage - 1) * LIMIT;
    return filteredInstances.slice(offset, offset + LIMIT);
  }, [filteredInstances, currentPage]);

  useEffect(() => setPage(1), [search, statusFilter]);

  if (!mounted) return null;
  if (!group) return <div className="p-8 text-white">Group not found</div>;

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div className="rounded-3xl p-8 bg-[#0a0f18]/80 border border-cyan-400/20 shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-2">
          {group.name}
        </h1>

        <p className="text-slate-400">{group.description}</p>

        <div className="mt-4 text-cyan-400 font-semibold">
          {total} {total === 1 ? "Agent" : "Agents"} in this group
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search nickname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0a0f18]/80 text-white border border-cyan-400/20 focus:ring-2 focus:ring-cyan-400/50 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0a0f18]/80 text-white border border-cyan-400/20 focus:ring-2 focus:ring-cyan-400/50 transition"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedInstances.map((instance) => (
          <Link
            key={instance.id}
            href={`/agents/${group.id}/${instance.id}`}
            className="relative p-6 rounded-2xl bg-[#0b0f16]/80 border border-cyan-500/20 text-white hover:scale-105 transition-all shadow-lg hover:shadow-cyan-400/30"
          >
            {/* DELETE BUTTON */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteInstance(group.id, instance.id);
              }}
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-500/20 transition"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>

            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #7c3aed)' }}
            >
              {/* ROBOT ESTILO ROBOTINA */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-10 h-10 text-white"
                fill="currentColor"
              >
                <rect x="12" y="16" width="40" height="32" rx="6" ry="6" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="22" cy="28" r="4" fill="white" />
                <circle cx="42" cy="28" r="4" fill="white" />
                <rect x="22" y="38" width="20" height="4" rx="2" ry="2" fill="white" />
                <line x1="32" y1="16" x2="32" y2="8" stroke="white" strokeWidth="2" />
                <circle cx="32" cy="6" r="2" fill="white" />
              </svg>
            </div>

            <div className="text-xl font-bold text-center">
              {group.name} #{instance.number}
              {instance.nickname && (
                <span className="ml-2 text-sm text-cyan-300">
                  ({instance.nickname})
                </span>
              )}
            </div>

            <div className="text-sm text-slate-400 mt-2 text-center">
              Status: {instance.status}
            </div>

            <div className="text-sm text-slate-400 mt-1 text-center">
              Created {new Date(instance.createdAt).toLocaleDateString("en-US")}
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-4 items-center text-white">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-30 transition"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-30 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}