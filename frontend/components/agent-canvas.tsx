"use client";
import React from 'react';

export default function AgentCanvas({ activeAgent }: { activeAgent: string }) {
  const agentNodes = ["Researcher", "Personalization", "Copywriter", "Optimizer", "Compliance"];
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">🤖 Decentralized Swarm State Map</h3>
      <div className="flex flex-wrap items-center justify-between gap-4 py-2">
        {agentNodes.map((agent, index) => {
          const isActive = (activeAgent && agent) ? activeAgent.toLowerCase() === agent.toLowerCase() : false;
          return (
            <div key={agent} className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-lg border font-mono text-xs font-bold transition-all ${isActive ? 'bg-cyan-950 text-cyan-400 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-pulse' : 'bg-slate-950 text-slate-500 border-slate-800'}`}>
                {agent} Agent
              </div>
              {index < agentNodes.length - 1 && <span className="text-slate-700 hidden sm:inline">➔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
